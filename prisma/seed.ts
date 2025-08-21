// prisma/seed.js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    // Some cargo examples
    await prisma.cargo.createMany({
        data: [
            {
                description: 'High technology electronics',
                value: 150000,
                origin: 'São Paulo, SP',
                destination: 'Rio de Janeiro, RJ',
                weight: 500,
                dimensions: '2x2x1.5m',
                riskScore: 85,
                riskLevel: 'HIGH'
            },
            {
                description: 'Remedies',
                value: 80000,
                origin: 'Campinas, SP',
                destination: 'Belo Horizonte, MG',
                weight: 300,
                dimensions: '1.5x1.5x1m',
                riskScore: 45,
                riskLevel: 'MEDIUM'
            },
            {
                description: 'Clothes',
                value: 25000,
                origin: 'Blumenau, SC',
                destination: 'Curitiba, PR',
                weight: 400,
                dimensions: '2x1.5x1m',
                riskScore: 25,
                riskLevel: 'LOW'
            }
        ],
        skipDuplicates: true,
    })

    console.log('Data succesfully created!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })