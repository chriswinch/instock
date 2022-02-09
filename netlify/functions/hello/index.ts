import { Handler } from "@netlify/functions";

import chromium from "chrome-aws-lambda";
import puppeteer from 'puppeteer-core';

const handler: Handler = async (event, context) => {
    let result = null;
    let browser = null;

    try {
        browser = await puppeteer.launch({
            args: [
                '--disable-features=AudioServiceOutOfProcess'
            ],
            executablePath: await process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath,
            headless: chromium.headless
        });

        let page = await browser.newPage();

        await page.goto('https://example.com');

        result = await page.title();
    } catch (err) {
        let message = '';
        if (typeof err === 'string') {
            message = err;
        } else if (err instanceof Error) {
            message = err.message;
        }
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: message
            })
        }
    } finally {
        if (browser !== null) {
        await browser.close();
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            result
        })
    };
};

export { handler }
