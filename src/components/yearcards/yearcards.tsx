import Necropotence from '../../assets/img/necropotence.jpeg';
import { useContext } from 'react';
import { CardContext } from '../../contexts/cards/cardcontext';
interface Props {
    year: string;
}

export const YearCard = ({ year }: Props) => {
    const { collections } = useContext(CardContext);
    const sets = collections;

    return (
        <div className="timeline__content timeline__card">
            <img
                className="timeline__image"
                src={Necropotence}
                alt="necropotence"
            />
            <h2 className="date">{year}</h2>
            <p className="description">
                {sets.map((set) => {
                    if (set.year.includes(year)) {
                        return (
                            <div className="Description__container">
                                <img
                                    src={set.icon}
                                    alt={set.name}
                                    className="icon"
                                />
                                <h4>{set.name}</h4>
                            </div>
                        );
                    }
                })}
            </p>
            <div className="button__container">
                <button className="bnt-more">Back to {year} →</button>
            </div>
        </div>
    );
};
