// app/api/cargos/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { RiskAnalysisService } from '@/app/services/riskAnalysisService'

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()

        const riskService = new RiskAnalysisService()
        const riskAnalysis = await riskService.analyzeRisk({
            origin: data.origin,
            destination: data.destination,
            cargoValue: data.value,
            cargoType: data.description
        })

        const cargo = await prisma.cargo.create({
            data: {
                ...data,
                riskScore: riskAnalysis.riskScore,
                riskLevel: riskAnalysis.riskLevel
            }
        })

        return NextResponse.json({ cargo, riskAnalysis })
    } catch (error) {
        console.error('Error on creating cargo:', error)
        return NextResponse.json(
            { error: 'Erro on creating cargo' },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const cargos = await prisma.cargo.findMany({
            include: {
                alerts: {
                    where: { resolved: false },
                    orderBy: { createdAt: 'desc' }
                }
            },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(cargos)
    } catch (error) {
        return NextResponse.json(
            { error: 'Error on searching cargos' },
            { status: 500 }
        )
    }
}