// SQL functions live here

import { createClient } from "@libsql/client";

if (process.env.NODE_ENV === "production" && !process.env.TURSO_DATABASE_URL) {
	throw new Error("TURSO_DATABASE_URL must be set in production");
}

export const url = process.env.TURSO_DATABASE_URL || "file:local.db";
export const authToken = process.env.TURSO_AUTH_TOKEN;

export const db = createClient({ url, authToken });

export interface Entry{id: number; content: string; created_at: string}

export async function getEntries(userId: string) {
	const result = await db.execute({sql:"SELECT * FROM entries WHERE userId = ?", args:[userId]});
	return result.rows.map(row => ({
	id: Number(row.id),
	content: String(row.content),
	created_at: String(row.created_at),
	userId: String(row.userId) // auth uses this way camelcase
	}))
}

export async function createEntry(content: string, userId: string) {
	// don't have to use batch here, because we already created the table
	await db.execute({sql: "INSERT INTO entries(content, userId) VALUES (?, ?)", args:[content, userId]});
}

export async function deleteEntry(id: number, userId: string) {
	return await db.execute({sql: "DELETE FROM entries WHERE id = ? AND userId = ?", args:[id,userId]});
}

export async function updateEntry(content: string, id: number, userId: string){
	return await db.execute({sql:"UPDATE entries SET content = ? WHERE id = ? AND userId = ?", args:[content,id, userId]});
}
