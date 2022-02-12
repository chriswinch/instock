import { Handler } from '@netlify/functions';
import { PrismaClient } from '@prisma/client';

import chromium from "chrome-aws-lambda";
import puppeteer from 'puppeteer-core';
import leisureLakes from './leisurelakes';
import chainReaction from './chainreaction';

const prisma = new PrismaClient();
interface Urls {
    [key: string]: {
        [key: string]: string;
    };
}

const urls: Urls = {
    leisurelakes: {
        'mountain-bikes': 'https://www.leisurelakesbikes.com/mountain-bike/bikes/full-suspension-mountain-bikes/instock',
        'hybrid-bikes': 'https://www.leisurelakesbikes.com/bikes/hybrid-bikes/instock',
        'road-bikes': 'https://www.leisurelakesbikes.com/road-bike/bikes/road-racing-bikes/instock',
    },
    chainreaction: {
        'mountain-bikes': 'https://www.chainreactioncycles.com/mtb/mountain-bikes?f=2247',
        'road-bikes': 'https://www.chainreactioncycles.com/road/road-bikes?f=2247',
        'hybrid-bikes': 'https://www.chainreactioncycles.com/city/hybrid-city-bikes?f=2247',
    }
}

const shopFuncs: {[key: string]: Function } = {
    leisurelakes: leisureLakes,
    chainreaction: chainReaction
}

/**
 * Can't get this to run on netlify
 * Similar issue to https://answers.netlify.com/t/memory-usage-puppeteer-function-or-repo-based/5613
 */
const handler: Handler = async (event, context) => {
    if (
        event.queryStringParameters &&
        event.queryStringParameters.type &&
        event.queryStringParameters.store
    ) {
        const qs = event.queryStringParameters;
        if (qs.type && qs.store) {
            const store = qs.store;
            const type = qs.type;

            let browser = null;
            try {
                browser = await puppeteer.launch({
                    args: [
                        '--disable-features=AudioServiceOutOfProcess'
                    ],
                    executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath,
                    headless: false
                });

                let page = await browser.newPage();
                const url = urls[store][type];

                const results = await shopFuncs[store](page, url, type);
                await prisma.bike.deleteMany({
                    where: {
                        store,
                        type
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
