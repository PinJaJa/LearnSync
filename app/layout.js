export const metadata = {
  title: 'LearnSync',
  description: 'An innovative educational platform that combines AI-powered learning tools with collaborative features.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}