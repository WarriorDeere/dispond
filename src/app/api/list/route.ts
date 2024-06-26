import { NextRequest, NextResponse } from "next/server";

import * as fs from "node:fs";
import * as path from "node:path";

export async function GET(req: NextRequest) {

    const base_dir = req.nextUrl.searchParams.get('dir');
    const file_type = req.nextUrl.searchParams.get('type');

    if (!base_dir || !file_type) {
        return NextResponse.json(
            { message: `[Error] 400 Unexpected Parameter Value. Parameters: 'dir': '${base_dir}'; 'type': '${file_type}'` },
            { status: 400 }
        );
    }

    const bdir = path.resolve('./src-tauri/data');
    const dir = path.resolve(bdir, base_dir);

    if (!dir.startsWith(bdir)) {
        return NextResponse.json(
            { message: `[Error] 403 Access Denied` },
            { status: 403 }
        );
    }

    const buf: String[] = new Array();

    if (!fs.existsSync(dir)) {
        return NextResponse.json(
            { message: `[Error] 404 Path Not Found. Requested Path: ${dir}` },
            { status: 404 }
        );
    }

    fs.readdir(dir, { recursive: true, withFileTypes: true }, (e, files) => {
        if (e) {
            return NextResponse.json(
                { message: `[Error] 500 Internal Server Error. Error: ${e}` },
                { status: 500 }
            );
        }

        return files.forEach((r) => {
            const pth = `${r.path}/${r.name}`;
            const pth_nrm = path.normalize(pth);
            if (pth_nrm.endsWith(`.${file_type}`)) {
                buf.push(pth_nrm);
            }
        });
    });

    if (!buf.length) {
        return NextResponse.json(
            { message: `[Error] 404 No Files With Given Parameters Found. Parameters: dir: '${base_dir}'; type: '${file_type}'` },
            { status: 404 }
        );
    }

    return NextResponse.json(buf);
}