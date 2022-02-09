import { Handler } from '@netlify/functions';

import chromium from "chrome-aws-lambda";
import puppeteer from 'puppeteer-core';

const handler: Handler = async (event, context) => {
    let browser = null;
    let result = null;
    try {
        browser = await puppeteer.launch({
            args: [
                '--disable-features=AudioServiceOutOfProcess'
            ],
            executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath,
            headless: chromium.headless
        });

        let page = await browser.newPage();

        await page.goto('https://www.leisurelakesbikes.com/mountain-bike/bikes/full-suspension-mountain-bikes/instock');

        // await page.waitForNavigation({waitUntil: 'networkidle2'})

        result = await page.title();
    } catch (err) {
        let message = '';
        if (err instanceof Error) {
            message = err.message;
        } else if (typeof err === 'string') {
            message = err;
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
    }
}

export { handler}
