import { RawCardType } from '../models/rawType';
import { CardType } from '../models/cardtype';
import { CollectionType, PaginationInfo } from '../contexts/cards/cardcontext';

// Response type including pagination info
export type CardsResponse = {
    cards: CardType[];
    paginationInfo: PaginationInfo;
};

export const errorCard = {
    name: 'Error',
    released_at: 'Error',
    image_uris: {
        small: 'Error',
        large: 'Error',
        normal: 'Error',
        art_crop: 'Error',
    },
    mana_cost: 'Error',
    oracle_text: 'Error',
    type_line: 'Error',
    color_identity: ['Error'],
    artist: 'Error',
    set_name: 'Error',
    power: 'Error',
    toughness: 'Error',
    flavor_text: 'Error',
};

// Global cache for API responses
const apiCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Concurrent request limiter - allows up to 5 parallel requests
let activeRequests = 0;
const MAX_CONCURRENT = 5;
const pendingRequests: Array<() => void> = [];

const waitForSlot = (): Promise<void> => {
    if (activeRequests < MAX_CONCURRENT) {
        activeRequests++;
        return Promise.resolve();
    }
    return new Promise(resolve => {
        pendingRequests.push(resolve);
    });
};

const releaseSlot = () => {
    activeRequests--;
    if (pendingRequests.length > 0) {
        activeRequests++;
        const next = pendingRequests.shift();
        next?.();
    }
};

const rateLimitedFetch = async (url: string): Promise<Response> => {
    await waitForSlot();
    try {
        const response = await fetch(url);
        return response;
    } finally {
        releaseSlot();
    }
};

// Direct fetch for high-priority requests (bypasses queue)
const directFetch = (url: string): Promise<Response> => fetch(url);

const getCached = <T>(key: string): T | null => {
    const cached = apiCache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data as T;
    }
    return null;
};

const setCache = (key: string, data: unknown): void => {
    apiCache.set(key, { data, timestamp: Date.now() });
};

export class ScryfallApi {
    // HIGH PRIORITY - Uses direct fetch, bypasses concurrency limit
    async getSets(): Promise<CollectionType[]> {
        const cacheKey = 'sets';
        const cached = getCached<CollectionType[]>(cacheKey);
        if (cached) return cached;

        const setlist: CollectionType[] = [];
        const response = await directFetch('https://api.scryfall.com/sets');
        if (response.ok) {
            const sets = await response.json();
            sets.data.forEach((set: { set_type: string; released_at: string; name: string; icon_svg_uri: string }) => {
                if (set.set_type === 'core' || set.set_type === 'expansion')
                    setlist.push({
                        year: set.released_at,
                        name: set.name,
                        icon: set.icon_svg_uri,
                        set_type: set.set_type,
                    });
            });
            setCache(cacheKey, setlist);
        } else {
            setlist.push({
                year: 'Error',
                name: 'Error',
                icon: 'Error',
                set_type: 'Error',
            });
        }
        return setlist;
    }

    // HIGH PRIORITY - Uses direct fetch for fast page loads
    async getCardsByYear(year: number, page = 1): Promise<CardsResponse> {
        const cacheKey = `cards-year-${year}-page-${page}`;
        const cached = getCached<CardsResponse>(cacheKey);
        if (cached) return cached;

        const response = await directFetch(
            `https://api.scryfall.com/cards/search?q=year%3D${year}&order=released&dir=asc&page=${page}`
        );
        
        if (response.ok) {
            const data = await response.json();
            const finalCardList: CardType[] = data.data
                .filter((card: RawCardType) => card.image_uris)
                .map((card: RawCardType) => ({
                    name: card.name,
                    released_at: card.released_at,
                    image_uris: {
                        small: card.image_uris?.small || '',
                        large: card.image_uris?.large || '',
                        normal: card.image_uris?.normal || '',
                        art_crop: card.image_uris?.art_crop || '',
                    },
                    mana_cost: card.mana_cost,
                    oracle_text: card.oracle_text,
                    type_line: card.type_line,
                    color_identity: card.color_identity,
                    artist: card.artist,
                    set_name: card.set_name,
                    power: card.power,
                    toughness: card.toughness,
                    flavor_text: card.flavor_text,
                }));
            
            const result: CardsResponse = {
                cards: finalCardList,
                paginationInfo: {
                    hasMore: data.has_more || false,
                    totalCards: data.total_cards || 0,
                    currentPage: page,
                },
            };
            setCache(cacheKey, result);
            return result;
        }
        return { cards: [], paginationInfo: { hasMore: false, totalCards: 0, currentPage: page } };
    }

