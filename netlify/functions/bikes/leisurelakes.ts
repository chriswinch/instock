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
        const price = await product.$eval('.nowPrice-betterSearch', (el) => el.innerText);
        const image = await product.$eval('.facetItemImg img', (el) => el.src);
        const link = await product.$eval('.facetItemImg', (el) => el.href);
        results.push({
            title,
            price,
            image,
            link
        });
    }
    return results;
}

export default leisureLakes;
