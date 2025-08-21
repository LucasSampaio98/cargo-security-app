export interface Alert {
    id: string
    type: string
    message: string
    severity: 'INFO' | 'WARNING' | 'DANGER' | 'CRITICAL'
    resolved: boolean
    createdAt: string
    cargo: {
        description: string
        origin: string
        destination: string
    }
}