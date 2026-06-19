# Course Factory Backend

A Python backend for Auto Course AI using three Band-coordinated agents:
- `ResearchAgent`
- `CurriculumAgent`
- `ContentWriterAgent`

This backend is designed to work separately from the Next.js frontend in `course-factory-ui`.

## Architecture

```
Frontend (Next.js)
      |
      | HTTP POST /api/start-course
      v
Backend (FastAPI)
      |
      | sends Band room message
      v
Band room
  ├─ ResearchAgent
  ├─ CurriculumAgent
  └─ ContentWriterAgent
      |
      | Room message history
      v
Backend GET /api/room/{room_id}/messages
```

## Setup

1. Create the `course-factory-backend` folder.
2. Copy `requirements.txt`, `.env`, and `agent_config.yaml`.
3. Fill the values in `.env` and `agent_config.yaml`.

## Required files

- `.env`
- `agent_config.yaml`
- `requirements.txt`

## Install dependencies

Do not install dependencies until you have valid API keys.

```bash
pip install -r requirements.txt
```

## Fill these values

In `.env`:
- `AIML_API_KEY`
- `FEATHERLESS_API_KEY`
- `TAVILY_API_KEY`
- `DEMO_HUMAN_HANDLE`

In `agent_config.yaml`:
- `research_agent.agent_id`
- `research_agent.api_key`
- `curriculum_agent.agent_id`
- `curriculum_agent.api_key`
- `content_writer_agent.agent_id`
- `content_writer_agent.api_key`
- `room.room_id`

## Run the backend

```bash
bash run_all.sh
```

## API Endpoints

### Start course generation

```bash
curl -X POST http://localhost:8000/api/start-course \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Prompt Engineering",
    "audience_level": "intermediate",
    "persona": "working professional",
    "analogy_domain": "cooking",
    "angle": "practical shortcuts first"
  }'
```

### Get room messages

```bash
curl http://localhost:8000/api/room/<room_id>/messages
```

## Band dashboard values

You will need to register three Band agents and copy the following from the Band dashboard:
- `agent_id`
- `api_key`
- `room_id`

Put these values into `agent_config.yaml`.
