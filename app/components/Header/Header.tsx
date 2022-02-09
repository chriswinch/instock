import { Link, LinksFunction } from "remix";

import styles from './Header.css';

export const links: LinksFunction = () => ([
    { rel: "stylesheet", href: styles }
]);

const Header = () => {
    return (
        <header className="header">
            <Link to="/"><h1>InStock</h1></Link>
        </header>
    );
}

export default Header;
