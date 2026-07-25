import { getEntries } from "../lib/db";

export default async function Home() {
  const entries = await getEntries();
  console.log(entries);
  const listItems = entries.map(entry => <li key={entry.id}>{entry.content} </li>);
  return (
  <div>
    <h1>Journal</h1>
    <ul>{listItems}</ul>
  </div>
  );
}

