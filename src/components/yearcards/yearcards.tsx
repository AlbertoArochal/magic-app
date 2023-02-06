import Necropotence from '../../assets/img/necropotence.jpeg';
import { useContext } from 'react';
import { CardContext } from '../../contexts/cards/cardcontext';
import { useCards } from '../hooks/logdelete/useCards';
import { useNavigate } from 'react-router-dom';
interface Props {
    year: string;
}

export const YearCard = ({ year }: Props) => {
    const { collections } = useContext(CardContext);
    const { GetCardsByYear } = useCards();
    const sets = collections;
    const navigate = useNavigate();

    const setCardsHandler = (year: number, page = 1) => {
        GetCardsByYear(year, page);
        setTimeout(() => {
            return navigate('/years');
        }, 600);
    };

    return (
        <div className="timeline__content timeline__card">
            <img
                className="timeline__image"
                src={Necropotence}
                alt="necropotence"
            />
            <h2 className="date">{year}</h2>
            <div className="description">
                {sets.map((set) => {
                    if (set.year.includes(year)) {
                        return (
                            <div
                                className="Description__container"
                                key={year.toString() + set.name}
                            >
                                <img
                                    src={set.icon}
                                    alt={set.name}
                                    className="icon"
                                    key={year.toString() + set.name + 'img'}
                                />
                                <h4 key={year.toString() + set.name + 'h4'}>
                                    {set.name}
                                </h4>
                            </div>
                        );
                    }
                })}
            </div>
            <div className="button__container">
                <button
                    onClick={() => setCardsHandler(+year)}
                    className="bnt-more"
                >
                    Back to {year} →
                </button>
            </div>
        </div>
    );
};