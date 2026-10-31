export type Complexity = "Low" | "Medium" | "High"

export type AmbiguityFlag = {
  phrase: string
  reason: string
  question: string
}

export type RequirementAnalysis = {
  id: string
  text: string
  complexity: Complexity
  ambiguityFlags: AmbiguityFlag[]
}

export type AnalysisReport = {
  id: string
  projectName: string
  requirementsText: string
  createdAt: string
  requirements: RequirementAnalysis[]
  summary: {
    total: number
    ambiguous: number
    distribution: Record<Complexity, number>
    reviewPriority: "Low" | "Moderate" | "High"
  }
}

const ambiguityRules = [
  {
    phrases: ["modern"],
    reason: "The desired visual style and design criteria are not defined.",
    question:
      "What examples or visual references represent the modern style you expect?",
  },
  {
    phrases: ["scalable", "scale"],
    reason:
      "Expected traffic, growth, and infrastructure constraints are not specified.",
    question:
      "How many users or requests should the system support now and in the next year?",
  },
  {
    phrases: ["simple", "easy", "user-friendly", "intuitive"],
    reason:
      "The intended users and measurable usability expectations are unclear.",
    question:
      "Who are the primary users, and which tasks should feel especially easy for them?",
  },
  {
    phrases: ["fast", "high-performance"],
    reason:
      "No response-time, load-time, or performance target has been provided.",
    question:
      "What response-time or page-load target should the application meet?",
  },
  {
    phrases: ["secure", "security"],
    reason:
      "The required authentication, authorization, and security standards are unspecified.",
    question:
      "Which login methods, user roles, and security requirements must be supported?",
  },
  {
    phrases: ["fully automated", "automated", "automatic"],
    reason:
      "The trigger, decision rules, exceptions, and human review steps are not defined.",
    question:
      "Which exact steps should be automated, and when should a person review or override them?",
  },
  {
    phrases: ["flexible", "customizable"],
    reason:
      "It is unclear what users should be able to change and within which limits.",
    question:
      "Which parts must users be able to configure, and what restrictions should apply?",
  },
  {
    phrases: ["complete", "all-in-one"],
    reason:
      "The feature boundary is open-ended and may include unstated functionality.",
    question: "Which specific capabilities are required for the first release?",
  },
]

const highComplexitySignals = [
  "multi-vendor",
  "marketplace",
  "real-time",
  "payment processing",
  "machine learning",
  "recommendation engine",
  "video streaming",
  "multiple roles",
  "role-based",
  "subscription",
  "inventory",
]

const mediumComplexitySignals = [
  "authentication",
  "login",
  "registration",
  "dashboard",
  "api",
  "database",
  "payment",
  "email verification",
  "upload",
  "search",
  "filter",
  "notification",
  "admin",
]

export function parseRequirements(text: string): string[] {
  return text
    .replace(/\r/g, "")
    .split(/\n+|(?<=[.!?])\s+(?=[A-Z])/)
    .map((line) => line.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, "").trim())
    .filter((line) => line.length > 2)
}

function findAmbiguities(text: string): AmbiguityFlag[] {
  const normalized = text.toLowerCase()

  return ambiguityRules.flatMap((rule) => {
    const phrase = rule.phrases.find((candidate) =>
      normalized.includes(candidate),
    )
    return phrase
      ? [{ phrase, reason: rule.reason, question: rule.question }]
      : []
  })
}

function estimateDemoComplexity(text: string): Complexity {
  const normalized = text.toLowerCase()
  const highSignals = highComplexitySignals.filter((signal) =>
    normalized.includes(signal),
  ).length
  const mediumSignals = mediumComplexitySignals.filter((signal) =>
    normalized.includes(signal),
  ).length
  const conjunctions = (
    normalized.match(/\b(and|with|including|plus)\b/g) ?? []
  ).length

  if (highSignals >= 1 || mediumSignals >= 3 || conjunctions >= 4) return "High"
  if (mediumSignals >= 1 || conjunctions >= 2 || text.length > 110)
    return "Medium"
  return "Low"
}

export function analyzeRequirements(
  projectName: string,
  requirementsText: string,
): AnalysisReport {
  const statements = parseRequirements(requirementsText)
  const requirements = statements.map((text, index) => ({
    id: `requirement-${Date.now()}-${index}`,
    text,
    complexity: estimateDemoComplexity(text),
    ambiguityFlags: findAmbiguities(text),
  }))

  const distribution: Record<Complexity, number> = {
    Low: 0,
    Medium: 0,
    High: 0,
  }
  requirements.forEach((requirement) => {
    distribution[requirement.complexity] += 1
  })

  const ambiguous = requirements.filter(
    (requirement) => requirement.ambiguityFlags.length > 0,
  ).length
  const reviewPoints = distribution.High * 2 + distribution.Medium + ambiguous
  const reviewPriority =
    reviewPoints >= 6 ? "High" : reviewPoints >= 3 ? "Moderate" : "Low"

  return {
    id: `report-${Date.now()}`,
    projectName: projectName.trim(),
    requirementsText: requirementsText.trim(),
    createdAt: new Date().toISOString(),
    requirements,
    summary: {
      total: requirements.length,
      ambiguous,
      distribution,
      reviewPriority,
    },
  }
}
