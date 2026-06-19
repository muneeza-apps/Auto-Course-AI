import type {
  AgentMessage,
  CurriculumOutput,
  LessonOutput,
  ResearchOutput,
} from "./types";

export const DEMO_ROOM_ID = "demo-room-001";
export const DEMO_LESSON_ID = "module-1";

export const mockResearchOutput: ResearchOutput = {
  topic: "Introduction to Machine Learning",
  audience_level: "Beginner",
  differentiation_seed: {
    persona: "A curious high-school student exploring STEM",
    analogy_domain: "cooking",
    angle: "Recipes as algorithms — step-by-step instructions that turn raw ingredients into a finished dish",
  },
  key_subtopics: [
    "Supervised vs unsupervised learning",
    "Training data and labels",
    "Model evaluation basics",
    "Overfitting and generalization",
  ],
  findings: [
    {
      point: "Supervised learning uses labeled examples to learn a mapping from inputs to outputs.",
      source_title: "Google ML Crash Course — Supervised Learning",
      source_url: "https://developers.google.com/machine-learning/crash-course/supervised-ml",
    },
    {
      point: "Train/validation/test splits help estimate how well a model generalizes to unseen data.",
      source_title: "Scikit-learn — Model Evaluation",
      source_url: "https://scikit-learn.org/stable/modules/model_evaluation.html",
    },
    {
      point: "Overfitting occurs when a model memorizes training data instead of learning general patterns.",
      source_title: "Deep Learning Book — Overfitting",
      source_url: "https://www.deeplearningbook.org/contents/ml.html",
    },
  ],
};

export const mockCurriculumOutput: CurriculumOutput = {
  course_title: "Machine Learning for Beginners",
  modules: [
    {
      module_number: 1,
      title: "What Is Machine Learning?",
      learning_objectives: [
        "Define machine learning in plain language",
        "Distinguish supervised from unsupervised learning",
        "Explain why labeled data matters",
      ],
      backing_source_urls: [
        "https://developers.google.com/machine-learning/crash-course/supervised-ml",
      ],
      key_subtopics_covered: [
        "Supervised vs unsupervised learning",
        "Training data and labels",
      ],
    },
    {
      module_number: 2,
      title: "Evaluating Models",
      learning_objectives: [
        "Describe train/validation/test splits",
        "Identify signs of overfitting",
        "Choose a simple evaluation metric",
      ],
      backing_source_urls: [
        "https://scikit-learn.org/stable/modules/model_evaluation.html",
      ],
      key_subtopics_covered: [
        "Model evaluation basics",
        "Overfitting and generalization",
      ],
    },
  ],
};

export const mockLessonOutput: LessonOutput = {
  module_number: 1,
  title: "What Is Machine Learning?",
  lesson_markdown: `## Welcome to Module 1

Think of machine learning like following a **recipe**. You start with ingredients (data), follow steps (an algorithm), and end up with a dish (a prediction or insight).

### Supervised Learning

In **supervised learning**, every example comes with a label — like a recipe card that tells you exactly what the finished dish should look like. The model learns from many labeled examples so it can predict labels for new, unseen inputs.

### Unsupervised Learning

In **unsupervised learning**, there are no labels. The model looks for hidden structure in the data — like sorting spices by aroma when nobody told you the categories ahead of time.

### Key Takeaway

Machine learning is about finding patterns in data so computers can make useful decisions without being explicitly programmed for every case.`,
  citations: [
    {
      marker: "[1]",
      source_title: "Google ML Crash Course — Supervised Learning",
      source_url: "https://developers.google.com/machine-learning/crash-course/supervised-ml",
    },
    {
      marker: "[2]",
      source_title: "Scikit-learn — Model Evaluation",
      source_url: "https://scikit-learn.org/stable/modules/model_evaluation.html",
    },
  ],
  worked_example: `**Scenario:** You want to predict whether an email is spam.

1. Collect 10,000 emails, each labeled "spam" or "not spam" (supervised learning).
2. Split the data: 70% for training, 15% for validation, 15% for testing.
3. Train a simple classifier on the training set.
4. Check accuracy on the validation set and adjust.
5. Report final performance on the held-out test set.

Result: The model learns word patterns associated with spam without you writing explicit rules for every spam phrase.`,
  quiz: [
    {
      question: "What distinguishes supervised learning from unsupervised learning?",
      options: [
        "Supervised learning uses labeled data; unsupervised does not",
        "Unsupervised learning always performs better",
        "Supervised learning requires no training data",
        "Unsupervised learning only works on images",
      ],
      answer_index: 0,
    },
    {
      question: "In the cooking analogy, what do 'ingredients' represent?",
      options: ["Algorithms", "Data", "Predictions", "Labels"],
      answer_index: 1,
    },
    {
      question: "Why do we hold out a test set?",
      options: [
        "To train the model faster",
        "To estimate performance on unseen data",
        "To label unlabeled examples",
        "To reduce the number of features",
      ],
      answer_index: 1,
    },
  ],
};

export const MOCK_LESSON = mockLessonOutput;

export const MOCK_MESSAGES: AgentMessage[] = [
  {
    id: '1',
    agent_name: 'System',
    timestamp: '5:00 PM',
    content_json: null,
    raw_text: 'Course generation started for Prompt Engineering',
    status: 'done',
  },
  {
    id: '2',
    agent_name: 'ResearchAgent',
    timestamp: '5:01 PM',
    content_json: null,
    raw_text: 'Research complete. Found 7 sources across 5 key subtopics.',
    status: 'done',
  },
  {
    id: '3',
    agent_name: 'CurriculumAgent',
    timestamp: '5:03 PM',
    content_json: null,
    raw_text: 'Curriculum structured. 4 modules with 12 learning objectives created.',
    status: 'done',
  },
  {
    id: '4',
    agent_name: 'ContentWriterAgent',
    timestamp: '5:05 PM',
    content_json: null,
    raw_text: 'Module 1 lesson written with 7 citations. Ready for review.',
    status: 'done',
  },
];

export const mockAgentMessages: AgentMessage[] = [
  {
    id: "msg-001",
    agent_name: "System",
    timestamp: "2026-06-19T10:00:00Z",
    content_json: null,
    raw_text: "Course generation started for topic: Introduction to Machine Learning",
    status: "done",
  },
  {
    id: "msg-002",
    agent_name: "ResearchAgent",
    timestamp: "2026-06-19T10:01:12Z",
    content_json: mockResearchOutput,
    raw_text: "Research complete. Found 3 key findings across 4 subtopics.",
    status: "done",
  },
  {
    id: "msg-003",
    agent_name: "CurriculumAgent",
    timestamp: "2026-06-19T10:02:45Z",
    content_json: mockCurriculumOutput,
    raw_text: "Curriculum drafted with 2 modules.",
    status: "done",
  },
  {
    id: "msg-004",
    agent_name: "ContentWriterAgent",
    timestamp: "2026-06-19T10:04:30Z",
    content_json: mockLessonOutput,
    raw_text: "Lesson content written for Module 1.",
    status: "done",
  },
];

export const AGENT_AVATARS: Record<string, string> = {
  ResearchAgent: "/avatars/research-agent.png",
  CurriculumAgent: "/avatars/curriculum-agent.png",
  ContentWriterAgent: "/avatars/content-writer-agent.png",
  System: "/avatars/system-agent.png",
};
