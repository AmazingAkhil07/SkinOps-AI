/**
 * MEN'S SKIN PERFORMANCE DECISION ENGINE
 * PHASE 0 & 1: SPECIFICATION & CORE TYPES
 * 
 * Strict Clinical Decision Support (CDS) types.
 * Non-diagnostic.
 */

// --- 1. USER PROFILE (POST /user/profile) ---

export enum SkinType {
  OILY = 'OILY',
  DRY = 'DRY',
  COMBINATION = 'COMBINATION',
  SENSITIVE = 'SENSITIVE',
  NORMAL = 'NORMAL'
}

export enum SensitivityLevel {
  LOW = 'LOW', // "Tough skin"
  MODERATE = 'MODERATE',
  HIGH = 'HIGH', // Reacts frequently
  REACTIVE = 'REACTIVE' // Reacts to almost everything
}

export interface UserProfile {
  id: string;
  ageRange: '18-24' | '25-34' | '35-44' | '45-54' | '55+';
  skinType: SkinType;
  sensitivity: SensitivityLevel;
  primaryGoal: 'ACNE_CONTROL' | 'ANTI_AGING' | 'HYDRATION' | 'TEXTURE_REPAIR';
  hasDiagnosedConditions: boolean; // If true, trigger medical disclaimer
  currentMedications: string[]; // List of active meds (e.g., Isotretinoin)
}

// --- 2. ASSESSMENT & SCORING (POST /assessment/score) ---

export enum SeverityScore {
  CLEAR = 0,
  MILD = 1,
  MODERATE = 2,
  SEVERE = 3, // Trigger escalation
  CRITICAL = 4 // Immediate medical referral
}

export interface AssessmentScore {
  assessmentId: string;
  userId: string;
  timestamp: string;
  score: {
    oilControl: number; // 0-100
    barrierHealth: number; // 0-100
    textureIndex: number; // 0-100
  };
  severity: SeverityScore;
  flags: string[]; // E.g., ["HIGH_IRRITATION_RISK"]
}

// --- 3. INGREDIENT CONFLICT ENGINE (POST /ingredient/check) ---

export enum InteractionType {
  SAFE = 'SAFE',
  CAUTION = 'CAUTION', // Warning required
  CONFLICT = 'CONFLICT', // Do not mix
  DANGER = 'DANGER' // Immediate safety stop
}

export interface IngredientConflictRule {
  id: string;
  ingredientA: string;
  ingredientB: string;
  interaction: InteractionType;
  reason: string; // Clinical explanation
  remedy: string; // "Use on alternate nights", "Stop immediately"
}

// --- 4. SAFETY & ESCALATION (GET /hcp/escalation/{id}) ---

export enum EscalationLevel {
  NONE = 'NONE',
  ROUTINE_ADJUSTMENT = 'ROUTINE_ADJUSTMENT', // Self-correction
  DERMATOLOGIST_REVIEW = 'DERMATOLOGIST_REVIEW', // Non-urgent
  URGENT_CARE = 'URGENT_CARE' // Immediate attention
}

export interface SafetyTrigger {
  id: string;
  symptom: string;
  threshold: string; // e.g. "Pain > 5/10"
  escalation: EscalationLevel;
  cdsMessage: string; // The message displayed to user
}

// --- 5. EXPLAINABILITY (GET /assessment/explain/{id}) ---

export interface DecisionLog {
  ruleId: string;
  triggeredBy: string; // Data point that triggered rule
  outcome: string; // Resulting decision
  confidence: 'DETERMINISTIC' | 'INFERRED'; // CDS distinction
  timestamp: string;
}

// --- 6. ROUTINE GENERATION (Phase 1) ---

export interface RoutineStep {
  stepNumber: number;
  timeOfDay: 'MORNING' | 'EVENING' | 'ANY';
  category: 'CLEANSE' | 'TREAT' | 'HYDRATE' | 'PROTECT' | 'RECOVER';
  suggestedActive?: string;
  instruction: string;
  caution?: string;
}

export interface Routine {
  id: string;
  userId: string;
  generatedAt: string;
  type: 'MAINTENANCE' | 'CORRECTION' | 'RECOVERY';
  steps: RoutineStep[];
  safetyProtocol: string[]; // List of specific warnings for this routine
}

// --- 7. API RESPONSES ---

export interface ApiResponse<T> {
  data: T | null;
  error: {
    code: string;
    message: string; // User friendly
    developerMessage?: string; // Debug info
  } | null;
  meta: {
    requestId: string;
    timestamp: string;
    disclaimer: string; // MANDATORY CDS DISCLAIMER
  };
}