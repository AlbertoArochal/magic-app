import { Header } from '../header/header';
import { DeckFetcher } from '../deckfetcher/deckfetcher';
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
                <DeckFetcher />
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
