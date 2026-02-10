import { IngredientConflictRule, InteractionType, SafetyTrigger, EscalationLevel } from '../types';

/**
 * PHASE 0: RULE ENGINE LOCK
 * 
 * Medical Logic: Clinical Decision Support (Non-Diagnostic)
 * Authority: Standard Dermatological Guidelines (Placeholder)
 */

export const CDS_DISCLAIMER_TEXT = "SYSTEM NOTICE: This tool provides decision support based on programmed rules. It does not diagnose medical conditions. Consult a board-certified dermatologist for medical advice.";

// --- CONFLICT MATRIX ---
// Defines pairwise interactions between active ingredients.
export const INGREDIENT_CONFLICTS: IngredientConflictRule[] = [
  {
    id: "RULE-001",
    ingredientA: "Retinol/Retinoid",
    ingredientB: "Benzoyl Peroxide",
    interaction: InteractionType.CONFLICT,
    reason: "Benzoyl Peroxide can oxidize Retinol, rendering it ineffective. Increased risk of irritation.",
    remedy: "Apply Benzoyl Peroxide in morning, Retinoid in evening."
  },
  {
    id: "RULE-002",
    ingredientA: "Retinol/Retinoid",
    ingredientB: "AHA/BHA (Exfoliating Acids)",
    interaction: InteractionType.CAUTION,
    reason: "Combined use significantly increases risk of barrier compromise and irritation.",
    remedy: "Alternate nights. Do not layer simultaneously."
  },
  {
    id: "RULE-003",
    ingredientA: "Vitamin C (L-Ascorbic Acid)",
    ingredientB: "Retinol/Retinoid",
    interaction: InteractionType.CAUTION,
    reason: "pH mismatch and irritation potential when layered.",
    remedy: "Apply Vitamin C in morning, Retinoid in evening."
  },
  {
    id: "RULE-004",
    ingredientA: "Salicylic Acid",
    ingredientB: "Glycolic Acid",
    interaction: InteractionType.CAUTION,
    reason: "Double exfoliation risk. Can lead to over-stripping of lipid barrier.",
    remedy: "Use one or the other, or alternate days."
  },
  {
    id: "RULE-005",
    ingredientA: "Isotretinoin (Oral)",
    ingredientB: "Topical Actives (Any)",
    interaction: InteractionType.DANGER,
    reason: "Oral Isotretinoin significantly thins skin. Topicals can cause severe chemical burns.",
    remedy: "STOP all topical actives. Focus solely on hydration/barrier repair."
  }
];

// --- SAFETY TRIGGERS ---
// Defines symptoms that trigger escalation flows.
export const SAFETY_TRIGGERS: SafetyTrigger[] = [
  {
    id: "SAFE-001",
    symptom: "Bleeding",
    threshold: "Any occurrence",
    escalation: EscalationLevel.URGENT_CARE,
    cdsMessage: "Stop all products. Bleeding indicates barrier breach or infection risk. Consult physician."
  },
  {
    id: "SAFE-002",
    symptom: "Severe Pain",
    threshold: "Pain Score > 6/10",
    escalation: EscalationLevel.URGENT_CARE,
    cdsMessage: "Skin care should not cause severe pain. Possible chemical burn or allergic reaction."
  },
  {
    id: "SAFE-003",
    symptom: "Hives / Swelling",
    threshold: "Any occurrence",
    escalation: EscalationLevel.URGENT_CARE,
    cdsMessage: "Signs of allergic reaction. Discontinue use immediately. Seek medical attention if breathing affected."
  },
  {
    id: "SAFE-004",
    symptom: "Persistent Redness",
    threshold: "> 24 hours",
    escalation: EscalationLevel.DERMATOLOGIST_REVIEW,
    cdsMessage: "Persistent erythema suggests inflammation or rosacea trigger. Reduce active ingredients."
  },
  {
    id: "SAFE-005",
    symptom: "Dryness / Flaking",
    threshold: "Moderate",
    escalation: EscalationLevel.ROUTINE_ADJUSTMENT,
    cdsMessage: "Barrier compromised. Pause actives. Increase hydration."
  }
];

// --- PROTOCOL DEFAULTS ---
export const SYSTEM_DEFAULTS = {
  maxActivesPerRoutine: 2,
  minRecoveryDays: 1,
  defaultSensitivity: 'MODERATE'
};