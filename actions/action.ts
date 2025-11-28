'use server'
import fs from 'fs';
import path from 'path';

export async function thailand_adm0() {
    const filePath = path.join(process.cwd(), '/data/thailand_adm0.geojson');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    return data;
}