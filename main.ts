// Your AI Therapist's Diagnosis — make.fun one-line entry.
// Emits the diagnosis line to entry.txt in the harness output directory.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The diagnosis, kept as two clinical findings joined into one line.
const findingA = "You don't have commitment issues.";
const findingB =
  "You have 47 open tabs and every one of them is a decision you're avoiding.";

function buildDiagnosis(): string {
  return `${findingA} ${findingB}`;
}

// Mirror the sealed gate locally: 1–200 UTF-8 chars, not whitespace-only.
// Fail loudly here rather than shipping a line the scorer would zero out.
function assertInsideGate(line: string): void {
  const count = [...line].length;
  if (count < 1 || count > 200 || line.trim().length === 0) {
    throw new Error(`diagnosis outside gate: ${count} chars`);
  }
}

function main(): void {
  const line = buildDiagnosis();
  assertInsideGate(line);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the gate reads the file as-is.
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
}

main();
