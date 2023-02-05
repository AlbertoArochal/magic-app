import { Header } from '../header/header';
import { YearButton } from '../yearbutton/yearbutton';
import { ColorScroll } from '../colorscroll/colorscroll';
import { TypeButtons } from '../typebuttons/typebuttons';
import { CardProvider } from '../../contexts/cards/cardprovider';
import { Footer } from '../footer/footer';
export const YearsPage = () => {
    return (
        <>
            <Header />
            <YearButton />
            <ColorScroll />
            <TypeButtons />
            <Footer />
        </>
    );
};
