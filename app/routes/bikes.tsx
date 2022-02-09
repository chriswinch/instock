import { LinksFunction } from 'remix';

import styles from '~/styles/bikes.css'

export const links: LinksFunction = () => ([
    { rel: "stylesheet", href: styles }
]);

export default function Bikes() {
    return (
        <div className="bikes">
            <h2>Bikes</h2>
        </div>
    );
};
