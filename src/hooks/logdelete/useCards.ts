import { CardContext } from '../../contexts/cards/cardcontext';
import { useContext } from 'react';
import { ScryfallApi } from '../../services/scryfallapi';

export const useCards = () => {
    const { collections, setCollections, setCards, setFilteredCards } =
        useContext(CardContext);

    const GetSets = async () => {
        const Scryfall = new ScryfallApi();
        const collections = await Scryfall.getSets();
        setCollections(collections);
    };

    const GetFetchCardsByYear = async (year: number, page = 1) => {
        const Scryfall = new ScryfallApi();
        const cardList = await Scryfall.getCardsByYear(year, page);
        setCards(cardList);
    };

    const GetByYearAndColor = async (year: number, color: string, page = 1) => {
        const Scryfall = new ScryfallApi();
        const cardList = await Scryfall.getCardsByYearAndColor(year, color);
        setFilteredCards(cardList);
    };

    const GetByYearAndType = async (year: number, type: string, page = 1) => {
        const Scryfall = new ScryfallApi();
        const cardList = await Scryfall.getCardsByYearAndType(year, type);

        setFilteredCards(cardList);
    };

    return {
        collections,
        GetSets,
        GetFetchCardsByYear,
        GetByYearAndColor,
        GetByYearAndType,
    };
};
