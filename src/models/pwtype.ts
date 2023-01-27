import { decktype } from '../components/types/types';

export type pwType = {
    username: string;
    uid: string;
    email: string;
    profilePic: string;
    displayName: string;
    decks: decktype[];
};
