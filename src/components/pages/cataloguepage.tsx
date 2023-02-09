import { Header } from '../header/header';
import { CardFetcher } from '../cardfetcher/cardfetcher';
import { useEffect } from 'react';

export const CataloguePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <Header />
            <div
                className="Catalogue__container"
                key={new Date().getTime().toString + 'container'}
            >
                {' '}
                <CardFetcher />
                <div
                    className="catalogue__header"
                    key={new Date().getTime().toString + 'header'}
                >
                    <h1
                        className="catalogue__title"
                        key={new Date().getTime().toString + 'title'}
                    >
                        Catalogue
                    </h1>
                </div>
            </div>
        </>
    );
};
