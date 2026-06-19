import os
import yaml
from band_sdk import Agent
from shared.constants import BAND_WS_URL, BAND_REST_URL

CONFIG_PATH = os.path.join(os.path.dirname(__file__), '..', 'agent_config.yaml')


def load_agent_config():
    with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


def create_research_agent():
    config = load_agent_config()
    agent_id = config['research_agent']['agent_id']
    api_key = config['research_agent']['api_key']

    agent = Agent(
        agent_id=agent_id,
        api_key=api_key,
        ws_url=BAND_WS_URL,
        rest_url=BAND_REST_URL,
    )
    return agent


if __name__ == '__main__':
    agent = create_research_agent()
    print('ResearchAgent initialized:', agent)
