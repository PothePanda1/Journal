import { createClient } from "@libsql/client";

if (process.env.NODE_ENV === "production" && !process.env.TURSO_DATABASE_URL) {
	throw new Error("TURSO_DATABASE_URL must be set in production");
}

const url = process.env.TURSO_DATABASE_URL || "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

export const db = createClient({ url, authToken });

export interface Entry{id: number; content: string; created_at: string}

export async function getEntries() {
	const result = await db.execute("SELECT * FROM entries");
	const entries = result.rows as unknown as Entry[];
	return entries
}

export async function createEntry(content: string) {
	// don't have to use batch here, because we already created the table
	await db.execute({sql: "INSERT INTO entries(content) VALUES (?)", args:[content]});
}

export async function deleteEntry(id: number) {
	await db.execute({sql: "DELETE FROM entries WHERE id = ?", args:[id]});
}
