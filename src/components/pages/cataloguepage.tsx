import { Header } from '../header/header';
import { CardFetcher } from '../cardfetcher/cardfetcher';
import { useEffect } from 'react';
import { useContext } from 'react';
import { CardContext } from '../../contexts/cards/cardcontext';

export const CataloguePage = () => {
    const { setFilteredCards } = useContext(CardContext);
    useEffect(() => {
        setFilteredCards([]);
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
