import { NextRequest, NextResponse } from 'next/server'
import prisma from "../../../../prisma/prisma" // adapte ce chemin à ton projet

// GET /api/views?userId=xxx&jobId=yyy
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  const jobId = searchParams.get('jobId')

  try {
    const views = await prisma.view.findMany({
      where: {
        ...(userId && { userId }),
        ...(jobId && { jobId }),
      },
      orderBy: { id: 'desc' },
    })

    return NextResponse.json(views, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching views', details: error }, { status: 500 })
  }
}

// POST /api/views
export async function POST(req: NextRequest) {
  try {
    const { userId, jobId } = await req.json()

    if (!userId && !jobId) {
      return NextResponse.json(
        { error: 'At least one of userId or jobId is required.' },
        { status: 400 }
      )
    }

    // Vérifie si une vue existe déjà pour ce userId et jobId
    if (userId && jobId) {
      const existing = await prisma.view.findFirst({
        where: {
          userId,
          jobId,
        },
      })

      if (existing) {
        return NextResponse.json(
          { message: 'Already viewed', view: existing },
          { status: 200 }
        )
      }
    }

    const newView = await prisma.view.create({
      data: {
        userId,
        jobId,
      },
    })

    return NextResponse.json(newView, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating view', details: error },
      { status: 500 }
    )
  }
}
