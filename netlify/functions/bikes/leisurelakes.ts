import { Page } from "puppeteer-core";
import { autoScroll } from "~/utils/puppeteer";

const leisureLakes = async (page: Page, url: string, type: string) => {
    await page.goto(url);
    await page.waitForSelector('.productContainer');
    const products = await page.$$('.col-facetItem');
    // await page.waitForTimeout(2000);
    await autoScroll(page);
    const results = [];

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const title = await product.$eval('.frItemName', (el) => (el as HTMLElement).innerText);
        const priceRaw = Number(await product.$eval('.nowPrice-betterSearch', (el) => (el as HTMLElement).innerText.replace(/[^0-9]/g, '')));
        const price = Number((priceRaw / 100).toFixed(2));
        const photo = await product.$eval('.facetItemImg img', (el) => (el as HTMLImageElement).src);
        const link = await product.$eval('.facetItemImg', (el) => (el as HTMLLinkElement).href);
        const store = 'leisurelakes';
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
    }

    return results;
}

export default leisureLakes;
