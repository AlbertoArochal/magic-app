import { deckType } from './decktype';

export type pwType = {
    username: string;
    uid: string;
    email: string;
    profilePic: string;
    displayName: string;
    decks: deckType[];
};
