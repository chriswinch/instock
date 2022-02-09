import { Link, LinksFunction } from "remix";

import styles from './Footer.css';

export const links: LinksFunction = () => ([
    { rel: "stylesheet", href: styles }
]);

const Footer = () => {
    return (
        <footer className="footer">
            <Link to="/"><h4>InStock</h4></Link>
        </footer>
    );
}

export default Footer;
