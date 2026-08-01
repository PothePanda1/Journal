"use client"
import { useState } from 'react';

export default function NewEntryForm(){
    const[text,setText] = useState('');
    
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>){
        setText(e.target.value);
    }
    async function submitEntry(){
        await fetch("/api/entries", {method:"POST",headers: {"Content-Type":"application/json"}, body: JSON.stringify({content:text})})
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