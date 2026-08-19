// Route handler for POST 

import { NextRequest, NextResponse } from 'next/server';
import { createEntry } from "../../../lib/db";
import { auth } from '@/lib/auth';


export async function POST(request: NextRequest) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
        return NextResponse.json({ error: "Not Logged In" }, { status: 401 });
    }

    let body;
    try {
        body = await request.json();
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    if (!body.content || body.content.trim() === "") {
        return NextResponse.json({ error: "Content required" }, { status: 400 });
    }
    try {
        // Creates entry with parsed body
        await createEntry(body.content);
        return NextResponse.json({ received: body.content }, { status: 201 });
    }
    catch (error) {
        // Handles cases where table isn't found, file is unreachable, connection is dropped, etc.
        return NextResponse.json({ error: "Server Failure" }, { status: 500 });
    }
}
