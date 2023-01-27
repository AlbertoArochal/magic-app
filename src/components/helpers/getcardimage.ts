import scryfall from 'scryfall-client';

export async function getCardImage(): Promise<string> {
    const image = scryfall
        .get('cards/named', {
            exact: 'windfall',
        })
        .then(function (card: any) {
            const img = card.getImage();
            console.log(img);
            return img;
        })
        .then(function (img: any) {
            return img;
        });
    return image;
}
