import { 
  UserProfile, 
  AssessmentScore, 
  SeverityScore, 
  SkinType, 
  SensitivityLevel,
  IngredientConflictRule,
  InteractionType,
  Routine,
  RoutineStep,
  SafetyTrigger,
  EscalationLevel,
  DecisionLog
} from '../types';
import { INGREDIENT_CONFLICTS, SAFETY_TRIGGERS, SYSTEM_DEFAULTS } from '../constants/rules';

/**
 * PHASE 1: CORE DECISION ENGINE
 * 
 * Implements the logic for scoring, safety checks, and routine generation.
 * Pure functions where possible.
 */

// --- UTILS ---
const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

// --- SCORING ENGINE ---

export function calculateAssessmentScore(
  profile: UserProfile, 
  answers: Record<string, any> // Placeholder for questionnaire answers
): AssessmentScore {
  
  let oilControl = 50;
  let barrierHealth = 50;
  let textureIndex = 50;
  let severity = SeverityScore.CLEAR;
  const flags: string[] = [];

  // 1. Basic Skin Type Logic
  if (profile.skinType === SkinType.OILY) {
    oilControl = 20; // Needs help
    flags.push("OILY_COMPLEXION");
  } else if (profile.skinType === SkinType.DRY) {
    barrierHealth = 30; // Vulnerable
    flags.push("BARRIER_VULNERABILITY");
  }

  // 2. Sensitivity Logic
  if (profile.sensitivity === SensitivityLevel.HIGH || profile.sensitivity === SensitivityLevel.REACTIVE) {
    barrierHealth -= 20;
    flags.push("HIGH_SENSITIVITY");
  }

  // 3. Goal Alignment Logic (Mocking questionnaire impact)
  if (profile.primaryGoal === 'ACNE_CONTROL') {
    textureIndex -= 10;
    // Mock severity based on goal implies issue exists
    severity = SeverityScore.MILD;
  }

  // 4. Meds Check
  if (profile.currentMedications.includes('Isotretinoin')) {
    flags.push("MEDICATION_CONFLICT_RISK");
    barrierHealth = 10; // Compromised by meds
    severity = SeverityScore.SEVERE; // Medical supervision scenario
  }

  return {
    assessmentId: generateId('ASM'),
    userId: profile.id,
    timestamp: new Date().toISOString(),
    score: {
      oilControl,
      barrierHealth,
      textureIndex
    },
    severity,
    flags
  };
}

// --- COMPATIBILITY ENGINE ---

export function checkIngredientCompatibility(ingredients: string[]): {
  conflicts: IngredientConflictRule[];
  safetyAlerts: string[];
} {
  const foundConflicts: IngredientConflictRule[] = [];
  const safetyAlerts: string[] = [];

  // Pairwise check
  for (let i = 0; i < ingredients.length; i++) {
    for (let j = i + 1; j < ingredients.length; j++) {
      const a = ingredients[i];
      const b = ingredients[j];

      // Simple string matching against rules (In production, use normalized IDs)
      const rule = INGREDIENT_CONFLICTS.find(r => 
        (r.ingredientA.includes(a) && r.ingredientB.includes(b)) ||
        (r.ingredientA.includes(b) && r.ingredientB.includes(a))
      );

      if (rule) {
        foundConflicts.push(rule);
        if (rule.interaction === InteractionType.DANGER) {
          safetyAlerts.push(`CRITICAL SAFETY STOP: ${a} + ${b}`);
        }
      }
    }
  }

  return { conflicts: foundConflicts, safetyAlerts };
}

// --- ROUTINE GENERATOR ---

export function generateRoutine(profile: UserProfile, assessment: AssessmentScore): Routine {
  
  const isRecoveryMode = 
    assessment.severity === SeverityScore.SEVERE || 
    assessment.severity === SeverityScore.CRITICAL ||
    profile.sensitivity === SensitivityLevel.REACTIVE;

  const routineType = isRecoveryMode ? 'RECOVERY' : 'CORRECTION';
  const steps: RoutineStep[] = [];
  const safetyProtocol: string[] = [];

  // BASE STEPS
  steps.push({
    stepNumber: 1,
    timeOfDay: 'MORNING',
    category: 'CLEANSE',
    instruction: "Gentle cleanse. Do not strip oils.",
    suggestedActive: "Glycerin/Ceramides"
  });

  steps.push({
    stepNumber: 1,
    timeOfDay: 'EVENING',
    category: 'CLEANSE',
    instruction: "Thorough cleanse to remove debris.",
    suggestedActive: profile.skinType === SkinType.OILY ? "Salicylic Acid (Low %)" : "Cream Cleanser"
  });

  // TREATMENT STEPS (Skipped if Recovery Mode)
  if (!isRecoveryMode) {
    if (profile.primaryGoal === 'ACNE_CONTROL') {
      steps.push({
        stepNumber: 2,
        timeOfDay: 'EVENING',
        category: 'TREAT',
        instruction: "Targeted application for blemishes.",
        suggestedActive: "Benzoyl Peroxide or Adapalene",
        caution: "Start 2x/week. Watch for dryness."
      });
    } else if (profile.primaryGoal === 'ANTI_AGING') {
      steps.push({
        stepNumber: 2,
        timeOfDay: 'EVENING',
        category: 'TREAT',
        instruction: "Cellular turnover acceleration.",
        suggestedActive: "Retinol 0.3%",
        caution: "Must wear SPF daily. Do not mix with acids."
      });
    }
  } else {
    safetyProtocol.push("ACTIVE INGREDIENTS SUSPENDED due to high sensitivity/risk.");
  }

  // HYDRATION & PROTECT (Always needed)
  steps.push({
    stepNumber: isRecoveryMode ? 2 : 3,
    timeOfDay: 'MORNING',
    category: 'PROTECT',
    instruction: "UV Protection is non-negotiable.",
    suggestedActive: "SPF 30+ Broad Spectrum"
  });

  steps.push({
    stepNumber: isRecoveryMode ? 2 : 3,
    timeOfDay: 'EVENING',
    category: 'HYDRATE',
    instruction: "Barrier repair and sealing.",
    suggestedActive: "Niacinamide + Hyaluronic Acid"
  });

  return {
    id: generateId('RTN'),
    userId: profile.id,
    generatedAt: new Date().toISOString(),
    type: routineType,
    steps,
    safetyProtocol
  };
}

// --- SAFETY GUARDRAIL ENGINE ---

export function analyzeSafetyTriggers(symptoms: string[]): {
  triggered: SafetyTrigger[];
  escalationRequired: boolean;
} {
  const triggered: SafetyTrigger[] = [];
  let escalationRequired = false;

  symptoms.forEach(sym => {
    // Fuzzy match for prototype
    const match = SAFETY_TRIGGERS.find(t => sym.toLowerCase().includes(t.symptom.toLowerCase()));
    if (match) {
      triggered.push(match);
      if (match.escalation !== EscalationLevel.NONE && match.escalation !== EscalationLevel.ROUTINE_ADJUSTMENT) {
        escalationRequired = true;
      }
    }
  });

  return { triggered, escalationRequired };
}

// --- AUDIT LOGGER ---
// Simple in-memory log for prototype
export const AUDIT_LOG: DecisionLog[] = [];

export function logDecision(ruleId: string, triggeredBy: string, outcome: string) {
  AUDIT_LOG.push({
    ruleId,
    triggeredBy,
    outcome,
    confidence: 'DETERMINISTIC',
    timestamp: new Date().toISOString()
  });
}