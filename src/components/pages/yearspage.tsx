import { Header } from '../header/header';
import { YearButton } from '../yearbutton/yearbutton';
import { ColorScroll } from '../colorscroll/colorscroll';
import { TypeButtons } from '../typebuttons/typebuttons';
import { FlavorText } from '../flavortext/flavortext';
import { Footer } from '../footer/footer';
import { Link } from 'react-router-dom';
export const YearsPage = () => {
    return (
        <>
            <Header />
            <YearButton />
            <FlavorText />
            <ColorScroll />
            <TypeButtons />
            <Footer />
        </>
    );
};
