import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { RiskLevel } from '@/app/models/ApplicationModel'
import { AlertWithCargo, RecentHighRiskCargo, RiskDistributionItem } from '@/app/models/RiskDashboardModel'

export async function GET(request: NextRequest) {
    try {
        // Search total statistics
        const totalCargos = await prisma.cargo.count()

        // Search high risks cargo (HIGH e CRITICAL)
        const highRiskCargos = await prisma.cargo.count({
            where: {
                riskLevel: {
                    in: ['HIGH', 'CRITICAL']
                }
            }
        })

        // Search for not resolved critical alerts
        const criticalAlerts = await prisma.alert.count({
            where: {
                severity: 'CRITICAL',
                resolved: false
            }
        })

        // Search for most recent alerts (last 5)
        const recentAlerts = await prisma.alert.findMany({
            where: {
                resolved: false
            },
            include: {
                cargo: {
                    select: {
                        description: true,
                        origin: true,
                        destination: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 5
        })

        // Risk distribution
        const riskDistribution = await prisma.cargo.groupBy({
            by: ['riskLevel'],
            _count: {
                riskLevel: true
            }
        })

        // Search most recents cargos with high risks
        const recentHighRiskCargos = await prisma.cargo.findMany({
            where: {
                riskLevel: {
                    in: ['HIGH', 'CRITICAL']
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 3,
            select: {
                id: true,
                description: true,
                origin: true,
                destination: true,
                riskLevel: true,
                riskScore: true
            }
        })

        // Map explicit types
        const mappedRecentAlerts = recentAlerts.map((alert: AlertWithCargo) => ({
            id: alert.id,
            message: alert.message,
            severity: alert.severity,
            createdAt: alert.createdAt,
            cargo: {
                description: alert.cargo.description,
                origin: alert.cargo.origin,
                destination: alert.cargo.destination
            }
        }))

        const mappedRiskDistribution = riskDistribution.map((item: RiskDistributionItem) => ({
            riskLevel: item.riskLevel as RiskLevel,
            _count: {
                riskLevel: item._count.riskLevel
            }
        }))

        const mappedRecentHighRiskCargos = recentHighRiskCargos.map((cargo: RecentHighRiskCargo) => ({
            id: cargo.id,
            description: cargo.description,
            origin: cargo.origin,
            destination: cargo.destination,
            riskLevel: cargo.riskLevel as RiskLevel | null,
            riskScore: cargo.riskScore
        }))

        const dashboardData = {
            totalCargos,
            highRiskCargos,
            criticalAlerts,
            recentAlerts: mappedRecentAlerts,
            riskDistribution: mappedRiskDistribution,
            recentHighRiskCargos: mappedRecentHighRiskCargos,
            updatedAt: new Date().toISOString()
        }

        return NextResponse.json(dashboardData)
    } catch (error) {
        console.error('Error on getting data for dashboard:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}