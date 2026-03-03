import './globals.css'
import { AuthProvider } from '../contexts/AuthContext'

export const metadata = {
  title: 'Stock Analyzer',
  description: 'Real-time stock analysis and prediction',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
