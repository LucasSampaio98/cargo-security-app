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

# Clone the repository
git clone <your-repository-url>
cd cargo-security-app

# Install dependencies
npm install

# Create PostgreSQL database (local)
createdb cargo_security
Or use cloud database (ElephantSQL, Neon, etc.)

# Environment Setup
Create .env.local file:

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cargo_security"

# AWS Bedrock (optional - for AI features)
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"

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

app/ - Next.js app directory

api/ - API routes

alerts/ - Alert management endpoints

cargos/ - Cargo management endpoints

dashboard/ - Dashboard data endpoint

components/ - React components

AlertSystem.tsx - Real-time alert system

CargoForm.tsx - Cargo registration form

CargoList.tsx - Cargo listing

RiskDashboard.tsx - Risk analytics dashboard

lib/ - Utilities

prisma.ts - Database client

services/ - Business logic

riskAnalysisService.ts - AI risk analysis

prisma/ - Database schema and migrations

schema.prisma - Database schema

seed.ts - Sample data

public/ - Static assets

favicon.ico, images, etc.

Root files - Configuration files

.env.local - Environment variables

package.json - Dependencies and scripts

tailwind.config.js - Styling configuration

tsconfig.json - TypeScript configuration

7. Testing the Application

Create sample cargo shipments:

Low-Medium Risk Example:

{
  "description": "Construction materials",
  "value": "8000",
  "origin": "Joinville, SC",
  "destination": "São Francisco do Sul, SC",
  "weight": "2000",
  "dimensions": "3x2x1.5m"
}

Critical Risk Example:

{
  "description": "Electronics shipment",
  "value": "300000",
  "origin": "São Paulo, SP", 
  "destination": "Rio de Janeiro, RJ",
  "weight": "250",
  "dimensions": "1.2x1x0.8m"
}

8. Test Alert System
  
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

9. Monitor Dashboard
10. 
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

# Test database connection
npx prisma db push

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

Work on pipeline script