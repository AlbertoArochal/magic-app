import { useContext } from 'react';
import { CardContext } from '../../contexts/cards/cardcontext';


export const PageButtons = () => {
    const { page, setPage } = useContext(CardContext);

    const handlePreviousPage = () => {

            setPage(page - 1);

    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    return (
        <div>
            {page > 1 && <button onClick={handlePreviousPage}>⇦</button>}
            <button onClick={handleNextPage}>⇨</button>
        </div>
    );
};

