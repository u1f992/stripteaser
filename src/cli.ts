#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from 'node:path';
import url from 'node:url';

import { Command } from "commander";

import { stripScripts } from "./index.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const packageJsonPath = path.join(__dirname, "..", "package.json");
const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf-8"));

new Command()
    .version(packageJson.version)
    .argument("<input>")
    .argument("[output]")
    .action(async (input: string, output: string) => {
        const html = await fs.readFile(input, "utf-8");
        const stripped = await stripScripts(html);
        if (!output) {
            console.log(stripped);
        } else {
            await fs.writeFile(output, stripped, "utf-8");
        }
    })
    .parse();