import './globals.css'

export const metadata = {
  title: 'Stock Analyzer',
  description: 'Real-time stock analysis and prediction',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
