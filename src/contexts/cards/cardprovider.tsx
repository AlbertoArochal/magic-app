import { CardsReducer } from '../../components/reducers/carsreducer/cardsreducer';
import { useReducer } from 'react';

import { CardContext } from './cardcontext';
export const CardProvider = ({ children }: any) => {
    const [collections, collectionsDispatch] = useReducer(CardsReducer, {
        collections: [],
    });

    return (
        <CardContext.Provider
            value={{
                collections: collections.collections,
                setCollections: (collections: any[]) =>
                    collectionsDispatch({
                        type: 'SET_COLLECTIONS',
                        payload: collections,
                    }),
            }}
        >
            {children}
        </CardContext.Provider>
    );
};
