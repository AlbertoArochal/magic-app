import { useContext } from 'react';
import { CardContext } from '../../contexts/cards/cardcontext';
import { useCards } from '../hooks/logdelete/useCards';

export const PageButtons = (year: number) => {
    const { page, setPage } = useContext(CardContext);
    const { GetFetchCardsByYear } = useCards();

    return (
        <div>
            {page > 1 && <button>⇦</button>}
            <button>⇨</button>
        </div>
    );
};
