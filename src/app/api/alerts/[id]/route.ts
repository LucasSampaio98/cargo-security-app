import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

// PATCH /api/alerts/:id - Update an alert
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params
        const body = await request.json()
        const { resolved } = body

        console.log('Trying to update an alert:', id, 'with resolved:', resolved)

        // Check if alert exists
        const alertaExistente = await prisma.alert.findUnique({
            where: { id }
        })

        if (!alertaExistente) {
            console.log('Alert not found:', id)
            return NextResponse.json(
                { error: 'Alert not found' },
                { status: 404 }
            )
        }

        // Update alert
        const alertaAtualizado = await prisma.alert.update({
            where: { id },
            data: {
                resolved: resolved !== undefined ? Boolean(resolved) : undefined
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

        console.log('Alert updated succesfully:', alertaAtualizado)
        return NextResponse.json(alertaAtualizado)

    } catch (error) {
        console.error('Error on alert update:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// DELETE /api/alerts/:id - Delete an alert
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params

        await prisma.alert.delete({
            where: { id }
        })

        return NextResponse.json({ message: 'Alert deleted succesfully' })

    } catch (error) {
        console.error('Error on deleting an alert:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// GET /api/alerts/:id - Search for an alert
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params

        const alerta = await prisma.alert.findUnique({
            where: { id },
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

        if (!alerta) {
            return NextResponse.json(
                { error: 'Alert not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(alerta)

    } catch (error) {
        console.error('Error on searching an alert:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}