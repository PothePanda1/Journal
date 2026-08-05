"use client"
import { deleteEntry, Entry } from "@/lib/db";
import { useRouter } from "next/navigation";

export default function EntryItem({entry}: {entry:Entry}){
    // router lets us re-fetch the server component after a change
    const router = useRouter();

    async function deleteEntry(){
        // basically the cURL command
        // Backticks: ${} only interpolates inside a template literal.
        // The id goes in the URL, so no headers or body needed.
        const response = await fetch(`/api/entries/${entry.id}`, {method:"DELETE"});
        
        // fetch only rejects on network failure - 400 or 500
        if (response.ok){
            // Re-runs the server components so the list updates in place
            router.refresh();
        }
    }
    return (
        <li>
            {entry.content} 
            <button onClick={deleteEntry}>Delete</button>
        </li>
    );
}

