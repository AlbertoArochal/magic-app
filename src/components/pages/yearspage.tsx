import { Header } from '../header/header';
import { YearButton } from '../yearbutton/yearbutton';
import { ColorScroll } from '../colorscroll/colorscroll';
import { TypeButtons } from '../typebuttons/typebuttons';
import { FlavorText } from '../flavortext/flavortext';
import { Footer } from '../footer/footer';
import { useEffect } from 'react';
import { PageButtons } from '../pagebuttons/pagebuttons';

export const YearsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
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
