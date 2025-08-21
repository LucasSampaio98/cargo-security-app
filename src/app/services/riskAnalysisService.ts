// services/riskAnalysisService.ts
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { RiskAnalysisInput, RiskAnalysisResult } from "../models/RiskAnalysisServiceModel";
import { RiskLevel } from "../models/ApplicationModel";

const bedrockClient = new BedrockRuntimeClient({
    region: process.env.AWS_REGION || 'us-east-1',
});

export class RiskAnalysisService {
    async analyzeRisk(input: RiskAnalysisInput): Promise<RiskAnalysisResult> {
        const prompt = `
        Analyze the risk of cargo theft for the following transportation:
        Origin: ${input.origin}
        Destination: ${input.destination} 
        Cargo value: R$ ${input.cargoValue}
        Cargo type: ${input.cargoType}

        Consider factors such as:
        - Historical theft records in the region
        - Type of highway/road
        - Time of transportation
        - Cargo value
        - Weather conditions

        Return a JSON with:
        - riskScore: number from 0-100
        - riskLevel: LOW, MEDIUM, HIGH or CRITICAL
        - recommendations: array of recommendations
    `;

        try {
            const response = await bedrockClient.send(new InvokeModelCommand({
                modelId: 'anthropic.claude-v2',
                contentType: 'application/json',
                accept: 'application/json',
                body: JSON.stringify({
                    prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
                    max_tokens_to_sample: 1000,
                    temperature: 0.5,
                }),
            }));

            const result = JSON.parse(new TextDecoder().decode(response.body));
            return JSON.parse(result.completion);
        } catch (error) {
            // Fallback in case of failure
            return this.fallbackAnalysis(input);
        }
    }

    private fallbackAnalysis(input: RiskAnalysisInput): RiskAnalysisResult {
        let riskScore = 50;

        // Simple fallback logic
        if (input.cargoValue > 100000) riskScore += 20;

        // Explicit conversion to RiskLevel
        const riskLevel: RiskLevel = riskScore >= 80 ? 'CRITICAL' :
            riskScore >= 60 ? 'HIGH' :
                riskScore >= 40 ? 'MEDIUM' : 'LOW';

        return {
            riskScore,
            riskLevel,
            recommendations: [
                "Use GPS-tracked vehicle",
                "Avoid nighttime transport",
                "Stick to main highways"
            ]
        };
    }
}