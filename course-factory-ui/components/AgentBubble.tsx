import type { AgentMessage } from "@/lib/types";
import { cn } from "@/lib/utils";

const AGENT_BADGE: Record<AgentMessage["agent_name"], string> = {
  ResearchAgent: "bg-green-light text-green-brand",
  CurriculumAgent: "bg-purple-light text-purple-dark",
  ContentWriterAgent: "bg-purple-light text-purple",
  System: "bg-gray-100 text-gray-400",
};

const AGENT_BUBBLE_CLASS: Record<AgentMessage["agent_name"], string> = {
  ResearchAgent: "agent-bubble-research",
  CurriculumAgent: "agent-bubble-curriculum",
  ContentWriterAgent: "agent-bubble-content",
  System: "agent-bubble-system",
};

interface AgentBubbleProps {
  message: AgentMessage;
}

export default function AgentBubble({ message }: AgentBubbleProps) {
  const isSystem = message.agent_name === "System";

  return (
    <div className={cn("flex gap-3", isSystem ? "justify-center" : "items-start")}>
      {!isSystem && (
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold",
            AGENT_BADGE[message.agent_name]
          )}
          title={`${message.agent_name} avatar`}
        >
          {message.agent_name.replace("Agent", "").charAt(0)}
        </div>
      )}

      <div className={cn("max-w-2xl", isSystem && "text-center")}>
        {!isSystem && (
          <div className="mb-1.5 flex items-center gap-2">
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                AGENT_BADGE[message.agent_name]
              )}
            >
              {message.agent_name}
            </span>
            <time className="text-xs text-gray-400">
              {new Date(message.timestamp).toLocaleTimeString()}
            </time>
          </div>
        )}

        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isSystem
              ? "text-sm italic text-gray-400"
              : cn("text-[#3D3D3D] shadow-sm", AGENT_BUBBLE_CLASS[message.agent_name])
          )}
        >
          {message.status === "typing" ? (
            <span className="inline-flex gap-1 text-purple">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce [animation-delay:0.1s]">.</span>
              <span className="animate-bounce [animation-delay:0.2s]">.</span>
            </span>
          ) : (
            message.raw_text
          )}
        </div>
      </div>
    </div>
  );
}
