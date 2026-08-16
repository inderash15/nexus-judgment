import { getDB } from "./src/lib/db.ts";

async function run() {
  try {
    const db = await getDB();
    const students = await db.collection("students").find().toArray();
    console.log("Found students:", students.length);
    students.forEach(s => console.log(s.email, s.status, s.totalScore));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
run();