    async getCardsByYearAndColor(
        year: number,
        color: string,
        page = 1
    ): Promise<CardsResponse> {
        const cacheKey = `cards-year-${year}-color-${color}-page-${page}`;
        const cached = getCached<CardsResponse>(cacheKey);
        if (cached) return cached;

        const response = await rateLimitedFetch(
            `https://api.scryfall.com/cards/search?q=year%3D${year}+color%3D${color}&page=${page}`
        );
        
        if (response.ok) {
            const data = await response.json();
            const finalCardList: CardType[] = data.data
                .filter((card: RawCardType) => card.image_uris)
                .map((card: RawCardType) => ({
                    name: card.name,
                    released_at: card.released_at,
                    image_uris: {
                        small: card.image_uris?.small || '',
                        large: card.image_uris?.large || '',
                        normal: card.image_uris?.normal || '',
                        art_crop: card.image_uris?.art_crop || '',
                    },
                    mana_cost: card.mana_cost,
                    oracle_text: card.oracle_text,
                    type_line: card.type_line,
                    color_identity: card.color_identity,
                    artist: card.artist,
                    set_name: card.set_name,
                    power: card.power,
                    toughness: card.toughness,
                    flavor_text: card.flavor_text,
                }));
            
            const result: CardsResponse = {
                cards: finalCardList,
                paginationInfo: {
                    hasMore: data.has_more || false,
                    totalCards: data.total_cards || 0,
                    currentPage: page,
                },
            };
            setCache(cacheKey, result);
            return result;
        }
        return { cards: [errorCard], paginationInfo: { hasMore: false, totalCards: 0, currentPage: page } };
    }

    async getCardsByYearAndType(
        year: number,
        type: string,
        page = 1
    ): Promise<CardsResponse> {
        const cacheKey = `cards-year-${year}-type-${type}-page-${page}`;
        const cached = getCached<CardsResponse>(cacheKey);
        if (cached) return cached;

        const response = await rateLimitedFetch(
            `https://api.scryfall.com/cards/search?q=year%3D${year}+type%3D${type}&page=${page}`
        );
        
        if (response.ok) {
            const data = await response.json();
            const finalCardList: CardType[] = data.data
                .filter((card: RawCardType) => card.image_uris)
                .map((card: RawCardType) => ({
                    name: card.name,
                    released_at: card.released_at,
                    image_uris: {
                        small: card.image_uris?.small || '',
                        large: card.image_uris?.large || '',
                        normal: card.image_uris?.normal || '',
                        art_crop: card.image_uris?.art_crop || '',
                    },
                    mana_cost: card.mana_cost,
                    oracle_text: card.oracle_text,
                    type_line: card.type_line,
                    color_identity: card.color_identity,
                    artist: card.artist,
                    set_name: card.set_name,
                    power: card.power,
                    toughness: card.toughness,
                    flavor_text: card.flavor_text,
                }));
            
            const result: CardsResponse = {
                cards: finalCardList,
                paginationInfo: {
                    hasMore: data.has_more || false,
                    totalCards: data.total_cards || 0,
                    currentPage: page,
                },
            };
            setCache(cacheKey, result);
            return result;
        }
        return { cards: [errorCard], paginationInfo: { hasMore: false, totalCards: 0, currentPage: page } };
    }

    async getCardsByName(name: string): Promise<RawCardType[]> {
        const cacheKey = `cards-name-${name}`;
        const cached = getCached<RawCardType[]>(cacheKey);
        if (cached) return cached;

        const response = await rateLimitedFetch(
            `https://api.scryfall.com/cards/search?q=name%3D${name}`
        );
        
        if (response.ok) {
            const cards = await response.json();
            setCache(cacheKey, cards.data);
            return cards.data;
        }
        return [errorCard as RawCardType];
    }

    async getRandomCardArtByYear(year: number): Promise<string | null> {
        // Check cache first - use a longer cache for random art
        const cacheKey = `random-art-${year}`;
        const cached = getCached<string>(cacheKey);
        if (cached) return cached;

        try {
            const response = await rateLimitedFetch(
                `https://api.scryfall.com/cards/random?q=year%3D${year}+has%3Aart_crop`
            );
            if (response.ok) {
                const card = await response.json();
                const artUrl = card.image_uris?.art_crop || null;
                if (artUrl) {
                    setCache(cacheKey, artUrl);
                }
                return artUrl;
            }
            return null;
        } catch {
            return null;
        }
    }

    // Secret Lair specific methods
    async getSecretLairSets(): Promise<CollectionType[]> {
        const cacheKey = 'secret-lair-sets';
        const cached = getCached<CollectionType[]>(cacheKey);
        if (cached) return cached;

        const setlist: CollectionType[] = [];
        const response = await directFetch('https://api.scryfall.com/sets');
        if (response.ok) {
            const sets = await response.json();
            sets.data.forEach((set: { set_type: string; released_at: string; name: string; icon_svg_uri: string; code: string }) => {
                if (set.name.toLowerCase().includes('secret lair')) {
                    setlist.push({
                        year: set.released_at,
                        name: set.name,
                        icon: set.icon_svg_uri,
                        set_type: set.set_type,
                        code: set.code,
                    });
                }
            });
            setCache(cacheKey, setlist);
        }
        return setlist;
    }

