import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Analyze the screenshot with GPT-4o (has vision capabilities)
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this UI screenshot in detail. Provide a structured JSON response with:
              
1. layout: overall layout type (stack, grid, etc)
2. components: array of components with their type, position, and properties
3. colors: color scheme used
4. typography: fonts and sizes
5. spacing: padding and margins
6. interactions: any buttons or interactive elements

Be extremely detailed and precise. Focus on extracting every visual element.

Return ONLY valid JSON, no other text.`
            },
            {
              type: 'image_url',
              image_url: {
                url: image
              }
            }
          ]
        }
      ],
      max_tokens: 4096
    })

    const analysisText = response.choices[0].message.content || '{}'
    
    // Try to parse as JSON
    let analysis
    try {
      // Remove markdown code blocks if present
      const cleanedText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '')
      analysis = JSON.parse(cleanedText)
    } catch (e) {
      // If parsing fails, return raw text
      analysis = {
        raw: analysisText,
        parsed: false
      }
    }

    return NextResponse.json({ analysis })
  } catch (error: any) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to analyze image' },
      { status: 500 }
    )
  }
}
