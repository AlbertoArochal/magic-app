import { Header } from '../header/header';
import { YearButton } from '../yearbutton/yearbutton';
import { ColorScroll } from '../colorscroll/colorscroll';
import { TypeButtons } from '../typebuttons/typebuttons';
import { FlavorText } from '../flavortext/flavortext';
import { Footer } from '../footer/footer';
import { useEffect, useContext } from 'react';
import { CardContext } from '../../contexts/cards/cardcontext';

export const YearsPage = () => {
    const { resetPage } = useContext(CardContext);
    useEffect(() => {
        window.scrollTo(0, 0);
        resetPage();
    }, []);
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
