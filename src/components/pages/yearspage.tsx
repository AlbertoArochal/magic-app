import { Header } from '../header/header';
import { YearButton } from '../yearbutton/yearbutton';
import { ColorScroll } from '../colorscroll/colorscroll';
export const YearsPage = () => {
    return (
        <>
            <Header />
            <div>
                <YearButton />
                <ColorScroll />
            </div>
        </>
    );
};
