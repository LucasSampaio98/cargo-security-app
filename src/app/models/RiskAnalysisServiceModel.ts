import { RiskLevel } from "./ApplicationModel";

export interface RiskAnalysisInput {
    origin: string;
    destination: string;
    cargoValue: number;
    cargoType: string;
    historicalData?: any;
}

export interface RiskAnalysisResult {
    riskScore: number;
    riskLevel: RiskLevel;
    recommendations: string[];
}