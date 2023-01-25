import Necropotence from '../../assets/img/necropotence.jpeg';
import { Slide } from 'react-awesome-reveal';
export const Timeline = () => {
    const years = [];
    for (let i = 1993; i <= 2023; i++) {
        years.push(i);
    }
    let toggle = 'right';
    return (
        <section className="timeline">
            <div className="container" key={'container'}>
                <div className="timeline__item" key={new Date().getTime()}>
                    {years.map((year) => (
                        <>
                            <Slide
                                duration={1000}
                                direction={
                                    (toggle =
                                        toggle === 'right' ? 'left' : 'right')
                                }
                                key={year.toString() + 'Slide'}
                            >
                                <div
                                    className="timeline__img"
                                    key={year.toString() + 'Div'}
                                ></div>

                                <div
                                    className="timeline__content timeline__card"
                                    key={year.toString() + 'Content'}
                                >
                                    <img
                                        className="timeline__image"
                                        src={Necropotence}
                                        alt="necropotence"
                                    />
                                    <h2 className="date">{year}</h2>
                                    <p>
                                        Lorem ipsum dolor sit, amet consectetur
                                        adipisicing elit.
                                    </p>
                                    <div className="button__container">
                                        <button className="bnt-more">
                                            Back to {year} →
                                        </button>
                                    </div>
                                </div>
                            </Slide>
                        </>
                    ))}
                </div>
            </div>
        </section>
    );
};
