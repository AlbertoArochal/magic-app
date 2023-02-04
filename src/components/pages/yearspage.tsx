import { Header } from '../header/header';
import { YearButton } from '../yearbutton/yearbutton';
import { ColorScroll } from '../colorscroll/colorscroll';
import { TypeButtons } from '../typebuttons/typebuttons';
export const YearsPage = () => {
    return (
        <>
            <Header />
            <div>
                <YearButton />
                <ColorScroll />
                <TypeButtons />
            </div>
        </>
    );
};
