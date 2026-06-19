import type { Citation } from "@/lib/types";

interface CitationsListProps {
  citations: Citation[];
}

export default function CitationsList({ citations }: CitationsListProps) {
  if (citations.length === 0) return null;

  return (
    <section className="mt-10 border-t border-gray-100 pt-8">
      <h2 className="mb-4 text-lg font-bold text-[#0D0D0D]">Sources</h2>
      <ol className="space-y-3">
        {citations.map((citation) => (
          <li key={citation.marker} className="flex gap-3 text-sm">
            <span className="shrink-0 font-semibold text-purple">{citation.marker}</span>
            <a
              href={citation.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-dark hover:text-purple hover:underline"
            >
              {citation.source_title}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
