import React, { useState } from 'react';
import { MockApi } from './services/api';
import { TerminalOutput } from './components/TerminalOutput';
import { SkinType, SensitivityLevel, UserProfile } from './types';

// Mock Data for Testing
const TEST_PROFILE: UserProfile = {
  id: "TEST_USER_01",
  ageRange: "25-34",
  skinType: SkinType.OILY,
  sensitivity: SensitivityLevel.MODERATE,
  primaryGoal: "ACNE_CONTROL",
  hasDiagnosedConditions: false,
  currentMedications: []
};

const TEST_DANGEROUS_PROFILE: UserProfile = {
  ...TEST_PROFILE,
  id: "TEST_USER_RISK",
  sensitivity: SensitivityLevel.REACTIVE,
  currentMedications: ["Isotretinoin"] // Should trigger high risk
};

const TEST_INGREDIENTS_CONFLICT = ["Retinol", "Benzoyl Peroxide", "Ceramides"];

const App: React.FC = () => {
  const [consoleLogs, setConsoleLogs] = useState<Array<{type: string, data: any}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const logToConsole = (label: string, data: any) => {
    setConsoleLogs(prev => [{ type: label, data }, ...prev]);
  };

  const clearConsole = () => setConsoleLogs([]);

  // --- TEST HANDLERS ---

  const runFullAssessmentChain = async () => {
    setIsLoading(true);
    clearConsole();
    try {
      // 1. Create Profile
      const profileRes = await MockApi.postUserProfile(TEST_PROFILE);
      logToConsole("1. POST /user/profile", profileRes);

      if (profileRes.data) {
        // 2. Score Assessment
        const scoreRes = await MockApi.postAssessmentScore({ 
          profile: profileRes.data, 
          answers: {} 
        });
        logToConsole("2. POST /assessment/score", scoreRes);

        if (scoreRes.data) {
          // 3. Generate Routine
          const routineRes = await MockApi.postRoutineGenerate({
            profile: profileRes.data,
            score: scoreRes.data
          });
          logToConsole("3. POST /routine/generate", routineRes);
        }
      }
    } catch (e) {
      logToConsole("ERROR", e);
    } finally {
      setIsLoading(false);
    }
  };

  const runRecoveryScenario = async () => {
    setIsLoading(true);
    try {
      // 1. Check Med Conflict Risk Profile
      const profileRes = await MockApi.postUserProfile(TEST_DANGEROUS_PROFILE);
      logToConsole("SCENARIO: HIGH RISK USER", profileRes.data);

      if (profileRes.data) {
        const scoreRes = await MockApi.postAssessmentScore({ 
          profile: profileRes.data, 
          answers: {} 
        });
        logToConsole("ASSESSMENT: SEVERITY CHECK", scoreRes.data?.severity);

        const routineRes = await MockApi.postRoutineGenerate({
          profile: profileRes.data,
          score: scoreRes.data!
        });
        logToConsole("ROUTINE: SAFETY OVERRIDE CHECK", routineRes.data?.type);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkConflicts = async () => {
    setIsLoading(true);
    const res = await MockApi.postIngredientCheck({ ingredients: TEST_INGREDIENTS_CONFLICT });
    logToConsole("POST /ingredient/check (CONFLICT)", res);
    setIsLoading(false);
  };

  const checkSafetyTriggers = async () => {
    setIsLoading(true);
    const res = await MockApi.postSafetyRecovery({ symptoms: ["Severe Pain", "Bleeding"] });
    logToConsole("POST /safety/recovery (ESCALATION)", res);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-mono">
      <header className="mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-xl font-bold text-white mb-2">
          MEN’S SKIN PERFORMANCE // ENGINE CORE (PHASE 1)
        </h1>
        <div className="text-xs text-slate-500">
          CLINICAL DECISION SUPPORT LOGIC TEST CONSOLE
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CONTROL PANEL */}
        <div className="space-y-4">
          <div className="p-4 border border-slate-800 bg-slate-900 rounded">
            <h2 className="text-sm font-bold text-sky-500 mb-4 border-b border-slate-800 pb-2">
              TEST PROTOCOLS
            </h2>
            
            <div className="space-y-2">
              <button 
                onClick={runFullAssessmentChain}
                disabled={isLoading}
                className="w-full text-left px-3 py-2 text-xs bg-slate-800 hover:bg-sky-900 hover:text-sky-200 transition-colors border-l-2 border-transparent hover:border-sky-500 disabled:opacity-50"
              >
                [SEQUENCE A] STANDARD FLOW
              </button>

              <button 
                onClick={runRecoveryScenario}
                disabled={isLoading}
                className="w-full text-left px-3 py-2 text-xs bg-slate-800 hover:bg-red-900 hover:text-red-200 transition-colors border-l-2 border-transparent hover:border-red-500 disabled:opacity-50"
              >
                [SEQUENCE B] SAFETY LOCKOUT
              </button>

              <button 
                onClick={checkConflicts}
                disabled={isLoading}
                className="w-full text-left px-3 py-2 text-xs bg-slate-800 hover:bg-amber-900 hover:text-amber-200 transition-colors border-l-2 border-transparent hover:border-amber-500 disabled:opacity-50"
              >
                [MODULE] CONFLICT CHECK
              </button>

              <button 
                onClick={checkSafetyTriggers}
                disabled={isLoading}
                className="w-full text-left px-3 py-2 text-xs bg-slate-800 hover:bg-rose-900 hover:text-rose-200 transition-colors border-l-2 border-transparent hover:border-rose-500 disabled:opacity-50"
              >
                [MODULE] SYMPTOM ANALYSIS
              </button>
            </div>

            <button 
              onClick={clearConsole}
              className="mt-4 w-full py-1 text-[10px] text-slate-500 hover:text-slate-300 border border-slate-700"
            >
              CLEAR LOGS
            </button>
          </div>
        </div>

        {/* TERMINAL OUTPUT */}
        <div className="lg:col-span-2">
          <div className="border border-slate-800 bg-black p-4 min-h-[600px] font-mono text-sm overflow-y-auto">
            <div className="text-slate-600 text-xs mb-4 border-b border-slate-900 pb-2 flex justify-between">
               <span>SYSTEM OUTPUT LOG</span>
               <span className={isLoading ? "text-amber-500" : "text-emerald-500"}>
                 {isLoading ? "PROCESSING..." : "IDLE"}
               </span>
            </div>
            
            {consoleLogs.length === 0 && (
              <div className="text-slate-700 text-center mt-20">
                AWAITING INPUT...
              </div>
            )}

            {consoleLogs.map((log, idx) => (
              <TerminalOutput key={idx} label={log.type} data={log.data} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;