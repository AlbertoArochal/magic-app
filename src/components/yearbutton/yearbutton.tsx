import { CardContext } from '../../contexts/cards/cardcontext';
import { useContext } from 'react';
import { userContext } from '../../contexts/user/usercontext';

export const YearButton = () => {
    const { cards } = useContext(CardContext);
    const { user } = useContext(userContext);

    return (
        <div className="Year__container">
            <h1 className="YearButton__title">Year Button</h1>
        </div>
    );
};
