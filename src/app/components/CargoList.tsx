'use client'

import { useState, useEffect } from 'react'
import { Cargo } from '../models/CargoModel'

export default function CargoList() {
    const [cargos, setCargos] = useState<Cargo[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCargos()
    }, [])

    const fetchCargos = async () => {
        try {
            const response = await fetch('/api/cargos')
            const data = await response.json()
            setCargos(data)
        } catch (error) {
            console.error('Error on getting cargos:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Description</th>
                        <th className="px-4 py-2 text-left">Origin</th>
                        <th className="px-4 py-2 text-left">Destination</th>
                        <th className="px-4 py-2 text-left">Risk</th>
                        <th className="px-4 py-2 text-left">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {cargos.map((cargo) => (
                        <tr key={cargo.id} className="border-b">
                            <td className="px-4 py-2">{cargo.description}</td>
                            <td className="px-4 py-2">{cargo.origin}</td>
                            <td className="px-4 py-2">{cargo.destination}</td>
                            <td className="px-4 py-2">
                                <span className={`px-2 py-1 rounded text-xs ${cargo.riskLevel === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                                    cargo.riskLevel === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                                        cargo.riskLevel === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-green-100 text-green-800'
                                    }`}>
                                    {cargo.riskLevel} ({cargo.riskScore}%)
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(cargo.value)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}