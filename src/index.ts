import { chromium } from "playwright";

/**
 * Executes JavaScript and strips out all script tags in the provided HTML string.
 */
export async function stripScripts(html: string): Promise<string> {
    const browser = await chromium.launch();
    try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle" });
        await page.evaluate(() => {
            const scripts = document.querySelectorAll("script");
            scripts.forEach(script => script.remove());
        });
        return await page.content();
    } finally {
        await browser.close();
    }
}