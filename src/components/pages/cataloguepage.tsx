import { Header } from '../header/header';
import { CardFetcher } from '../cardfetcher/cardfetcher';
import { useEffect } from 'react';
import { useContext } from 'react';
import { CardContext } from '../../contexts/cards/cardcontext';
import { PageButtons } from '../pagebuttons/pagebuttons';

export const CataloguePage = () => {
    const { setPage } = useContext(CardContext);
    const { setFilteredCards } = useContext(CardContext);
    const period = localStorage.getItem('year') ?? '2011';
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
                <PageButtons period={+period} />
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
