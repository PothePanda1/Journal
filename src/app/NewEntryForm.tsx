"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewEntryForm(){
    const[text,setText] = useState('');
    const router = useRouter();
    
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>){
        setText(e.target.value);
    }
    async function submitEntry(){
        const response = await fetch("/api/entries", {method:"POST",headers: {"Content-Type":"application/json"}, body: JSON.stringify({content:text})});
        if (response.ok){
            setText("");
            router.refresh();
        }
    }
    return ( 
        <>
        <textarea value={text} onChange={handleChange}/>
        <button onClick={submitEntry}>
        Submit
        </button>
        </>
    );
}