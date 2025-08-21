'use client'

import { useState, useEffect } from 'react'
import { LoadDashboardData } from '../models/RiskDashboardModel'

export default function RiskDashboard() {
    const [data, setData] = useState<LoadDashboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch('/api/dashboard')

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`)
            }

            const data = await response.json()
            setData(data)
        } catch (error) {
            console.error('Error:', error)
            setError('Failure getting data')
        } finally {
            setLoading(false)
        }
    }

    const getRiskLevelColor = (riskLevel: string) => {
        switch (riskLevel) {
            case 'CRITICAL': return 'bg-red-100 text-red-800'
            case 'HIGH': return 'bg-orange-100 text-orange-800'
            case 'MEDIUM': return 'bg-yellow-100 text-yellow-800'
            case 'LOW': return 'bg-green-100 text-green-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    if (loading) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Risk dashboard</h2>
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Risk dashboard</h2>
                <div className="text-center py-8 text-red-600">
                    <p>{error}</p>
                    <button
                        onClick={fetchDashboardData}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Try again
                    </button>
                </div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Risk dashboard</h2>
                <div className="text-center py-8 text-gray-600">
                    <p>No data</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Risk dashboard</h2>
                <span className="text-xs text-gray-500">
                    Updated: {new Date(data.updatedAt).toLocaleTimeString('pt-BR')}
                </span>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">Total cargo</p>
                    <p className="text-2xl font-bold text-blue-800">{data.totalCargos}</p>
                </div>

                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <p className="text-sm text-red-700">High Risk</p>
                    <p className="text-2xl font-bold text-red-800">{data.highRiskCargos}</p>
                </div>

                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                    <p className="text-sm text-orange-700">Critical alerts</p>
                    <p className="text-2xl font-bold text-orange-800">{data.criticalAlerts}</p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700">Low Risk</p>
                    <p className="text-2xl font-bold text-green-800">
                        {data.riskDistribution.find(r => r.riskLevel === 'LOW')?._count.riskLevel || 0}
                    </p>
                </div>
            </div>

            {/* Risk distribution */}
            <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-700">Risk distribution</h3>
                <div className="grid grid-cols-4 gap-2">
                    {data.riskDistribution.map((item) => (
                        <div key={item.riskLevel} className="text-center">
                            <div className={`p-2 rounded ${getRiskLevelColor(item.riskLevel)}`}>
                                <div className="text-lg font-bold">{item._count.riskLevel}</div>
                                <div className="text-xs capitalize">{item.riskLevel.toLowerCase()}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Most recent alerts */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2 text-gray-700">Recent alerts</h3>
                <div className="space-y-2">
                    {data.recentAlerts.slice(0, 3).map(alert => (
                        <div key={alert.id} className={`p-2 rounded text-sm ${alert.severity === 'CRITICAL' ? 'bg-red-100 text-red-800 border border-red-200' :
                            alert.severity === 'HIGH' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                                'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            }`}>
                            <div className="font-medium">{alert.message}</div>
                            <div className="text-xs mt-1">
                                {alert.cargo.description} | {alert.cargo.origin} → {alert.cargo.destination}
                            </div>
                            <div className="text-xs text-gray-500">
                                {new Date(alert.createdAt).toLocaleString('pt-BR')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* High risk recent cargos */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2 text-gray-700">High risk cargos</h3>
                <div className="space-y-2">
                    {data.recentHighRiskCargos.map(cargo => (
                        <div key={cargo.id} className="p-2 bg-gray-50 rounded border">
                            <div className="font-medium text-sm">{cargo.description}</div>
                            <div className="text-xs text-gray-600">
                                {cargo.origin} → {cargo.destination}
                            </div>
                            <div className="text-xs mt-1">
                                <span className={`px-1 rounded ${getRiskLevelColor(cargo.riskLevel || 'MEDIUM')}`}>
                                    {cargo.riskLevel} ({cargo.riskScore}%)
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={fetchDashboardData}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors text-sm"
            >
                Update dashboard
            </button>
        </div>
    )
}