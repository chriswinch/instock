import { Form, useLoaderData, LinksFunction, LoaderFunction } from 'remix';

import styles from '~/styles/bikes.css'

export const links: LinksFunction = () => ([
    { rel: "stylesheet", href: styles }
]);

interface Bike {
    id: number
    title: string
    type: string
    store: string
    price: number
    priceAsString: string
    created: string
    photo: string
    link: string
}

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

const mockBikeData: Bike[] = [
    {
        "id": 2904,
        "title": "Specialized S Works Enduro 29er XX1 Eagle AXS 2021 Red/Spectraflair",
        "type": "mtb",
        "store": "leisurelakes",
        "price": 11500,
        "priceAsString": "£11,500.00",
        "created": "2021-07-07T19:08:09.382Z",
        "photo": "https://www.leisurelakesbikes.com/images/01-46.png?width=480&height=480&format=jpg&quality=70&scale=both",
        "link": "https://www.leisurelakesbikes.com/bikes/full-suspension-mountain-bikes/specialized-s-works-enduro-29er-xx1-eagle-axs-2021-redspectraflair__351564"
    },
    {
        "id": 2604,
        "title": "Specialized S-Works Epic Hardtail Mountain Bike 2021",
        "type": "mtb",
        "store": "sigma",
        "price": 10000,
        "priceAsString": "£10,000.00",
        "created": "2021-07-07T19:05:02.029Z",
        "photo": "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
        "link": "https://sigmasports.com/item/Specialized/S-Works-Epic-Hardtail-Mountain-Bike-2021/RE4S"
    },
    {
        "id": 2602,
        "title": "Santa Cruz Bronson Carbon CC XX1 Reserve 27.5\" Mountain Bike 2020",
        "type": "mtb",
        "store": "sigma",
        "price": 9399,
        "priceAsString": "£9,399.00",
        "created": "2021-07-07T19:05:00.994Z",
        "photo": "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
        "link": "https://sigmasports.com/item/Santa-Cruz/Bronson-Carbon-CC-XX1-Reserve-275-Mountain-Bike-2020/PNW9"
    },
    {
        "id": 2900,
        "title": "Trek Fuel EX 9.9 XTR Mountain Bike 2021 Matte Carbon Smoke",
        "type": "mtb",
        "store": "leisurelakes",
        "price": 8600,
        "priceAsString": "£8,600.00",
        "created": "2021-07-07T19:08:07.690Z",
        "photo": "https://www.leisurelakesbikes.com/images/fuelex99xtr_21_33409_c_primary.jpg?width=480&height=480&format=jpg&quality=70&scale=both",
        "link": "https://www.leisurelakesbikes.com/bikes/full-suspension-mountain-bikes/trek-fuel-ex-99-xtr-mountain-bike-2021-matte-carbon-smoke__352690"
    },
    {
        "id": 2893,
        "title": "Trek Slash 9.9 XO1 29er Mountain Bike 2021 Lithium Grey",
        "type": "mtb",
        "store": "leisurelakes",
        "price": 8250,
        "priceAsString": "£8,250.00",
        "created": "2021-07-07T19:08:04.670Z",
        "photo": "https://www.leisurelakesbikes.com/images/Slash99XO1_21_33018_A_Primary.jpg?width=480&height=480&format=jpg&quality=70&scale=both",
        "link": "https://www.leisurelakesbikes.com/bikes/full-suspension-mountain-bikes/trek-slash-99-xo1-29er-mountain-bike-2021-lithium-grey__354565"
    }
];

export const loader: LoaderFunction = async ({ request }): Promise<LoaderData> => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const brand = url.searchParams.get('brand') || '';
    const type = url.searchParams.get('type') || '';
    const price = url.searchParams.get('price') || '';

    return {
        query: {
            search,
            brand,
            type,
            price
        },
        bikes: mockBikeData
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
