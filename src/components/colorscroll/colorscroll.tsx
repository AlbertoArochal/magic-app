import { CardContext } from '../../contexts/cards/cardcontext';
import { useContext } from 'react';
import blue from '../../assets/img/blue.jpeg';
import black from '../../assets/img/black.jpeg';
import green from '../../assets/img/green.jpeg';
import red from '../../assets/img/red.jpeg';
import white from '../../assets/img/white.jpeg';
export const ColorScroll = () => {
    const colors = ['U', 'W', 'G', 'B', 'R'];
    const colorMap: any = {
        U: <img src={blue} alt="blue icon" className="ColorScroll__title" />,
        W: <img src={white} alt="white icon" className="ColorScroll__title" />,
        G: <img src={green} alt="green icon" className="ColorScroll__title" />,
        B: <img src={black} alt="black icon" className="ColorScroll__title" />,
        R: <img src={red} alt="red color" className="ColorScroll__title" />,
    };
    const { cards } = useContext(CardContext);
    if (!cards) {
        return null;
    }
    const image = { card: cards[0].image_uris.art_crop, name: cards[0].name };
    return (
        <div className="ColorScroll__container">
            {colors.map((color, index) => {
                const selectedCard = cards.find(
                    (card) =>
                        card.color_identity[0] === color &&
                        card.type_line.includes('Creature')
                );
                if (!selectedCard) {
                    return null;
                }
                return (
                    <>
                        <img
                            src={selectedCard.image_uris.art_crop}
                            alt={image.name}
                            className="ColorScroll__button"
                        />
                        {colorMap[color] || null}
                    </>
                );
            })}
        </div>
    );
};
