import { Slide } from 'react-awesome-reveal';
import { useCards } from '../hooks/logdelete/useCards';
import { Suspense, lazy, useEffect } from 'react';
const YearCard = lazy(() => import('../yearcards/yearcards'));

interface Props {
    year: number;
}

export const Timeline: React.FC<Props> = ({ year }) => {
    const { GetSets } = useCards();
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        GetSets();
    }, []);

    const years = [];
    for (let i = year; i <= currentYear; i++) {
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
                            <Suspense>
                                <YearCard year={year.toString()} />
                            </Suspense>
                        </Slide>
                    ))}
                </div>
            </div>
        </section>
    );
};
