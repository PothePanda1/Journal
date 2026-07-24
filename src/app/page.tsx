import { db } from "../lib/db";

export default async function Home() {
  const result = await db.execute("SELECT * FROM entries");
  console.log(result.rows);
  return (
    <h1>Journal</h1>
  );
}