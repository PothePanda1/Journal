import { getEntries } from "../lib/db";
import NewEntryForm from "./NewEntryForm";
export const dynamic = 'force-dynamic'

export default async function Home() {
  const entries = await getEntries();
  console.log(entries);
  const listItems = entries.map(entry => <li key={entry.id}>{entry.content} </li>);
  return (
  <div>
    <h1>Journal</h1>
    <NewEntryForm/>
    <ul>{listItems}</ul>
  </div>
  );
}

