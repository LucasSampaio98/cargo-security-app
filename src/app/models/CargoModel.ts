export interface Cargo {
    id: string
    description: string
    value: number
    origin: string
    destination: string
    riskScore: number
    riskLevel: string
    createdAt: string
}

export interface CargoFormData {
    description: string
    value: string 
    origin: string
    destination: string
    weight: string 
    dimensions: string
}