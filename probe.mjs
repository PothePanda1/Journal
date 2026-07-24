import { createClient } from "@libsql/client";

const db = createClient({
	url: "file:local.db"
});

await db.batch([ "CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT,content TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP)",
	
	{sql: "INSERT INTO entries(content) VALUES (?)", args:["Okay"]}],
	"write",
);

const result = await db.execute("SELECT * FROM entries"); 
console.log(result.rows);
