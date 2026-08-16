import { getDB } from "./db";
import { getSystemConfig } from "./server-helpers.server";

export async function performTopNSelection(adminId: string = "system") {
  const db = await getDB();
  const studentsColl = db.collection<any>("students");
  const config = await getSystemConfig();
  const shortlistSize = config.shortlistSize || 120;

  // Get all valid students (excluding disqualified/eliminated if they exist, or just get all active)
  const candidates = await studentsColl.find({ 
    status: { $nin: ["Disqualified", "Eliminated"] } 
  }).toArray();

  // Sort deterministically:
  // 1. Total Score (DESC)
  // 2. Prompt Score (DESC)
  // 3. MCQ Score (DESC)
  // 4. Completion Time (ASC)
  candidates.sort((a, b) => {
    const scoreDiff = (b.totalScore || 0) - (a.totalScore || 0);
    if (scoreDiff !== 0) return scoreDiff;
    
    const promptDiff = (b.promptScore || 0) - (a.promptScore || 0);
    if (promptDiff !== 0) return promptDiff;

    const mcqDiff = (b.mcqScore || 0) - (a.mcqScore || 0);
    if (mcqDiff !== 0) return mcqDiff;

    const timeA = new Date(a.finalSubmissionTime || 0).getTime();
    const timeB = new Date(b.finalSubmissionTime || 0).getTime();
    return timeA - timeB;
  });

  const version = new Date().toISOString().replace(/[:.]/g, "-");
  const snapshotCandidates: any[] = [];
  let selectedCount = 0;

  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i];
    const rank = i + 1;
    const isSelected = rank <= shortlistSize;
    
    const selectionStatus = isSelected ? "SELECTED" : "NOT_SELECTED";
    const ticketId = isSelected ? `NXP-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}` : "";

    await studentsColl.updateOne(
      { email: candidate.email },
      { 
        $set: { 
          rank, 
          selectionStatus, 
          ticketId,
          selectionVersion: version,
          emailStatus: isSelected ? "PENDING" : undefined
        } 
      }
    );

    if (isSelected) selectedCount++;

    snapshotCandidates.push({
      email: candidate.email,
      rank,
      score: candidate.totalScore || 0,
      percentage: candidate.finalPercentage || 0,
      department: candidate.department || "Unknown",
      selectionStatus,
      ticketId
    });
  }

  const snapshot = {
    id: version,
    timestamp: new Date().toISOString(),
    adminId,
    selectedCount,
    candidates: snapshotCandidates
  };

  await db.collection("selectionSnapshots").insertOne(snapshot);
  await db.collection("securityLogs").insertOne({
    id: Math.random().toString(36).substring(7),
    timestamp: new Date().toISOString(),
    email: "system",
    action: "TOP_125_SELECTION_FINALIZED",
    status: "success",
    details: `Admin finalized selection version ${version}. Selected: ${selectedCount}`
  });

  return { success: true as const, version, selectedCount };
}
