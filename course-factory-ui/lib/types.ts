export interface Finding {
  point: string;
  source_title: string;
  source_url: string;
}

export interface ResearchOutput {
  topic: string;
  audience_level: string;
  differentiation_seed: {
    persona: string;
    analogy_domain: string;
    angle: string;
  };
  key_subtopics: string[];
  findings: Finding[];
}

export interface Module {
  module_number: number;
  title: string;
  learning_objectives: string[];
  backing_source_urls: string[];
  key_subtopics_covered: string[];
}

export interface CurriculumOutput {
  course_title: string;
  modules: Module[];
}

export interface Citation {
  marker: string;
  source_title: string;
  source_url: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer_index: number;
}

export interface LessonOutput {
  module_number: number;
  title: string;
  lesson_markdown: string;
  citations: Citation[];
  worked_example: string;
  quiz: QuizQuestion[];
}

export interface AgentMessage {
  id: string;
  agent_name: "ResearchAgent" | "CurriculumAgent" | "ContentWriterAgent" | "System";
  timestamp: string;
  content_json: ResearchOutput | CurriculumOutput | LessonOutput | null;
  raw_text: string;
  status: "done" | "typing";
}
