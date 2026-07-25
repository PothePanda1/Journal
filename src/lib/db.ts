import { createClient } from "@libsql/client";

export const db = createClient({
	url: "file:local.db"
});

interface Entry{id: number; content: string; created_at: string}

export async function getEntries() {
	const result = await db.execute("SELECT * FROM entries");
	const entries = result.rows as unknown as Entry[];
	return entries
}