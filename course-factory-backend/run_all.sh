#!/bin/bash
echo "Starting Auto Course AI Backend..."
python agents/research_agent.py &
sleep 2
python agents/curriculum_agent.py &
sleep 2
python agents/content_writer_agent.py &
sleep 2
uvicorn api.main:app --reload --port 8000
echo "All agents running. API at http://localhost:8000"
