import { Page } from "puppeteer-core";
import { autoScroll } from "~/utils/puppeteer";
import type { Bike } from '@prisma/client';

type BikeResults = Omit<Bike, 'id' | 'created'>[]

const chainReaction = async (page: Page, url: string, type: string) => {
    let results: BikeResults = [];

    const getResults = async (pageNum: number) => {
        await page.goto(`${url}&page=${pageNum}`);
        await page.waitForSelector('.products_details_container');
        const products = await page.$$('.products_details_container');
        await autoScroll(page);

        for (let i=0; i < products.length; i++) {
            const product = products[i];
            const title = await product.$eval('.description h2', (el) => (el as HTMLElement).innerText);
            const priceRaw = Number(await product.$eval('.fromamt', (el) => (el as HTMLElement).innerText.replace(/[^0-9]/g, '')));
            const price = Number((priceRaw / 100).toFixed(2));
            const photo = await product.$eval('.product_image1 img', (el) => (el as HTMLImageElement).src);
            const link = `https://www.chainreactioncycles.com${await product.$eval('.product_image1 a', (el) => (el as HTMLLinkElement).href)}`;
            const store = 'chainreaction';
            const priceAsString = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(price);

            results.push({
                title,
                type,
                store,
                price,
                priceAsString,
                photo,
                link
            });
        };

        // if (products.length) {
        //     await getResults(pageNum + 1)
        // }
    };

    await getResults(1);


    return results;
}

export default chainReaction;
