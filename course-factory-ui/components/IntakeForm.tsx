"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const TOPICS = [
  "Prompt Engineering",
  "Python for Beginners",
  "Data Analysis",
  "Digital Marketing",
  "UX Design",
  "Project Management",
];

const AUDIENCES = [
  "Complete Beginners",
  "Working Professionals",
  "Students",
  "Team Leads",
];

const ANGLES = [
  "Practical shortcuts first",
  "Theory then practice",
  "Case-study driven",
  "Step-by-step tutorials",
];

const ANALOGIES = [
  "Cooking",
  "Sports",
  "Construction",
  "Film-making",
  "Gaming",
  "Logistics",
];

interface FormSectionProps {
  number: string;
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
}

function FormSection({ number, label, options, selected, onSelect }: FormSectionProps) {
  return (
    <section className="mb-10">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0D0D0D] text-[11px] font-semibold text-white">
          {number}
        </span>
        <h3 className="text-[15px] font-bold text-[#0D0D0D]">{label}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = selected === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={cn(
                "cursor-pointer rounded-full border-[1.5px] px-[18px] py-2 text-sm font-medium transition-all duration-150",
                isActive
                  ? "border-[#0D0D0D] bg-[#0D0D0D] text-white"
                  : "border-[#E5E7EB] bg-white text-[#3D3D3D] hover:border-purple hover:text-purple"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </section>
  );
}

interface IntakeFormProps {
  onSubmit: () => void;
}

export default function IntakeForm({ onSubmit }: IntakeFormProps) {
  const [topic, setTopic] = useState<string | null>(null);
  const [audience, setAudience] = useState<string | null>(null);
  const [angle, setAngle] = useState<string | null>(null);
  const [analogy, setAnalogy] = useState<string | null>(null);

  const isComplete = topic && audience && angle && analogy;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isComplete) return;
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl">
      <FormSection
        number="01"
        label="Choose your topic"
        options={TOPICS}
        selected={topic}
        onSelect={setTopic}
      />
      <FormSection
        number="02"
        label="Who is this for?"
        options={AUDIENCES}
        selected={audience}
        onSelect={setAudience}
      />
      <FormSection
        number="03"
        label="Learning angle"
        options={ANGLES}
        selected={angle}
        onSelect={setAngle}
      />
      <FormSection
        number="04"
        label="Explain using analogies from..."
        options={ANALOGIES}
        selected={analogy}
        onSelect={setAnalogy}
      />

      <button
        type="submit"
        disabled={!isComplete}
        className="mt-10 w-full cursor-pointer rounded-xl border-none px-4 py-4 text-base font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          background: "linear-gradient(135deg, #7F77DD 0%, #3C3489 100%)",
        }}
      >
        Generate My Course →
      </button>
    </form>
  );
}
