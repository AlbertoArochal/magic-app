import { Header } from '../header/header';
import { CardFetcher } from '../cardfetcher/cardfetcher';
import { PageButtons } from '../pagebuttons/pagebuttons';

export const DeckPage = () => {
    return (
        <>
            <Header />
            <PageButtons />
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
                        Your Deck
                    </h1>
                </div>
            </div>
        </>
    );
};
