export interface AlertWithCargo {
    id: string
    message: string
    severity: string
    createdAt: string
    cargo: {
        description: string
        origin: string
        destination: string
    }
}

export interface RiskDistributionItem {
    riskLevel: string
    _count: {
        riskLevel: number
    }
}

export interface RecentHighRiskCargo {
    id: string
    description: string
    origin: string
    destination: string
    riskLevel: string | null
    riskScore: number | null
}

export interface LoadDashboardData {
    totalCargos: number
    highRiskCargos: number
    criticalAlerts: number
    recentAlerts: AlertWithCargo[]
    riskDistribution: RiskDistributionItem[]
    recentHighRiskCargos: RecentHighRiskCargo[]
    updatedAt: string
}