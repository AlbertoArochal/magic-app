import { Slide } from 'react-awesome-reveal';
import { YearCard } from '../yearcards/yearcards';
import { useCards } from '../hooks/logdelete/useCards';
import { useEffect } from 'react';

export const Timeline = () => {
    const { GetSets } = useCards();

    useEffect(() => {
        GetSets();
    }, []);

    const years = [];
    for (let i = 1993; i <= 2023; i++) {
        years.push(i);
    }
    let toggle = 'right';

    return (
        <section className="timeline">
            <div
                className="container container__timeline"
                key={new Date().getTime().toString + 'container'}
            >
                <div
                    className="timeline__item"
                    key={new Date().getTime().toString + 'timeline__item'}
                >
                    {years.map((year) => (
                        <Slide
                            duration={1000}
                            direction={
                                (toggle = toggle === 'right' ? 'left' : 'right')
                            }
                            key={year.toString() + 'Slide'}
                        >
                            <div
                                className="timeline__img"
                                key={year.toString() + 'Div'}
                            ></div>
                            <YearCard year={year.toString()} />
                        </Slide>
                    ))}
                </div>
            </div>
        </section>
    );
};
