import { NextRequest, NextResponse } from "next/server"
import fs from "node:fs/promises"
import path from "node:path"

export async function POST(req: NextRequest) {
    if (process.env.NODE_ENV !== "development") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const config = await req.json()
        const configPath = path.join(process.cwd(), "scripts", "dev_config.json")
        
        await fs.writeFile(configPath, JSON.stringify(config, null, 2))
        
        return NextResponse.json({ success: true })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
