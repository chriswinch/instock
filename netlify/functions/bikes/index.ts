import { Handler } from '@netlify/functions';
import { PrismaClient } from '@prisma/client';

import chromium from "chrome-aws-lambda";
import puppeteer from 'puppeteer-core';
import leisureLakes from './leisurelakes';

const prisma = new PrismaClient();

/**
 * Can't get this to run on netlify
 * Similar issue to https://answers.netlify.com/t/memory-usage-puppeteer-function-or-repo-based/5613
 */

const urls = {
    leisurelakes: {
        'mountain-bikes': 'https://www.leisurelakesbikes.com/mountain-bike/bikes/full-suspension-mountain-bikes/instock',
    }
}

const handler: Handler = async (event, context) => {
    let browser = null;
    try {
        browser = await puppeteer.launch({
            args: [
                '--disable-features=AudioServiceOutOfProcess'
            ],
            executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath,
            headless: chromium.headless
        });

        let page = await browser.newPage();

        await page.goto(urls['leisurelakes']['mountain-bikes']);

        const results = await leisureLakes(page);
        await prisma.bike.deleteMany({
            where: {
                store: 'leisurelakes',
                type: 'mountain-bikes'
            }
        })
        await prisma.bike.createMany({ data: results });
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
            success: true
        })
    }
}

export { handler}
