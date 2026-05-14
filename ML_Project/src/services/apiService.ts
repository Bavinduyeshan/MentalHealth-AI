// src/services/apiService.ts
import { PredictionData, PredictionResult } from '../types';

const API_BASE = 'http://127.0.0.1:8000/api/v1';

export async function getMentalHealthPrediction(data: PredictionData): Promise<PredictionResult | null> {
  try {
    const response = await fetch(`${API_BASE}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Age: data.age,
        Gender: data.gender,
        Sleep_Hours: data.sleepHours,
        Study_Hours: data.studyHours,
        Screen_Time: data.screenTime,
        Exercise_Frequency: data.exercise,
        Diet_Quality: data.dietQuality,
        Social_Interaction: data.socialInteraction,
        Academic_Pressure: data.academicPressure,
        Financial_Stress: data.financialStress,
        Relationship_Status: data.relationshipStatus,
        Living_Situation: data.livingSituation,
        Therapy: data.therapy,
        Medication: data.medication,
        Substance_Use: data.substanceUse,
        GPA: data.gpa,
        Year_of_Study: data.yearOfStudy,
        Family_History: data.familyHistory,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const backendData = await response.json();

    // Map backend response to frontend expected format
    const result: PredictionResult = {
      mhScore: backendData.regression.MH_Score,
      sleepQualityScore: backendData.regression.Sleep_Quality_Score,
      productivityImpact: backendData.regression.Productivity_Impact,
      stressSeverity: backendData.regression.Stress_Severity,
      socialIsolationScore: backendData.regression.Social_Isolation_Score,

      depressionStatus: backendData.classification.Depression_Status,
      stressLevel: backendData.classification.Stress_Level,
      anxietyRisk: backendData.classification.Anxiety_Risk,
      mhCategory: backendData.classification.MH_Category,

      riskLevel: backendData.summary.risk_level,
      recommendations: backendData.recommendations,

      // Optional raw data for debugging
      rawClf: JSON.stringify(backendData.classification, null, 2),
      rawReg: JSON.stringify(backendData.regression, null, 2),
    };

    return result;
  } catch (error) {
    console.error('Prediction API Error:', error);
    return null;
  }
}