import { createClient } from "@libsql/client";

//checks if URL exists in env file
if (!process.env.TURSO_DATABASE_URL) {
    throw new Error("TURSO_DATABASE_URL is not set");
}

export const db = createClient({
	url: process.env.TURSO_DATABASE_URL,
	authToken: process.env.TURSO_AUTH_TOKEN
});

interface Entry{id: number; content: string; created_at: string}

export async function getEntries() {
	const result = await db.execute("SELECT * FROM entries");
	const entries = result.rows as unknown as Entry[];
	return entries
}

export async function createEntry(content: string) {
	// don't have to use batch here, because we already created the table
	await db.execute({sql: "INSERT INTO entries(content) VALUES (?)", args:[content]});
}

