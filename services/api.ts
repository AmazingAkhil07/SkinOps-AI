import { 
  UserProfile, 
  AssessmentScore, 
  Routine, 
  IngredientConflictRule, 
  SafetyTrigger, 
  ApiResponse,
  DecisionLog 
} from '../types';
import { 
  calculateAssessmentScore, 
  checkIngredientCompatibility, 
  generateRoutine, 
  analyzeSafetyTriggers,
  logDecision,
  AUDIT_LOG
} from './engine';
import { CDS_DISCLAIMER_TEXT } from '../constants/rules';
import { MOCK_DELAY_MS } from '../constants/api';

/**
 * PHASE 1: MOCK API LAYER
 * 
 * Simulates network requests and standardizes responses.
 * Enforces CDS Disclaimer on every response.
 */

// Helper to wrap responses
function wrapResponse<T>(data: T | null, errorMsg?: string): ApiResponse<T> {
  return {
    data,
    error: errorMsg ? { code: 'ERR_GENERIC', message: errorMsg } : null,
    meta: {
      requestId: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      disclaimer: CDS_DISCLAIMER_TEXT // MANDATORY
    }
  };
}

// Helper to simulate delay
const delay = () => new Promise(resolve => setTimeout(resolve, MOCK_DELAY_MS));

// --- ENDPOINTS ---

export const MockApi = {
  
  // POST /user/profile
  // In a real app, this saves to DB. Here we just echo back with an ID.
  async postUserProfile(profileData: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    await delay();
    if (!profileData.skinType || !profileData.sensitivity) {
      return wrapResponse(null, "Missing required profile fields.");
    }
    const profile: UserProfile = {
      id: "USER-INIT-001",
      ageRange: profileData.ageRange || '25-34',
      skinType: profileData.skinType,
      sensitivity: profileData.sensitivity,
      primaryGoal: profileData.primaryGoal || 'HYDRATION',
      hasDiagnosedConditions: profileData.hasDiagnosedConditions || false,
      currentMedications: profileData.currentMedications || []
    };
    logDecision("API-001", "UserProfile", "Profile Created");
    return wrapResponse(profile);
  },

  // POST /assessment/score
  async postAssessmentScore(payload: { profile: UserProfile, answers: any }): Promise<ApiResponse<AssessmentScore>> {
    await delay();
    try {
      const score = calculateAssessmentScore(payload.profile, payload.answers);
      logDecision("API-002", JSON.stringify(payload.profile), `Severity: ${score.severity}`);
      return wrapResponse(score);
    } catch (e) {
      return wrapResponse(null, "Scoring failed.");
    }
  },

  // POST /routine/generate
  async postRoutineGenerate(payload: { profile: UserProfile, score: AssessmentScore }): Promise<ApiResponse<Routine>> {
    await delay();
    const routine = generateRoutine(payload.profile, payload.score);
    logDecision("API-003", `Score: ${payload.score.severity}`, `Routine Type: ${routine.type}`);
    return wrapResponse(routine);
  },

  // POST /ingredient/check
  async postIngredientCheck(payload: { ingredients: string[] }): Promise<ApiResponse<{ conflicts: IngredientConflictRule[], alerts: string[] }>> {
    await delay();
    const result = checkIngredientCompatibility(payload.ingredients);
    
    // Map engine result to API response contract
    const responseData = {
      conflicts: result.conflicts,
      alerts: result.safetyAlerts
    };

    if (result.conflicts.length > 0) {
      logDecision("API-004", payload.ingredients.join(", "), "Conflicts Found");
    }
    return wrapResponse(responseData);
  },

  // POST /safety/recovery
  async postSafetyRecovery(payload: { symptoms: string[] }): Promise<ApiResponse<{ triggers: SafetyTrigger[], escalation: boolean }>> {
    await delay();
    const result = analyzeSafetyTriggers(payload.symptoms);
    
    // Map engine result to API response contract
    const responseData = {
      triggers: result.triggered,
      escalation: result.escalationRequired
    };

    if (result.escalationRequired) {
      logDecision("API-005", payload.symptoms.join(", "), "Escalation Triggered");
    }
    return wrapResponse(responseData);
  },

  // GET /assessment/explain/{id} (Mock implementation returning latest logs)
  async getAuditLogs(): Promise<ApiResponse<DecisionLog[]>> {
    await delay();
    return wrapResponse(AUDIT_LOG);
  }
};