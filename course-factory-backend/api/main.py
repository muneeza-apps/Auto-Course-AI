import os
import yaml
import json
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from shared.json_extract import extract_json
from shared.schemas import AgentMessage

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
CONFIG_PATH = os.path.join(BASE_DIR, 'agent_config.yaml')
BAND_REST_URL = os.getenv('BAND_REST_URL', 'https://app.band.ai')

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['*'], allow_headers=['*'])


def load_agent_config():
    with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


class StartCourseRequest(BaseModel):
    topic: str
    audience_level: str
    persona: str
    analogy_domain: str
    angle: str


@app.post('/api/start-course')
async def start_course(payload: StartCourseRequest):
    config = load_agent_config()
    room_id = config['room']['room_id']
    if not room_id:
        raise HTTPException(status_code=400, detail='room_id is not configured in agent_config.yaml')

    message = {
        'text': (
            'Please begin a new course generation workflow with this intake payload:\n'
            f'``json\n{{"topic": "{payload.topic}", "audience_level": "{payload.audience_level}", '
            f'"differentiation_seed": {{"persona": "{payload.persona}", "analogy_domain": "{payload.analogy_domain}", "angle": "{payload.angle}"}}}}\n```\n'
            f'@{os.getenv("DEMO_HUMAN_HANDLE", "human")} @ResearchAgent'
        )
    }

    async with httpx.AsyncClient() as client:
        url = f'{BAND_REST_URL}/api/v1/rooms/{room_id}/messages'
        response = await client.post(url, json=message)
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail=f'Band API error: {response.text}')

    return {'room_id': room_id, 'room_url': f'{BAND_REST_URL}/room/{room_id}'}


@app.get('/api/room/{room_id}/messages')
async def get_room_messages(room_id: str):
    async with httpx.AsyncClient() as client:
        url = f'{BAND_REST_URL}/api/v1/rooms/{room_id}/messages'
        response = await client.get(url)
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail=f'Band API error: {response.text}')

        raw_messages = response.json().get('messages', [])

    messages = []
    for raw in raw_messages:
        content = raw.get('text', '')
        extracted = extract_json(content)
        agent_message = AgentMessage(
            id=str(raw.get('id', '')),
            agent_name=raw.get('sender_name', 'unknown'),
            timestamp=raw.get('created_at', ''),
            content_json=extracted,
            raw_text=content,
            status='done'
        )
        messages.append(agent_message)

    return {'messages': [m.dict() for m in messages]}
