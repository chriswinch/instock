import { Page } from "puppeteer-core";

const leisureLakes = async (page: Page) => {
    const url = 'https://www.leisurelakesbikes.com/mountain-bike/bikes/full-suspension-mountain-bikes/instock';
    await page.goto(url);
    await page.waitForSelector('.productContainer');
    const products = await page.$$('.col-facetItem');
    const results = [];
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const title = await product.$eval('.frItemName', (el) => el.innerText);
        const priceRaw = await product.$eval('.nowPrice-betterSearch', (el) => el.innerText);
        const price = Number((priceRaw.replace(/[^0-9]/g, '') / 100).toFixed(2));
        const photo = await product.$eval('.facetItemImg img', (el) => el.src);
        const link = await product.$eval('.facetItemImg', (el) => el.href);
        const type = 'mountain-bikes';
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
