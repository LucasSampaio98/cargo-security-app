import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

// GET /api/alerts - Search alerts
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const resolved = searchParams.get('resolved')
        const severity = searchParams.get('severity')
        const limit = searchParams.get('limit') || '10'

        const alerts = await prisma.alert.findMany({
            where: {
                ...(resolved !== null ? { resolved: resolved === 'true' } : {}),
                ...(severity ? { severity: severity } : {}),
            },
            include: {
                cargo: {
                    select: {
                        description: true,
                        origin: true,
                        destination: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: parseInt(limit),
        })

        return NextResponse.json(alerts)
    } catch (error) {
        console.error('Erro on searching alerts:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// POST /api/alerts - Create new alert
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { cargoId, type, message, severity } = body

        if (!cargoId || !type || !message || !severity) {
            return NextResponse.json(
                { error: 'Required inputs missing' },
                { status: 400 }
            )
        }

        // Check if cargo exists
        const cargoExists = await prisma.cargo.findUnique({
            where: { id: cargoId },
        })

        if (!cargoExists) {
            return NextResponse.json(
                { error: 'Cargo not found' },
                { status: 404 }
            )
        }

        const alert = await prisma.alert.create({
            data: {
                cargoId,
                type,
                message,
                severity,
            },
            include: {
                cargo: {
                    select: {
                        description: true,
                        origin: true,
                        destination: true,
                    },
                },
            },
        })

        return NextResponse.json(alert, { status: 201 })
    } catch (error) {
        console.error('Error on searching for an alert:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}