import Link from "next/link";
import type { AgentMessage } from "@/lib/types";
import { mockAgentMessages, DEMO_LESSON_ID } from "@/lib/mock-data";
import AgentBubble from "./AgentBubble";

interface AgentRoomProps {
  roomId: string;
  messages?: AgentMessage[];
}

export default function AgentRoom({
  roomId,
  messages = mockAgentMessages,
}: AgentRoomProps) {
  const hasLesson = messages.some(
    (m) => m.agent_name === "ContentWriterAgent" && m.content_json !== null
  );

  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col bg-[#FAFAFA]">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-[#0D0D0D]">Live Agent Room</h1>
            <p className="mt-0.5 text-sm text-gray-400">Session · {roomId}</p>
          </div>
          {hasLesson && (
            <Link
              href={`/lesson/${DEMO_LESSON_ID}`}
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #7F77DD 0%, #3C3489 100%)",
              }}
            >
              View Lesson →
            </Link>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto max-w-3xl space-y-8">
          {messages.map((message) => (
            <AgentBubble key={message.id} message={message} />
          ))}
        </div>
      </div>
    </div>
  );
}
