import prisma from "../../../../prisma/prisma"
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, jobTag } = await req.json()

  if (!email || !jobTag) {
    return NextResponse.json({ error: 'Email and jobTag are required' }, { status: 400 })
  }

  try {
    const exists = await prisma.jobSubscription.findFirst({
      where: { email, jobTag },
    })

    if (exists) {
      return NextResponse.json({ message: 'Already subscribed' }, { status: 200 })
    }

    const sub = await prisma.jobSubscription.create({
      data: { email, jobTag },
    })

    return NextResponse.json(sub, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to subscribe', details: err }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const jobTag = searchParams.get('tag') // "tag" pour rester cohérent avec ta query
  
    try {
      const filters: any = {}
      if (email) filters.email = email
      if (jobTag) filters.jobTag = jobTag
  
      if (!email && !jobTag) {
        return NextResponse.json(
          { error: 'At least email or tag is required' },
          { status: 400 }
        )
      }
  
      const subscriptions = await prisma.jobSubscription.findMany({
        where: filters,
      })
  
      return NextResponse.json(subscriptions, { status: 200 })
    } catch (error) {
      return NextResponse.json(
        { error: 'Error fetching subscriptions', details: error },
        { status: 500 }
      )
    }
  }
