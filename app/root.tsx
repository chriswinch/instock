import {
    Links,
    LinksFunction,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";

import resetStyles from '~/styles/reset.css';
import globalStyles from '~/styles/globals.css';

import Header, { headerLinks } from '~/components/Header';
import Footer, { footerLinks } from '~/components/Footer';

export const meta: MetaFunction = () => {
    return { title: "INSTOCK | Find Your Next Bike. Right Now!" };
};

export const links: LinksFunction = () => ([
    { rel: "stylesheet", href: resetStyles },
    { rel: "stylesheet", href: globalStyles },
    ...headerLinks(),
    ...footerLinks()
]);

export default function App() {
  return (
    <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <Meta />
            <Links />
        </head>
        <body>
            <Header />
            <Outlet />
            <Footer />

            <ScrollRestoration />
            <Scripts />
            {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
    </html>
  );
}
