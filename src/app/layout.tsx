import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cargo Theft Prevention System',
  description: 'Cargo Theft Prevention System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50">
        <header className="bg-blue-800 text-white p-4">
          <h1 className="text-2xl font-bold">Cargo Theft Prevention System</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}