import { Page } from 'puppeteer-core';

// https://stackoverflow.com/a/53527984
async function autoScroll(page: Page) {
    await page.evaluate(async () => {
        await new Promise<void>((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 10);
        });
    });
}

export { autoScroll };
