// This is the main page of the website

import { getEntries } from "../lib/db";
import NewEntryForm from "./NewEntryForm";
import EntryItem from "./EntryItem";

// Opts this route out of static rendering
// allows for updates to appear
export const dynamic = 'force-dynamic'

// Server Component: runs on the server, so it can query the database directly.
// async : awaits for the data before returning markup/making page
export default async function Home() {
  const entries = await getEntries();
  console.log(entries);
  console.log(entries[0].created_at)
  // One EntryItem per row. 'key' is indexing for list items.
  // 'entry' is the prop, what is taken by EntryItem. 
  // Result is an array of EntryItem elements.
  // These get rendered when called into <li>s
  // Why EntryItem?
  // EntryItem was implemented because we couldn't get a delete button here otherwise
  // The button lives in a client component, the page is a server component.
  // By default we want things to live on the server, unless we can't 
  const listItems = entries.map(ent => <EntryItem key={ent.id} entry={ent}/>);
  return (
  <div>
    <h1>Journal</h1>
    <NewEntryForm/>
    <ul>{listItems}</ul>
  </div>
  );
}

