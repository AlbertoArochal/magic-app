import { CardContext } from '../../contexts/cards/cardcontext';
import { useContext } from 'react';
import { ScryfallApi } from '../../services/scryfallapi';

export const useCards = () => {
    const { 
        collections, 
        setCollections, 
        setCards, 
        setFilteredCards,
        setPaginationInfo,
        setActiveFilter,
        setPage,
        setIsLoadingPage,
    } = useContext(CardContext);

    const GetSets = async () => {
        const Scryfall = new ScryfallApi();
        const collections = await Scryfall.getSets();
        setCollections(collections);
    };

    const GetFetchCardsByYear = async (year: number, page = 1) => {
        setIsLoadingPage(true);
        try {
            const Scryfall = new ScryfallApi();
            const response = await Scryfall.getCardsByYear(year, page);
            setCards(response.cards);
            setPaginationInfo(response.paginationInfo);
            setActiveFilter({ type: 'year', value: year.toString() });
            setPage(page);
            setFilteredCards([]); // Clear filtered cards when viewing all year cards
        } finally {
            setIsLoadingPage(false);
        }
    };

    const GetByYearAndColor = async (year: number, color: string, page = 1) => {
        setIsLoadingPage(true);
        try {
            const Scryfall = new ScryfallApi();
            const response = await Scryfall.getCardsByYearAndColor(year, color, page);
            setFilteredCards(response.cards);
            setPaginationInfo(response.paginationInfo);
            setActiveFilter({ type: 'color', value: color });
            setPage(page);
        } finally {
            setIsLoadingPage(false);
        }
    };

    const GetByYearAndType = async (year: number, type: string, page = 1) => {
        setIsLoadingPage(true);
        try {
            const Scryfall = new ScryfallApi();
            const response = await Scryfall.getCardsByYearAndType(year, type, page);
            setFilteredCards(response.cards);
            setPaginationInfo(response.paginationInfo);
            setActiveFilter({ type: 'cardType', value: type });
            setPage(page);
        } finally {
            setIsLoadingPage(false);
        }
    };

    // Clear filter and show all cards for the year
    const ClearFilter = async (year: number) => {
        setFilteredCards([]);
        setActiveFilter(null);
        await GetFetchCardsByYear(year, 1);
    };

    return {
        collections,
        GetSets,
        GetFetchCardsByYear,
        GetByYearAndColor,
        GetByYearAndType,
        ClearFilter,
    };
};
