'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { Button } from "../../components/ui/button"
import { Textarea } from "../../components/ui/textarea"
import { Upload, FileText, AlignLeft, List } from 'lucide-react'
import { parseFile } from '../utils/fileParser'

export default function HomePage() {
  const [text, setText] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSummarize = async (style: string) => {
    if (!text) {
      alert('Please enter some text to summarize')
      return
    }

    try {
      setLoading(true)
      console.log('Sending request:', { style, textLength: text.length })
      
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, style }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Response received:', data)
      
      if (data.error) {
        throw new Error(data.error)
      }

      setSummary(data.summary)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      console.error('Full error details:', error)
      setError(errorMessage)
      alert(`Failed to generate summary: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setLoading(true)
      const text = await parseFile(file)
      setText(text)
    } catch (error) {
      console.error('Error reading file:', error)
      alert(error instanceof Error ? error.message : 'Error reading file')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="h-8">
            <img 
              src="/logo.png" 
              alt="SummaAI Logo" 
              className="h-full w-auto object-contain"
              style={{ 
                maxWidth: '150px',
                height: 'auto'
              }}
              onError={(e) => console.error('Logo failed to load:', e)}
            />
          </div>
          <nav className="space-x-4">
            <Link href="/" className="text-foreground hover:text-primary">Home</Link>
            <Link href="/features" className="text-foreground hover:text-primary">Features</Link>
            <Link href="/about" className="text-foreground hover:text-primary">About</Link>
            <Link href="/contact" className="text-foreground hover:text-primary">Contact</Link>
            <Button variant="outline">Login</Button>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container mx-auto">
          <section className="max-w-3xl mx-auto space-y-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold tracking-tight">Simplify Your Reading with AI-Powered Summarization</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Paste your text or upload a document to get started
              </p>
            </div>

            <Textarea 
              placeholder="Paste your text or URL here..." 
              className="w-full h-40"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            
            <div className="flex gap-4 flex-wrap">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".txt,.docx,.pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button variant="outline" asChild>
                  <span>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                  </span>
                </Button>
              </label>
              <div className="space-x-2">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => handleSummarize('concise')}
                  disabled={loading}
                >
                  <FileText className="mr-2 h-4 w-4" /> Concise
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => handleSummarize('abstract')}
                  disabled={loading}
                >
                  <AlignLeft className="mr-2 h-4 w-4" /> Abstract
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => handleSummarize('bullet points')}
                  disabled={loading}
                >
                  <List className="mr-2 h-4 w-4" /> Bullet Points
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => handleSummarize('detailed')}
                  disabled={loading}
                >
                  <AlignLeft className="mr-2 h-4 w-4" /> Detailed
                </Button>
              </div>
            </div>
            {loading && (
              <div className="text-center p-4">
                <p className="text-muted-foreground">Generating summary...</p>
              </div>
            )}
            {summary && (
              <div className="mt-8 p-6 bg-card rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">Summary</h2>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{summary}</p>
                </div>
              </div>
            )}
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                Error: {error}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="bg-background p-4 text-center">
        <div className="container mx-auto">
          <Link href="/privacy" className="text-foreground hover:text-primary mr-4">Privacy Policy</Link>
          <Link href="/terms" className="text-foreground hover:text-primary mr-4">Terms of Service</Link>
          <Link href="/contact" className="text-foreground hover:text-primary">Contact Information</Link>
        </div>
      </footer>
    </div>
  )
}