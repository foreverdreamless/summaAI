'use client'

import React from 'react'
import { FileText, Layers, Settings } from 'lucide-react'

type FeatureCardProps = {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard(props: FeatureCardProps) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{props.icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center">{props.title}</h3>
      <p className="text-muted-foreground text-center">{props.description}</p>
    </div>
  )
}

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Features</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<FileText className="h-12 w-12 text-primary" />}
          title="Multiple Summary Types"
          description="Choose from concise, detailed, or bullet-point summaries to fit your needs."
        />
        <FeatureCard
          icon={<Layers className="h-12 w-12 text-primary" />}
          title="Batch Summarization"
          description="Summarize multiple documents or web pages at once, saving you time and effort."
        />
        <FeatureCard
          icon={<Settings className="h-12 w-12 text-primary" />}
          title="Customizable Output"
          description="Adjust the length and style of your summaries to match your preferences."
        />
      </div>
    </div>
  )
} 