    async getSecretLairCards(page = 1): Promise<CardsResponse> {
        const cacheKey = `secret-lair-cards-page-${page}`;
        const cached = getCached<CardsResponse>(cacheKey);
        if (cached) return cached;

        const response = await directFetch(
            `https://api.scryfall.com/cards/search?q=set_type%3Amemorabilia+%28set%3Asld+OR+set%3Aslc%29&order=released&dir=desc&page=${page}`
        );
        
        if (response.ok) {
            const data = await response.json();
            const finalCardList: CardType[] = data.data
                .filter((card: RawCardType) => card.image_uris)
                .map((card: RawCardType) => ({
                    name: card.name,
                    released_at: card.released_at,
                    image_uris: {
                        small: card.image_uris?.small || '',
                        large: card.image_uris?.large || '',
                        normal: card.image_uris?.normal || '',
                        art_crop: card.image_uris?.art_crop || '',
                    },
                    mana_cost: card.mana_cost,
                    oracle_text: card.oracle_text,
                    type_line: card.type_line,
                    color_identity: card.color_identity,
                    artist: card.artist,
                    set_name: card.set_name,
                    power: card.power,
                    toughness: card.toughness,
                    flavor_text: card.flavor_text,
                }));
            
            const result: CardsResponse = {
                cards: finalCardList,
                paginationInfo: {
                    hasMore: data.has_more || false,
                    totalCards: data.total_cards || 0,
                    currentPage: page,
                },
            };
            setCache(cacheKey, result);
            return result;
        }
        return { cards: [], paginationInfo: { hasMore: false, totalCards: 0, currentPage: page } };
    }

    async getRandomSecretLairArt(): Promise<CardType | null> {
        const cacheKey = `random-secret-lair-art-${Date.now() % 100}`; // Some variation
        const cached = getCached<CardType>(cacheKey);
        if (cached) return cached;

        try {
            const response = await rateLimitedFetch(
                `https://api.scryfall.com/cards/random?q=set%3Asld+has%3Aart_crop`
            );
            if (response.ok) {
                const card = await response.json();
                const result: CardType = {
                    name: card.name,
                    released_at: card.released_at,
                    image_uris: {
                        small: card.image_uris?.small || '',
                        large: card.image_uris?.large || '',
                        normal: card.image_uris?.normal || '',
                        art_crop: card.image_uris?.art_crop || '',
                    },
                    mana_cost: card.mana_cost,
                    oracle_text: card.oracle_text,
                    type_line: card.type_line,
                    color_identity: card.color_identity,
                    artist: card.artist,
                    set_name: card.set_name,
                    power: card.power,
                    toughness: card.toughness,
                    flavor_text: card.flavor_text,
                };
                setCache(cacheKey, result);
                return result;
            }
            return null;
        } catch {
            return null;
        }
    }

    async getCardsBySetCode(setCode: string): Promise<CardType[]> {
        const cacheKey = `cards-by-set-code-${setCode}`;
        const cached = getCached<CardType[]>(cacheKey);
        if (cached) return cached;

        try {
            let nextUrl: string | null = `https://api.scryfall.com/cards/search?q=set%3A${setCode}&order=name`;
            const cards: CardType[] = [];

            while (nextUrl) {
                const response: Response = await directFetch(nextUrl);
                if (!response.ok) {
                    nextUrl = null;
                    break;
                }

                const data: {
                    data: RawCardType[];
                    has_more?: boolean;
                    next_page?: string;
                } = await response.json();
                const pageCards: CardType[] = data.data
                    .filter((card: RawCardType) => card.image_uris)
                    .map((card: RawCardType) => ({
                        name: card.name,
                        released_at: card.released_at,
                        image_uris: {
                            small: card.image_uris?.small || '',
                            large: card.image_uris?.large || '',
                            normal: card.image_uris?.normal || '',
                            art_crop: card.image_uris?.art_crop || '',
                        },
                        mana_cost: card.mana_cost,
                        oracle_text: card.oracle_text,
                        type_line: card.type_line,
                        color_identity: card.color_identity,
                        artist: card.artist,
                        set_name: card.set_name,
                        power: card.power,
                        toughness: card.toughness,
                        flavor_text: card.flavor_text,
                    }));

                cards.push(...pageCards);
                if (data.has_more && data.next_page) {
                    nextUrl = data.next_page;
                } else {
                    nextUrl = null;
                }
            }

            setCache(cacheKey, cards);
            return cards;
        } catch {
            return [];
        }
    }
}
