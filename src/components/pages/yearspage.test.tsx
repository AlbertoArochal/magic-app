import { YearsPage } from './yearspage';
import { Header } from '../header/header';
import { YearButton } from '../yearbutton/yearbutton';
import { ColorScroll } from '../colorscroll/colorscroll';
import { render, screen } from '@testing-library/react';
import { CardContext } from '../../contexts/cards/cardcontext';
import { TypeButtons } from '../typebuttons/typebuttons';
import { FlavorText } from '../flavortext/flavortext';
import { cardsmock } from '../../mocks/cardsmock';

describe('YearsPage', () => {
    it('should render the color scroll', () => {
        const Wrapper = ({ children }) => (
            <CardContext.Provider
                value={{
                    cards: cardsmock,
                    setCards: () => jest.fn(),
                    collections: [],
                    setCollections: () => jest.fn(),
                }}
            ></CardContext.Provider>
        );

        render(
            <Wrapper>
                <YearsPage />
            </Wrapper>
        );

        expect(YearsPage).toBeDefined();
    });
});
