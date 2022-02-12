import { Form, LinksFunction } from "remix";
import SearchForm, { SearchFormLinks } from "~/components/SearchForm";

import styles from '~/styles/home.css'

export const links: LinksFunction = () => ([
    { rel: "stylesheet", href: styles },
    ...SearchFormLinks()
])

export default function Index() {
    return (
        <div className="home">
            <div className="home__intro-text">
                <h2>Find your next bike. Right Now.</h2>
            </div>

            <SearchForm />

            <div className="home__main-ctas">
                <div className="home__main-cta">
                    <img src="/images/cta-1.jpg" alt="CTA 1" />
                </div>
                <div className="home__main-cta">
                    <img src="/images/cta-2.jpg" alt="CTA 1" />
                </div>
            </div>
        </div>
    );
}
