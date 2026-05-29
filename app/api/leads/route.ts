import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, message } = body

    // 1. Basic validation
    if (!email) {
      return NextResponse.json(
        { error: 'E-mail je povinný údaj.' },
        { status: 400 }
      )
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Neplatný formát e-mailu.' },
        { status: 400 }
      )
    }

    // Validate name and company as strings if present
    if (name && typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Neplatný formát jména.' },
        { status: 400 }
      )
    }
    if (company && typeof company !== 'string') {
      return NextResponse.json(
        { error: 'Neplatný formát názvu firmy.' },
        { status: 400 }
      )
    }

    // 3. Upsert lead in database
    // We update fields if the lead already exists by email (the unique key).
    // Note: Since 'message' is not in the schema.prisma Lead model, we validate it in code,
    // but do not persist it to the database to prevent TypeScript and schema validation errors.
    const lead = await prisma.lead.upsert({
      where: { email },
      update: {
        name: name || undefined,
        company: company || undefined,
      },
      create: {
        email,
        name: name || null,
        company: company || null,
        status: 'NEW',
      },
    })

    // Log the message to console/stdout so that it's captured in server logs
    if (message) {
      console.log(`[Lead Message from ${email}]: ${message}`)
    }

    return NextResponse.json({ success: true, lead }, { status: 200 })

  } catch (error: any) {
    console.error('Error in leads POST API:', error)
    return NextResponse.json(
      { error: 'Došlo k interní chybě při zpracování poptávky.' },
      { status: 500 }
    )
  }
}
