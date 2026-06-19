import Link from "next/link";
import LessonViewer from "@/components/LessonViewer";
import { mockLessonOutput } from "@/lib/mock-data";

interface LessonPageProps {
  params: { id: string };
}

export default function LessonPage({ params }: LessonPageProps) {
  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-gray-400 transition-colors hover:text-purple"
          >
            ← Back to Home
          </Link>
          <span className="rounded-full bg-purple-light px-3 py-1 text-xs font-medium text-purple-dark">
            Lesson · {params.id}
          </span>
        </div>
      </div>

      <div className="px-6 py-12">
        <LessonViewer lesson={mockLessonOutput} />
      </div>
    </main>
  );
}
