import { Link, LinksFunction } from "remix";

import styles from './Header.css';

export const links: LinksFunction = () => ([
    { rel: "stylesheet", href: styles }
]);

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="header__link header__logo"><h1>InStock</h1></Link>
            <Link to="/bikes" className="header__link">Bikes</Link>
        </header>
    );
}

export default Header;
