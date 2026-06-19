'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const MESSAGES = [
  { id: '1', agent: 'System', time: '5:00 PM', text: 'Course generation started for "Prompt Engineering" — Working Professionals — Practical shortcuts first', color: '#9CA3AF', bg: 'agent-bubble-system', initials: 'SY' },
  { id: '2', agent: 'ResearchAgent', time: '5:01 PM', text: 'Research complete! Found 7 high-quality sources across 5 key subtopics. Passing structured findings to CurriculumAgent...', color: '#7F77DD', bg: 'agent-bubble-research', initials: 'RA', summary: '7 sources • 5 subtopics • Handing off to CurriculumAgent →' },
  { id: '3', agent: 'CurriculumAgent', time: '5:03 PM', text: 'Curriculum structured! Created 4 modules with 12 learning objectives, ordered for maximum engagement. Passing to ContentWriterAgent...', color: '#3B82F6', bg: 'agent-bubble-curriculum', initials: 'CA', summary: '4 modules • 12 objectives • Handing off to ContentWriterAgent →' },
  { id: '4', agent: 'ContentWriterAgent', time: '5:06 PM', text: 'Module 1 lesson complete! Written with cooking analogies, 7 inline citations, worked example, and 5 quiz questions. Ready for review!', color: '#1D9E75', bg: 'agent-bubble-content', initials: 'CW', summary: 'Full lesson • 7 citations • Quiz ready • Lesson complete ✓' },
]

const STATUS_LABELS = ['Research', 'Curriculum', 'Content']

export default function RoomPage() {
  const router = useRouter()
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(false)
  const [openJson, setOpenJson] = useState<string | null>(null)

  useEffect(() => {
    if (shown >= MESSAGES.length) return
    setTyping(true)
    const t1 = setTimeout(() => {
      setTyping(false)
      setShown(p => p + 1)
    }, shown === 0 ? 800 : 2000)
    return () => clearTimeout(t1)
  }, [shown])

  const isDone = shown >= MESSAGES.length
  const agentsDone = Math.max(0, shown - 1)

  return (
    <div style={{ minHeight: '100vh', background: '#F8F7FF', padding: '32px 16px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px' }}>

        {/* LEFT — Transcript */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0D0D0D' }}>Agent Workspace</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#E1F5EE', padding: '6px 14px', borderRadius: '999px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1D9E75', animation: 'glow 1.5s infinite' }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F6E56' }}>LIVE</span>
            </div>
          </div>

          {MESSAGES.slice(0, shown).map((m, i) => (
            <div key={m.id} className={`${m.bg} animate-slide-in`} style={{ animationDelay: `${i * 0.1}s` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '12px',
                  background: `linear-gradient(135deg, ${m.color}33, ${m.color}66)`,
                  border: `2px solid ${m.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 800, color: m.color, flexShrink: 0
                }}>{m.initials}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0D0D0D' }}>{m.agent}</div>
                  <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{m.time}</div>
                </div>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#3D3D3D', marginBottom: m.summary ? '10px' : '0' }}>{m.text}</p>
              {m.summary && (
                <div style={{ fontSize: '12px', fontWeight: 600, color: m.color, background: `${m.color}15`, padding: '6px 12px', borderRadius: '8px', display: 'inline-block' }}>
                  {m.summary}
                </div>
              )}
              <button onClick={() => setOpenJson(openJson === m.id ? null : m.id)} style={{ marginTop: '10px', display: 'block', fontSize: '11px', color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                {openJson === m.id ? '▲ Hide data' : '▾ View structured data'}
              </button>
              {openJson === m.id && (
                <pre style={{ marginTop: '8px', background: '#0D0D0D', color: '#4ADE80', fontSize: '11px', padding: '12px', borderRadius: '10px', overflow: 'auto', maxHeight: '160px', fontFamily: 'monospace' }}>
{`{
  "agent": "${m.agent}",
  "status": "complete",
  "timestamp": "${m.time}",
  "output": "Structured data passed to next agent"
}`}
                </pre>
              )}
            </div>
          ))}

          {typing && (
            <div className="agent-bubble-system animate-fade-in">
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#9CA3AF', marginRight: '8px' }}>Agent is typing</span>
                <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card">
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0D0D0D', marginBottom: '16px' }}>Pipeline Status</h3>
            {STATUS_LABELS.map((label, i) => {
              const done = agentsDone > i
              const active = agentsDone === i && shown > 0
              return (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < 2 ? '1px solid #F0EFFE' : 'none' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
                    background: done ? '#E1F5EE' : active ? '#EEEDFE' : '#F5F5F5',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px'
                  }}>
                    {done ? '✓' : active ? '⏳' : ['🔍','📋','✍️'][i]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0D0D0D' }}>{label}</div>
                    <div style={{ fontSize: '11px', color: done ? '#1D9E75' : active ? '#7F77DD' : '#9CA3AF', fontWeight: 500 }}>
                      {done ? 'Done ✓' : active ? 'In progress...' : 'Waiting'}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="card">
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0D0D0D', marginBottom: '12px' }}>Course Details</h3>
            {[['Topic', 'Prompt Engineering'], ['Audience', 'Working Professionals'], ['Angle', 'Practical first'], ['Analogy', '🍳 Cooking']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F5F5F5', fontSize: '13px' }}>
                <span style={{ color: '#9CA3AF', fontWeight: 500 }}>{k}</span>
                <span style={{ color: '#0D0D0D', fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>

          <button
            className="gradient-btn"
            disabled={!isDone}
            onClick={() => router.push('/lesson/module-1')}
            style={{ opacity: isDone ? 1 : 0.4 }}
          >
            {isDone ? 'View Full Lesson →' : 'Agents working...'}
          </button>
        </div>
      </div>
    </div>
  )
}
