import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Auto Course AI',
  description: '3 AI agents research, structure & write your course in minutes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <nav style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #E0DEFF',
          padding: '14px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #7F77DD, #3C3489)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px'
            }}>🤖</div>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-0.02em' }}>Auto Course AI</span>
            <span style={{
              fontSize: '10px', fontWeight: 700,
              background: 'linear-gradient(135deg, #EEEDFE, #E0DEFF)',
              color: '#534AB7', padding: '3px 10px',
              borderRadius: '999px', letterSpacing: '0.08em'
            }}>BETA</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>lablab.ai Hackathon 2026</span>
            <a href="https://band.ai" target="_blank" rel="noopener noreferrer" style={{
              fontSize: '12px', color: '#7F77DD', fontWeight: 600,
              border: '1.5px solid #CECBF6', padding: '6px 16px',
              borderRadius: '999px', textDecoration: 'none',
              background: '#EEEDFE', transition: 'all 0.2s'
            }}>Powered by Band AI ↗</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
