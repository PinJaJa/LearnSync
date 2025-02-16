export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Welcome to LearnSync</h1>
        <p className="text-xl mb-4">An innovative educational platform that combines AI-powered learning tools with collaborative features.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <FeatureCard
            title="AI Tutor"
            description="Interactive AI-powered tutoring system with personalized learning experience"
          />
          <FeatureCard
            title="Smart Notes"
            description="Efficient note organization and management system with user-friendly interface"
          />
          <FeatureCard
            title="Auto Quiz Generator"
            description="Automatically generates quizzes from study materials to reinforce learning"
          />
          <FeatureCard
            title="Study Planner"
            description="Schedule management for study sessions with progress tracking"
          />
          <FeatureCard
            title="Collaboration Hub"
            description="Peer collaboration on study materials in an interactive environment"
          />
          <FeatureCard
            title="AI-powered Revision"
            description="Smart feedback and AI-assisted revision system"
          />
        </div>
      </div>
    </main>
  )
}

function FeatureCard({ title, description }) {
  return (
    <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}