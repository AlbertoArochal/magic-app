export type cardType = {
    name: string;
    released_at: string;
    image_uris: {
        small: string;
        large: string;
        art_crop: string;
    };
    mana_cost: string;
    oracle_text: string;
    type_line: string;
    color_identity: string[];
    artist: string;
    set_name: string;
    flavor_text: string;
};

export type creatureType = {
    name: string;
    released_at: string;
    image_uris: {
        small: string;
        large: string;
        art_crop: string;
    };
    mana_cost: string;
    oracle_text: string;
    type_line: string;
    color_identity: string[];
    artist: string;
    set_name: string;
    power: string;
    toughness: string;
    flavor_text: string;
};

export type cardListType = {
    cards: cardType[];
};

export type creatureListType = {
    cards: creatureType[];
};

export type playerType = {
    name: string;
    uid: string;
    decklist: decktype[];
};

export type decktype = {
    name: string;
    cards: cardType[];
};
