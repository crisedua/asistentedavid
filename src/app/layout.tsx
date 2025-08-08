import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Capital de Salud - Tu bienestar personalizado',
  description: 'Te ayudamos a crear hábitos simples con impacto real en tu salud',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
