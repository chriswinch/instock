import { useNavigate, useLoaderData, LinksFunction, LoaderFunction, useSearchParams } from 'remix';
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

interface Params {
    [key: string]: string
}

const urlSearchParamsToObject = (searchParams: URLSearchParams) => {
    const params: Params = {
        search: '',
        type: '',
        brand: '',
        price: '',
        page: '1'
    };

    for (let [key, value] of searchParams.entries()) {
        params[key] = value;
    }
    return params;
};

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const { search, brand, type, price, page } = urlSearchParamsToObject(url.searchParams);

    const pageNum = Number(page);

    const bikes = await prisma.bike.findMany({
        skip: pageNum > 1 ? pageNum * 10 : 1,
        take: 40,
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
            price,
            page
        },
        bikes
    }
}

export default function Bikes() {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchObj = urlSearchParamsToObject(searchParams);
    const { page: pageNum } = searchObj;

    const { bikes, query } = useLoaderData<LoaderData>();

    const handlePaginate = (page: number) => {
        setSearchParams({ ...searchObj, page: page.toString() });
    }

    return (
        <div className="bikes">
            <div className="bikes__intro">
                <h2>Bikes</h2>
            </div>

            <SearchForm query={query} />

            {bikes.length > 0 ? (
                <>
                    <div className="bikes__list">
                        {bikes.map(bike => (
                            <a className="bikes__list-item" key={bike.id} href={bike.link} target="_blank" rel="noopener noreferrer">
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
                    <div className="bikes__pagination">
                        <button onClick={() => handlePaginate(Number(pageNum) - 1)} disabled={!pageNum || Number(pageNum) <= 1}>Previous</button>
                        <button onClick={() => handlePaginate(Number(pageNum) + 1)}>Next Page</button>
                    </div>
                </>
            ) : (
                <div className="bikes__empty">
                    <h3>No bikes found</h3>
                </div>
            )}
        </div>
    );
};
