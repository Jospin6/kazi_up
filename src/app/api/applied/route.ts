import { NextRequest, NextResponse } from 'next/server'
import prisma from "../../../../prisma/prisma" 

// GET /api/applied?userId=xxx&jobId=yyy
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const jobId = searchParams.get('jobId')

    try {
        const applied = await prisma.applied.findMany({
            where: {
                ...(userId && { userId }),
                ...(jobId && { jobId }),
            },
            orderBy: { id: 'desc' },
        })

        return NextResponse.json(applied, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching applications', details: error }, { status: 500 })
    }
}

// POST /api/applied
export async function POST(req: NextRequest) {
    try {
      const { userId, jobId } = await req.json()
  
      if (!userId || !jobId) {
        return NextResponse.json(
          { error: 'userId and jobId are required.' },
          { status: 400 }
        )
      }
  
      // Vérifie si l'utilisateur a déjà postulé à ce job
      const existing = await prisma.applied.findFirst({
        where: {
          userId,
          jobId,
        },
      })
  
      if (existing) {
        return NextResponse.json(
          { message: 'Already applied to this job', applied: existing },
          { status: 200 }
        )
      }
  
      // Sinon, crée la candidature
      const newApplication = await prisma.applied.create({
        data: {
          userId,
          jobId,
        },
      })
  
      return NextResponse.json(newApplication, { status: 201 })
    } catch (error) {
      return NextResponse.json(
        { error: 'Error creating application', details: error },
        { status: 500 }
      )
    }
  }
  
