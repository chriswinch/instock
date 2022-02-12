import { Form, useLoaderData, LinksFunction, LoaderFunction } from 'remix';
import type { Bike } from '@prisma/client';
import type { Query } from '~/types/bikes';

import { db } from '~/utils/db';

import SearchForm, { SearchFormLinks } from '~/components/SearchForm';

import styles from '~/styles/bikes.css'

const prisma = db;

export const links: LinksFunction = () => ([
    { rel: "stylesheet", href: styles },
    ...SearchFormLinks()
]);

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

            <SearchForm query={query} />

            <div className="bikes__list">
                {bikes.map(bike => (
                    <a className="bikes__list-item" key={bike.id} href={bike.link}>
                        <div className="bikes__list-item-image">
                            <img src={bike.photo} alt={bike.title} />
                        </div>
                        <div className="bikes__list-item-info">
                            <p className="bikes__list-item-info-price">{bike.priceAsString}</p>
                            <h3 className="bikes__list-item-info-title">{bike.title}</h3>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};
