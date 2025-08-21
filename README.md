🚚 Cargo Security System - Theft Prevention Platform

A comprehensive cargo theft prevention system that combines AI risk analysis with real-time alert monitoring. Built with modern technologies to secure freight transportation.

🌟 Features

🤖 AI-Powered Risk Analysis - AWS Bedrock integration for intelligent risk assessment

🚨 Real-time Alert System - Live monitoring and alert management

📊 Risk Dashboard - Visual analytics and risk distribution

🔔 Smart Notifications - Severity-based alert system (CRITICAL, HIGH, WARNING, INFO)

🌐 Modern Stack - Next.js 14, TypeScript, Tailwind CSS, PostgreSQL

🛠️ Tech Stack

Frontend: Next.js 14, React, TypeScript, Tailwind CSS

Backend: Next.js API Routes, TypeScript

Database: PostgreSQL with Prisma ORM

AI/ML: AWS Bedrock (Claude AI)

Deployment: AWS EC2, RDS, GitHub Actions CI/CD

Real-time: Polling-based alert updates

📋 Prerequisites

Before running this project, ensure you have:

Node.js 18+ installed

PostgreSQL database (local or cloud)

AWS account (for Bedrock AI features)

Git installed

🚀 Quick Start

1. Clone and Setup
# Clone the repository
git clone <your-repository-url>
cd cargo-security-app

# Install dependencies
npm install

2. Database Configuration
# Create PostgreSQL database (local)
createdb cargo_security

# Or use cloud database (ElephantSQL, Neon, etc.)
# Get your connection string

3. Environment Setup
Create .env.local file:

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cargo_security"

# AWS Bedrock (optional - for AI features)
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"

# Alternative: Use .env file if Prisma has issues

4. Database Initialization
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma db push

# Seed with sample data (optional)
npx prisma db seed

5. Start Development Server

# Run development server
npm run dev

# Or build for production
npm run build
npm start

6. Access Application
Open your browser and navigate to:
http://localhost:3000

📁 Project Structure
cargo-security-app/
├── app/
│   ├── api/
│   │   ├── alerts/
│   │   ├── cargos/
│   │   └── dashboard/
│   ├── components/
│   │   ├── AlertSystem.tsx
│   │   ├── CargoForm.tsx
│   │   ├── CargoList.tsx
│   │   └── RiskDashboard.tsx
│   ├── lib/
│   │   └── prisma.ts
│   ├── services/
│   │   └── riskAnalysisService.ts
│   └── page.tsx
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
└── package.json

🧪 Testing the Application
1. Test Risk Analysis
Create sample cargo shipments:

Low-Medium Risk Example:

json
{
  "description": "Construction materials",
  "value": "8000",
  "origin": "Joinville, SC",
  "destination": "São Francisco do Sul, SC",
  "weight": "2000",
  "dimensions": "3x2x1.5m"
}
Critical Risk Example:

json
{
  "description": "Electronics shipment",
  "value": "300000",
  "origin": "São Paulo, SP", 
  "destination": "Rio de Janeiro, RJ",
  "weight": "250",
  "dimensions": "1.2x1x0.8m"
}

2. Test Alert System
Access the test page:

http://localhost:3000/test-alerts
Or create alerts manually via API:

bash
curl -X POST http://localhost:3000/api/alerts \
  -H "Content-Type: application/json" \
  -d '{
    "cargoId": "your-cargo-id",
    "type": "SECURITY_THREAT",
    "message": "Security alert test",
    "severity": "CRITICAL"
  }'

3. Monitor Dashboard
Check the risk dashboard for:

Total cargo statistics

Risk level distribution

Critical alerts count

Recent high-risk shipments

🔧 API Endpoints
Method	Endpoint	Description
GET	/api/cargos	List all cargo shipments
POST	/api/cargos	Create new cargo with risk analysis
GET	/api/alerts	Get all alerts (with filters)
POST	/api/alerts	Create new alert
PATCH	/api/alerts/[id]	Update alert status
GET	/api/dashboard	Get dashboard statistics

🚦 Risk Levels
Level	Score Range	Description
🟢 LOW	0-39	Minimal risk, safe transportation
🟡 MEDIUM	40-59	Moderate risk, basic precautions
🟠 HIGH	60-79	Elevated risk, enhanced security
🔴 CRITICAL	80-100	Extreme risk, maximum security measures
🛡️ Alert Types
SECURITY_THREAT - Immediate security risks

ROUTE_DEVIATION - Route changes or diversions

WEATHER - Weather-related risks

TRAFFIC - Traffic and congestion issues

SCHEDULE_CHANGE - Timing and scheduling changes

🚨 Severity Levels
INFO - Informational messages

WARNING - Potential issues

HIGH - Serious concerns

CRITICAL - Emergency situations

📊 Deployment
AWS Deployment Setup
Setup AWS Resources:

EC2 instance for application

RDS PostgreSQL database

IAM roles for Bedrock access

Configure GitHub Secrets:

env
DATABASE_URL="your-rds-connection-string"
AWS_ACCESS_KEY_ID="your-aws-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret"
SSH_PRIVATE_KEY="your-ec2-ssh-key"
EC2_HOST="your-ec2-public-dns"
CI/CD Pipeline:

Automatic testing on pull requests

Deployment to EC2 on main branch push

Database migrations automated

Manual Deployment
# Build application
npm run build

# Start production server
npm start

# Environment variables
export DATABASE_URL="your-database-url"
export AWS_ACCESS_KEY_ID="your-aws-key"
export AWS_SECRET_ACCESS_KEY="your-aws-secret"

🐛 Troubleshooting
Common Issues:
Database Connection:

# Test database connection
npx prisma db push

Environment Variables:
# Check if .env is loaded
echo $DATABASE_URL
AWS Bedrock Access:

# Verify AWS credentials
aws sts get-caller-identity
Port Conflicts:

# Kill process on port 3000
npx kill-port 3000

📈 Future Enhancements
Real-time WebSocket notifications

Mobile app companion

GPS integration for live tracking

Machine learning model improvements

Multi-language support

Advanced reporting analytics

Integration with logistics APIs