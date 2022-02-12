import { Form } from 'remix';
import type { Query } from '~/types/bikes';

import styles from './SearchForm.css';

export const links = () => ([
    { rel: "stylesheet", href: styles }
]);

interface Props {
    query?: Query
}

const SearchForm = ({ query }: Props) => {
    return (
        <div className="search-form">
            <Form method="get" action="/bikes">
                <label htmlFor="search">
                    <input type="text" name="search" placeholder="Search" defaultValue={query?.search} />
                </label>
                <label htmlFor="brand">
                    <input type="text" name="brand" placeholder="Brand" defaultValue={query?.brand} />
                </label>
                <label htmlFor="type">
                    <input type="text" name="type" placeholder="Type" defaultValue={query?.type} />
                </label>
                <label htmlFor="price">
                    <input type="text" name="price" placeholder="Price" defaultValue={query?.price} />
                </label>
                <button type="submit">Search</button>
            </Form>
        </div>
    );
}

export default SearchForm;
