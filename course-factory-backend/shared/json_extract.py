import re
import json
import logging

logger = logging.getLogger(__name__)


def extract_json(text: str) -> dict | None:
    # Try fenced ```json block first
    fenced = re.search(r'```json\s*([\s\S]*?)\s*```', text)
    if fenced:
        try:
            return json.loads(fenced.group(1))
        except json.JSONDecodeError as e:
            logger.warning(f"Fenced JSON parse failed: {e}")

    # Fallback: find outermost {...}
    brace = re.search(r'\{[\s\S]*\}', text)
    if brace:
        try:
            return json.loads(brace.group(0))
        except json.JSONDecodeError as e:
            logger.warning(f"Brace JSON parse failed: {e}")

    logger.error(f"Could not extract JSON from text: {text[:200]}")
    return None
