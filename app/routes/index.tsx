import { Form, LinksFunction } from "remix";

import styles from '~/styles/home.css'

export const links: LinksFunction = () => ([
    { rel: "stylesheet", href: styles }
])

export default function Index() {
    return (
        <div className="home">
            <div className="home__intro-text">
                <h2>Find your next bike. Right Now.</h2>
            </div>
            <div className="home__search-form">
                <Form method="get" action="/bikes">
                    <label htmlFor="search">
                        <input type="text" name="search" id="search" placeholder="Search" />
                    </label>

                    <label htmlFor="brand">
                        <input type="text" name="brand" id="brand" placeholder="Brand" />
                    </label>

                    <label htmlFor="type">
                        <input type="text" name="type" id="type" placeholder="Type" />
                    </label>

                    <label htmlFor="price">
                        <input type="text" name="price" id="price" placeholder="Price" />
                    </label>

                    <button type="submit">Search</button>
                </Form>
            </div>
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
