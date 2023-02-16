import { useContext } from 'react';
import { CardContext } from '../../contexts/cards/cardcontext';
import { useCards } from '../hooks/logdelete/useCards';

export const PageButtons = ({ period = 2011 }: { period?: number }) => {
    const { page, setPage } = useContext(CardContext);
    const { GetFetchCardsByYear } = useCards();

    const handlePreviousPage = () => {
        setPage(page - 1);
        GetFetchCardsByYear(period, page - 1);
    };

    const handleNextPage = () => {
        setPage(page + 1);
        GetFetchCardsByYear(period, page + 1);
    };

    return (
        <div>
            {page > 1 && <button onClick={handlePreviousPage}>⇦</button>}
            <button onClick={handleNextPage}>⇨</button>
        </div>
    );
};
