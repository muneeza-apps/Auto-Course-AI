from pydantic import BaseModel
from typing import List, Optional, Literal

class DifferentiationSeed(BaseModel):
    persona: str
    analogy_domain: str
    angle: str

class Finding(BaseModel):
    point: str
    source_title: str
    source_url: str

class IntakePayload(BaseModel):
    topic: str
    audience_level: Literal["beginner", "intermediate", "advanced"]
    differentiation_seed: DifferentiationSeed

class ResearchOutput(BaseModel):
    topic: str
    audience_level: str
    differentiation_seed: DifferentiationSeed
    key_subtopics: List[str]
    findings: List[Finding]

class Module(BaseModel):
    module_number: int
    title: str
    learning_objectives: List[str]
    backing_source_urls: List[str]
    key_subtopics_covered: List[str]

class CurriculumOutput(BaseModel):
    course_title: str
    modules: List[Module]

class Citation(BaseModel):
    marker: str
    source_title: str
    source_url: str

class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    answer_index: int

class LessonOutput(BaseModel):
    module_number: int
    title: str
    lesson_markdown: str
    citations: List[Citation]
    worked_example: str
    quiz: List[QuizQuestion]

class AgentMessage(BaseModel):
    id: str
    agent_name: str
    timestamp: str
    content_json: Optional[dict] = None
    raw_text: str
    status: str = "done"
