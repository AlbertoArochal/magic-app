import { Link } from 'react-router-dom';
import { CardContext } from '../../contexts/cards/cardcontext';
import { useContext } from 'react';

export const YearLink = () => {
    const { cards } = useContext(CardContext);
    if (cards.length > 0) {
        const year = cards[0].released_at.slice(0, 4);
        return (
            <Link to="/years" className="year">
                <p className="year">{year}</p>
            </Link>
        );
    } else {
        return (
            <Link to="/Home" className="year">
                <p className="year">Year</p>
            </Link>
        );
    }
};
