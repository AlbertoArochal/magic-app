import { CardContext } from '../../contexts/cards/cardcontext';
import { useContext } from 'react';
import { useCards } from '../../hooks/logdelete/useCards';
import blue from '../../assets/img/blue.jpeg';
import black from '../../assets/img/black.jpeg';
import green from '../../assets/img/green.jpeg';
import red from '../../assets/img/red.jpeg';
import white from '../../assets/img/white.jpeg';
import { useNavigate, Link } from 'react-router-dom';

export const ColorScroll = () => {
    const { GetByYearAndColor } = useCards();
    const colors = ['U', 'W', 'G', 'B', 'R'];
    const navigate = useNavigate();

    const colorMap: Record<string, JSX.Element> = {
        U: <img src={blue} alt="blue icon" className="ColorScroll__title" />,
        W: <img src={white} alt="white icon" className="ColorScroll__title" />,
        G: <img src={green} alt="green icon" className="ColorScroll__title" />,
        B: <img src={black} alt="black icon" className="ColorScroll__title" />,
        R: <img src={red} alt="red color" className="ColorScroll__title" />,
    };
    const { cards } = useContext(CardContext);
    const GetByColorHandler = (year: number, color: string) => {
        GetByYearAndColor(year, color).then(() => {
            navigate('/catalogue');
        });
    };

    const year = cards[0].released_at.slice(0, 4);

    const image = { card: cards[0].image_uris.art_crop, name: cards[0].name };
    return (
        <div
            className="ColorScroll__container"
            key={
                new Date().getTime().toString +
                'Div' +
                'ColorScroll' +
                'Div' +
                new Date().getTime().toString
            }
        >
            {colors.map((color) => {
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
                        <Link
                            to="/catalogue"
                            key={
                                new Date().getTime().toString +
                                'link' +
                                color +
                                'link' +
                                new Date().getTime().toString
                            }
                        >
                            <img
                                src={selectedCard.image_uris.art_crop}
                                alt={image.name}
                                className="ColorScroll__button"
                                onClick={() => GetByColorHandler(+year, color)}
                                key={
                                    new Date().getTime().toString +
                                    'img' +
                                    color +
                                    'img' +
                                    new Date().getTime().toString
                                }
                            />
                        </Link>

                        {colorMap[color] || null}
                    </>
                );
            })}
        </div>
    );
};
