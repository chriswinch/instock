import { Form, useLoaderData, LinksFunction, LoaderFunction } from 'remix';
import type { Bike } from '@prisma/client';
import { db } from '~/utils/db';

import styles from '~/styles/bikes.css'

const prisma = db;

export const links: LinksFunction = () => ([
    { rel: "stylesheet", href: styles }
]);

interface Query {
    search: string
    type: string
    brand: string
    price: string
}

interface LoaderData {
    bikes: Bike[]
    query: Query
}


export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const brand = url.searchParams.get('brand') || '';
    const type = url.searchParams.get('type') || '';
    const price = url.searchParams.get('price') || '';

    const bikes = await prisma.bike.findMany({
        where: {
            title: {
                contains: search,
                mode: 'insensitive'
            },
            OR: {
                title: {
                    contains: brand,
                    mode: 'insensitive'
                }
            }
        }
    });

    return {
        query: {
            search,
            brand,
            type,
            price
        },
        bikes
    }
}

export default function Bikes() {
    const { bikes, query } = useLoaderData<LoaderData>();

    return (
        <div className="bikes">
            <div className="bikes__intro">
                <h2>Bikes</h2>
            </div>
            <div className="bikes__search-form">
                <Form method="get">
                    <label htmlFor="search">
                        <input type="text" name="search" placeholder="Search" defaultValue={query.search} />
                    </label>
                    <label htmlFor="brand">
                        <input type="text" name="brand" placeholder="Brand" defaultValue={query.brand} />
                    </label>
                    <label htmlFor="type">
                        <input type="text" name="type" placeholder="Type" defaultValue={query.type} />
                    </label>
                    <label htmlFor="price">
                        <input type="text" name="price" placeholder="Price" defaultValue={query.price} />
                    </label>
                    <button type="submit">Search</button>
                </Form>
            </div>
            <div className="bikes__list">
                {bikes.map(bike => (
                    <a className="bikes__list-item" key={bike.id} href={bike.link}>
                        <div className="bikes__list-item-image">
                            <img src={bike.photo} alt={bike.title} />
                        </div>
                        <div className="bikes__list-item-info">
                            <h3 className="bikes__list-item-info-title">{bike.title}</h3>
                            <p className="bikes__list-item-info-price">{bike.priceAsString}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};
