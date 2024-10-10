#!/usr/bin/env node

import { promises as fs } from "node:fs";

import { Command } from "commander";

import { stripScripts } from "./index.js";

new Command()
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