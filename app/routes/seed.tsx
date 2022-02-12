import styles from '~/styles/seed.css';

export const links = () => ([
    { rel: 'stylesheet', href: styles }
]);


/**
 * At the moment I can't get puppeteer to run in serverless functions on netflify
 * So these seed functions only run locally.
 * Ideally they would have been ran on a cron job to keep the site up to date.
 * May need to split this out into a separate service and run via node-cron in express
 */
const Seed = () => {
    const handleSeed = async (store: string , type: string ) => {
        const res = await fetch(`/.netlify/functions/bikes?store=${store}&type=${type}`);
        console.log(await res.json());
    }

    return (
        <div className="seed">
            <div className="seed__list-wrapper">
                <h3>Leisure Lakes</h3>
                <div className="seed__list">
                    <button onClick={() => handleSeed('leisurelakes', 'mountain-bikes')}>Mountain Bikes</button>
                    <button onClick={() => handleSeed('leisurelakes', 'road-bikes')}>Road / CX Bikes</button>
                    <button onClick={() => handleSeed('leisurelakes', 'hybrid-bikes')}>Hybrid Bikes</button>
                </div>
            </div>

            <div className="seed__list-wrapper">
                <h3>Chain Reactions</h3>
                <div className="seed__list">
                    <button onClick={() => handleSeed('chainreaction', 'mountain-bikes')}>Mountain Bikes</button>
                    <button onClick={() => handleSeed('chainreaction', 'road-bikes')}>Road / CX Bikes</button>
                    <button onClick={() => handleSeed('chainreaction', 'hybrid-bikes')}>Hybrid Bikes</button>
                </div>
            </div>
        </div>
    )
};

export default Seed;
