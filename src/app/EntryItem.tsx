"use client"
import { Entry } from "@/lib/db";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EntryItem({entry}: {entry:Entry}){
    // router lets us re-fetch the server component after a change
    const router = useRouter();

    // We remember what the current text is and if it's currently being edited
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(entry.content);

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

    async function editEntry(){
        // Here we combine DELETE's route and POST's headers (which help it extract the JSON text)
        const response = await fetch(`/api/entries/${entry.id}`, {method:"PATCH",
            headers: {"Content-Type":"application/json"}, body: JSON.stringify({content:draft})});
        // fetch only rejects on network failure - 400 or 500
        if (response.ok){
            // Editing is done now
            setIsEditing(false);
            // Re-runs the server components so the list updates in place
            router.refresh();
    }
    }

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>){
        setDraft(e.target.value);
    }

    if (!isEditing){
    return (
        <li>
            {entry.content} 
            <button onClick={()=>setIsEditing(true)}>Edit</button>
            <button onClick={deleteEntry}>Delete</button>
        </li>
    );
}
    return (
        <li>
            <textarea value={draft} onChange={handleChange}/>
            <button onClick={editEntry}>Save</button>
            <button onClick={()=>(setIsEditing(false),setDraft(entry.content))}>Cancel</button>
        </li>
    );
}

