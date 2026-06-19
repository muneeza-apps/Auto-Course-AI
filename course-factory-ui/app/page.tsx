'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const topics = ['Prompt Engineering', 'Python for Beginners', 'Data Analysis', 'Digital Marketing', 'UX Design', 'Project Management']
const audiences = ['Complete Beginners', 'Working Professionals', 'Students', 'Team Leads']
const angles = ['Practical shortcuts first', 'Theory then practice', 'Case-study driven', 'Step-by-step tutorials']
const analogies = ['🍳 Cooking', '⚽ Sports', '🏗️ Construction', '🎬 Film-making', '🎮 Gaming', '📦 Logistics']
const agentMessages = ['🔍 ResearchAgent is searching the web...', '📋 CurriculumAgent is building your outline...', '✍️ ContentWriterAgent is writing your lesson...']

export default function Home() {
  const router = useRouter()
  const [sel, setSel] = useState({ topic: '', audience: '', angle: '', analogy: '' })
  const [loading, setLoading] = useState(false)
  const [msgIdx, setMsgIdx] = useState(0)
  const allSelected = Object.values(sel).every(Boolean)
  const progress = Object.values(sel).filter(Boolean).length

  function pick(key: string, val: string) { setSel(p => ({ ...p, [key]: val })) }

  function submit() {
    if (!allSelected) return
    setLoading(true)
    let i = 0
    const iv = setInterval(() => { i++; setMsgIdx(i % 3) }, 2000)
    setTimeout(() => { clearInterval(iv); router.push('/room/demo-room-001') }, 6500)
  }

  const sections = [
    { key: 'topic', num: '01', label: 'Choose your topic', items: topics },
    { key: 'audience', num: '02', label: 'Who is this for?', items: audiences },
    { key: 'angle', num: '03', label: 'Learning angle', items: angles },
    { key: 'analogy', num: '04', label: 'Explain using analogies from...', items: analogies },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F8F7FF 0%, #FFFFFF 50%)' }}>
      {/* HERO */}
      <div style={{ textAlign: 'center', padding: '72px 24px 56px', animation: 'fadeInUp 0.6s ease' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'linear-gradient(135deg, #EEEDFE, #E0DEFF)',
          color: '#534AB7', fontSize: '12px', fontWeight: 700,
          padding: '8px 20px', borderRadius: '999px', marginBottom: '28px',
          border: '1px solid #CECBF6', letterSpacing: '0.04em'
        }}>
          ✦ lablab.ai Hackathon 2026
        </div>
        <h1 style={{
          fontSize: 'clamp(44px, 8vw, 72px)', fontWeight: 900,
          color: '#0D0D0D', lineHeight: 1.0, marginBottom: '24px',
          letterSpacing: '-0.03em'
        }}>
          Build Any Course,<br />
          <span style={{ background: 'linear-gradient(135deg, #7F77DD, #1D9E75)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            In Minutes.
          </span>
        </h1>
        <p style={{ fontSize: '18px', color: '#6B7280', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.7 }}>
          Three AI agents collaborate live — researching, structuring, and writing your course automatically.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          {['🔍 Live Web Research', '📋 Smart Curriculum', '✍️ Full Lesson Content'].map((f, i) => (
            <div key={i} style={{
              fontSize: '13px', fontWeight: 500, color: '#7F77DD',
              background: 'white', border: '1px solid #E0DEFF',
              padding: '8px 16px', borderRadius: '999px',
              boxShadow: '0 2px 8px rgba(127,119,221,0.1)'
            }}>{f}</div>
          ))}
        </div>
      </div>

      {/* FORM */}
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px 80px' }}>
        {sections.map((s, si) => (
          <div key={s.key} style={{ marginBottom: '40px', animation: `fadeInUp 0.5s ease ${si * 0.1}s both` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{
                width: '30px', height: '30px', borderRadius: '10px',
                background: sel[s.key as keyof typeof sel] ? 'linear-gradient(135deg, #7F77DD, #3C3489)' : '#0D0D0D',
                color: 'white', fontSize: '11px', fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s', boxShadow: sel[s.key as keyof typeof sel] ? '0 4px 12px rgba(127,119,221,0.4)' : 'none'
              }}>{s.num}</span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#0D0D0D' }}>{s.label}</span>
              {sel[s.key as keyof typeof sel] && <span style={{ fontSize: '12px', color: '#1D9E75', fontWeight: 600 }}>✓ Selected</span>}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {s.items.map(item => (
                <button key={item} className={`chip ${sel[s.key as keyof typeof sel] === item ? 'active' : ''}`} onClick={() => pick(s.key, item)}>{item}</button>
              ))}
            </div>
          </div>
        ))}

        {/* Progress bar */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: 500 }}>Progress</span>
            <span style={{ fontSize: '13px', color: '#7F77DD', fontWeight: 700 }}>{progress}/4 sections</span>
          </div>
          <div style={{ height: '6px', background: '#E0DEFF', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: '999px',
              background: 'linear-gradient(90deg, #7F77DD, #1D9E75)',
              width: `${(progress / 4) * 100}%`,
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        <button className="gradient-btn" disabled={!allSelected} onClick={submit}>
          {allSelected ? 'Generate My Course →' : `Complete all 4 sections to continue (${progress}/4)`}
        </button>
      </div>

      {/* LOADING OVERLAY */}
      {loading && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(248,247,255,0.97)',
          backdropFilter: 'blur(10px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '24px',
            background: 'linear-gradient(135deg, #7F77DD, #3C3489)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '36px', marginBottom: '32px',
            boxShadow: '0 8px 32px rgba(127,119,221,0.4)',
            animation: 'glow 2s ease infinite'
          }}>🤖</div>
          <div className="spinner" style={{ marginBottom: '24px' }} />
          <p style={{ fontSize: '20px', fontWeight: 700, color: '#0D0D0D', marginBottom: '8px' }}>Agents at work...</p>
          <p style={{ fontSize: '16px', color: '#7F77DD', fontWeight: 500, textAlign: 'center', maxWidth: '300px' }}>
            {agentMessages[msgIdx]}
          </p>
          <div style={{ display: 'flex', gap: '6px', marginTop: '24px' }}>
            <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
          </div>
        </div>
      )}
    </div>
  )
}