import { Header } from '../header/header';
import { CardFetcher } from '../cardfetcher/cardfetcher';

export const CataloguePage = () => {
    return (
        <>
            <Header />
            <div className="Catalogue__container">
                {' '}
                <CardFetcher />
                <div className="catalogue__header">
                    <h1 className="catalogue__title">Catalogue</h1>
                </div>
            </div>
        </>
    );
};
