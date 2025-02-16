export const metadata = {
  title: 'LearnSync',
  description: 'An innovative educational platform that combines AI-powered learning tools with collaborative features.',
  keywords: 'education, AI tutor, smart notes, quiz generator, study planner, collaboration',
  authors: [{ name: 'LearnSync' }],
  openGraph: {
    title: 'LearnSync - AI-Powered Educational Platform',
    description: 'An innovative educational platform that combines AI-powered learning tools with collaborative features',
    type: 'website'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen bg-white">
        <div className="flex flex-col min-h-screen">
          <header className="sr-only" role="banner">
            <nav role="navigation" aria-label="Skip links">
              <a href="#main-content" className="skip-link">Skip to main content</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}