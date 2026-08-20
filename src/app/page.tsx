// This is the main page of the website

import { getEntries } from "../lib/db";
import NewEntryForm from "./NewEntryForm";
import EntryItem from "./EntryItem";
import {headers} from "next/headers"; // needed to apply headers
import { redirect } from "next/navigation"; // needed to redirect users to signup page if not logged in
import { auth } from "@/lib/auth";
import SignOut from "./SignOut";

// Opts this route out of static rendering
// allows for updates to appear
export const dynamic = 'force-dynamic'

// Server Component: runs on the server, so it can query the database directly.
// async : awaits for the data before returning markup/making page
export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() }); 
  if (!session){
    redirect("/signup")
  }
  const entries = await getEntries(session.user.id);

  // One EntryItem per row. 'key' is indexing for list items.
  // 'entry' is the prop, what is taken by EntryItem. 
  // Result is an array of EntryItem elements.
  // These get rendered when called into <li>s
  // Why EntryItem?
  // EntryItem was implemented because we couldn't get a delete button here otherwise
  // The button lives in a client component, the page is a server component.
  // Basically interactive things are client, but if those things talk to the database they're server.
  // By default we want things to live on the server, unless we can't 
  const listItems = entries.map(ent => <EntryItem key={ent.id} entry={ent}/>);
  return (
  <div>
    <h1>Journal</h1>
    <NewEntryForm/>
    <ul>{listItems}</ul>
    <SignOut/>
  </div>
  );
}

