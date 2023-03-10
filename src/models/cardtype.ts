export type CardType = {
    name: string;
    released_at: string;
    image_uris: {
        small: string;
        large: string;
        normal: string;
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

export type CreatureType = {
    name: string;
    released_at: string;
    image_uris: {
        small: string;
        large: string;
        nornmal: string;
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
