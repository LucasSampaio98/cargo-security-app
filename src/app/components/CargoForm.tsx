'use client'

import { useState } from 'react'
import { CargoFormData } from '../models/CargoModel'

export default function CargoForm() {
    const [formData, setFormData] = useState<CargoFormData>({
        description: '',
        value: '',
        origin: '',
        destination: '',
        weight: '',
        dimensions: ''
    })

    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleInputChange = (field: keyof CargoFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const payload = {
            ...formData,
            value: parseFloat(formData.value) || 0,
            weight: parseFloat(formData.weight) || 0
        }

        try {
            const response = await fetch('/api/cargos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            const data = await response.json()
            setResult(data)

            if (response.ok) {
                setFormData({
                    description: '',
                    value: '',
                    origin: '',
                    destination: '',
                    weight: '',
                    dimensions: ''
                })
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Cargo description</label>
                    <input
                        type="text"
                        required
                        className="w-full p-2 border rounded"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Value (USD)</label>
                        <input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            className="w-full p-2 border rounded"
                            value={formData.value}
                            onChange={(e) => handleInputChange('value', e.target.value)}
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Weight (kg)</label>
                        <input
                            type="number"
                            required
                            min="0"
                            step="0.1"
                            className="w-full p-2 border rounded"
                            value={formData.weight}
                            onChange={(e) => handleInputChange('weight', e.target.value)}
                            placeholder="0.0"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Origin</label>
                        <input
                            type="text"
                            required
                            className="w-full p-2 border rounded"
                            value={formData.origin}
                            onChange={(e) => handleInputChange('origin', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Destination</label>
                        <input
                            type="text"
                            required
                            className="w-full p-2 border rounded"
                            value={formData.destination}
                            onChange={(e) => handleInputChange('destination', e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium">Dimensions (W x H x L)</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={formData.dimensions}
                        onChange={(e) => handleInputChange('dimensions', e.target.value)}
                        placeholder="Ex: 2x1.5x1m"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50 hover:bg-blue-600 transition-colors"
                >
                    {loading ? 'Analysing risk...' : 'Check risk'}
                </button>
            </form>

            {result && (
                <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                    <h3 className="text-lg font-semibold mb-3">Analysis result</h3>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <span className="text-sm text-gray-600">Risk score:</span>
                            <p className="text-xl font-bold">
                                {result.riskAnalysis?.riskScore || 0}/100
                            </p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-600">Level:</span>
                            <p className="text-xl font-bold">
                                {result.riskAnalysis?.riskLevel || 'N/A'}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Recommendations:</h4>
                        <ul className="list-disc list-inside space-y-1">
                            {result.riskAnalysis?.recommendations?.map((rec: string, index: number) => (
                                <li key={index} className="text-sm">{rec}</li>
                            )) || <li className="text-sm">No recommendations available</li>}
                        </ul>
                    </div>

                    {result.cargo && (
                        <div className="mt-4 pt-4 border-t">
                            <h4 className="font-semibold mb-2">Cargo registered:</h4>
                            <p className="text-sm">ID: {result.cargo.id}</p>
                        </div>
                    )}
                </div>
            )}

            {result?.error && (
                <div className="mt-6 p-4 border rounded-lg bg-red-50 text-red-800">
                    <h3 className="text-lg font-semibold mb-2">Error</h3>
                    <p>{result.error}</p>
                </div>
            )}
        </div>
    )
}