import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { currentDesign, userMessage, image } = await request.json()

    if (!userMessage) {
      return NextResponse.json(
        { error: 'No message provided' },
        { status: 400 }
      )
    }

    const messages: any[] = [
      {
        role: 'system',
        content: `You are a UI design assistant. You help users modify and improve UI designs based on their requests.

Current design structure: ${JSON.stringify(currentDesign, null, 2)}

The user will request changes. Your job is to:
1. Understand their request
2. Modify the design structure accordingly
3. Return the updated design as JSON
4. Also provide a brief explanation of what you changed

Return your response in this JSON format:
{
  "design": { updated design structure },
  "explanation": "What I changed and why"
}

Return ONLY valid JSON.`
      }
    ]

    // Add image context if available
    if (image) {
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: userMessage },
          { type: 'image_url', image_url: { url: image } }
        ]
      })
    } else {
      messages.push({
        role: 'user',
        content: userMessage
      })
    }

    const response = await openai.chat.completions.create({
      model: image ? 'gpt-4o' : 'gpt-4o',
      messages,
      max_tokens: 4096
    })

    const responseText = response.choices[0].message.content || '{}'
    
    // Parse response
    let result
    try {
      const cleanedText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '')
      result = JSON.parse(cleanedText)
    } catch (e) {
      result = {
        design: currentDesign,
        explanation: responseText
      }
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Adjustment error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to adjust design' },
      { status: 500 }
    )
  }
}
