import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { design, exportType, platform, image } = await request.json()

    if (!design || !exportType) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    let systemPrompt = ''
    
    if (exportType === 'code') {
      // Generate actual code
      systemPrompt = `You are a code generator. Generate clean, production-ready ${platform || 'React Native'} code based on this design structure:

${JSON.stringify(design, null, 2)}

Requirements:
- Use functional components
- Include proper imports
- Use Tailwind CSS or inline styles
- Make it responsive
- Add comments for clarity
- Follow best practices

Return ONLY the code, no explanations.`
    } else {
      // Generate prompt for AI tools
      const platformInstructions = {
        lovable: 'Format this as a detailed prompt for Lovable.ai. Be specific about components, layout, interactions, and styling.',
        v0: 'Format this as a prompt for v0.dev. Focus on component structure and Tailwind classes.',
        bolt: 'Format this as a prompt for Bolt.new. Include full specifications and behavior.',
        cursor: 'Format this as a prompt for Cursor AI. Be detailed about file structure and implementation.',
        rork: 'Format this as a prompt for Rork. Specify exact UI elements and their properties.'
      }

      systemPrompt = `You are a prompt engineer. Generate a detailed, structured prompt for ${platform || 'AI coding tools'} based on this design:

${JSON.stringify(design, null, 2)}

${platformInstructions[platform as keyof typeof platformInstructions] || 'Create a detailed, specific prompt.'}

The prompt should include:
1. Overall layout description
2. Each component with exact specifications
3. Color schemes (hex codes)
4. Typography (fonts, sizes, weights)
5. Spacing and dimensions
6. Interactions and behaviors
7. Responsive considerations

Make it so detailed that an AI can recreate this design perfectly.

Return the prompt as plain text, well-formatted and clear.`
    }

    const messages: any[] = [
      {
        role: 'system',
        content: systemPrompt
      }
    ]

    // Add image if available for better context
    if (image && exportType === 'prompt') {
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: 'Generate the prompt based on this design screenshot and structure.' },
          { type: 'image_url', image_url: { url: image } }
        ]
      })
    } else {
      messages.push({
        role: 'user',
        content: 'Generate the output based on the design structure provided.'
      })
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      max_tokens: 4096
    })

    const output = response.choices[0].message.content || ''

    return NextResponse.json({ output, exportType, platform })
  } catch (error: any) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate export' },
      { status: 500 }
    )
  }
}
