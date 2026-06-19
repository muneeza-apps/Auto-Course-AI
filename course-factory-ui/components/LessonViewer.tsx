import ReactMarkdown from "react-markdown";
import type { LessonOutput } from "@/lib/types";
import CitationsList from "./CitationsList";
import QuizComponent from "./QuizComponent";

interface LessonViewerProps {
  lesson: LessonOutput;
}

export default function LessonViewer({ lesson }: LessonViewerProps) {
  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-10">
        <span className="inline-block rounded-full bg-purple-light px-3 py-1 text-xs font-semibold text-purple-dark">
          Module {lesson.module_number}
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0D0D0D]">
          {lesson.title}
        </h1>
      </header>

      <div className="space-y-4 leading-relaxed text-[#3D3D3D] [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#0D0D0D] [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#0D0D0D] [&_p]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#0D0D0D]">
        <ReactMarkdown>{lesson.lesson_markdown}</ReactMarkdown>
      </div>

      {lesson.worked_example && (
        <section className="mt-10 rounded-2xl border border-purple-light bg-purple-light/40 p-6">
          <h2 className="mb-3 text-lg font-bold text-[#0D0D0D]">Worked Example</h2>
          <div className="space-y-3 text-sm leading-relaxed text-[#3D3D3D] [&_p]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#0D0D0D]">
            <ReactMarkdown>{lesson.worked_example}</ReactMarkdown>
          </div>
        </section>
      )}

      <CitationsList citations={lesson.citations} />
      <QuizComponent questions={lesson.quiz} />
    </article>
  );
}
