import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: Request) {
  console.log('API route called')
  
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error('API key missing')
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      )
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })

    const { text, style } = await req.json()
    console.log('Received request:', { style, textLength: text?.length })

    if (!text) {
      return NextResponse.json(
        { error: 'No text provided' },
        { status: 400 }
      )
    }

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ 
          role: "user", 
          content: `Summarize this text in ${style} style: ${text}` 
        }],
        model: "gpt-3.5-turbo",
      })

      const summary = completion.choices[0].message.content
      console.log('Summary generated:', { length: summary?.length })

      return NextResponse.json({ summary })
    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError)
      return NextResponse.json(
        { error: 'OpenAI API error: ' + (openaiError instanceof Error ? openaiError.message : 'Unknown error') },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
} 