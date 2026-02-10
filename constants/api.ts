/**
 * PHASE 0: API SPECIFICATION
 * 
 * Strict definition of allowed endpoints.
 * No inventing new routes.
 */

export const API_BASE_URL = "/api/v1";

export const ENDPOINTS = {
  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`, // POST
  },
  ASSESSMENT: {
    SCORE: `${API_BASE_URL}/assessment/score`, // POST
    EXPLAIN: (id: string) => `${API_BASE_URL}/assessment/explain/${id}`, // GET
  },
  ROUTINE: {
    GENERATE: `${API_BASE_URL}/routine/generate`, // POST
  },
  INGREDIENT: {
    CHECK: `${API_BASE_URL}/ingredient/check`, // POST
  },
  SAFETY: {
    RECOVERY: `${API_BASE_URL}/safety/recovery`, // POST
  },
  HCP: {
    ESCALATION: (id: string) => `${API_BASE_URL}/hcp/escalation/${id}`, // GET
  },
  PROGRESS: {
    TRACK: `${API_BASE_URL}/progress/track`, // POST
  }
} as const;

export const MOCK_DELAY_MS = 800; // Simulate network latency for cinematic loaders