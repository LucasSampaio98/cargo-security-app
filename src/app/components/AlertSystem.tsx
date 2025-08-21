'use client'

import { useState, useEffect } from 'react'
import { Alert } from '../models/AlertModel'

export default function AlertSystem() {
    const [alerts, setAlerts] = useState<Alert[]>([])
    const [loading, setLoading] = useState(true)
    const [showResolved, setShowResolved] = useState(false)

    useEffect(() => {
        fetchAlerts()
        // Polling
        const interval = setInterval(fetchAlerts, 30000)
        return () => clearInterval(interval)
    }, [showResolved])

    const fetchAlerts = async () => {
        try {
            const url = `/api/alerts?resolved=${showResolved}&limit=20`
            const response = await fetch(url)
            const data = await response.json()
            setAlerts(data)
        } catch (error) {
            console.error('Error on getting alert:', error)
        } finally {
            setLoading(false)
        }
    }

    const resolveAlert = async (alertId: string) => {
        try {
            const response = await fetch(`/api/alerts/${alertId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ resolved: true }),
            })

            if (response.ok) {
                fetchAlerts()
            }
        } catch (error) {
            console.error('Error on solving alert:', error)
        }
    }

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'CRITICAL':
                return 'bg-red-100 border-red-400 text-red-800'
            case 'DANGER':
                return 'bg-orange-100 border-orange-400 text-orange-800'
            case 'WARNING':
                return 'bg-yellow-100 border-yellow-400 text-yellow-800'
            default:
                return 'bg-blue-100 border-blue-400 text-blue-800'
        }
    }

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case 'CRITICAL':
                return '🔴'
            case 'DANGER':
                return '🟠'
            case 'WARNING':
                return '🟡'
            default:
                return '🔵'
        }
    }

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Alerts system</h2>
                <div className="text-center py-4">Loading alerts...</div>
            </div>
        )
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Alerts system</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-sm">Show resolved</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={showResolved}
                            onChange={() => setShowResolved(!showResolved)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>

            {alerts.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                    No alerts {showResolved ? 'solved' : 'to check out'}
                </div>
            ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {alerts.map((alert) => (
                        <div
                            key={alert.id}
                            className={`p-4 border rounded-lg ${getSeverityColor(
                                alert.severity
                            )}`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-start space-x-2">
                                    <span className="text-lg">{getSeverityIcon(alert.severity)}</span>
                                    <div>
                                        <h3 className="font-semibold">{alert.type.replace('_', ' ')}</h3>
                                        <p className="text-sm">{alert.message}</p>
                                        <p className="text-xs mt-1">
                                            Cargo: {alert.cargo.description} | {alert.cargo.origin} → {alert.cargo.destination}
                                        </p>
                                        <p className="text-xs">
                                            {new Date(alert.createdAt).toLocaleString('pt-BR')}
                                        </p>
                                    </div>
                                </div>
                                {!alert.resolved && (
                                    <button
                                        onClick={() => resolveAlert(alert.id)}
                                        className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                                    >
                                        Solve it
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <span>
                    Total: {alerts.length} alert{alerts.length !== 1 ? 's' : ''}
                </span>
                <button
                    onClick={fetchAlerts}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                >
                    Update
                </button>
            </div>
        </div>
    )
}