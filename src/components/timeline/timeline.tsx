import { Fade } from 'react-awesome-reveal';
import { useCards } from '../../hooks/logdelete/useCards';
import { Suspense, lazy, useEffect, useState, useCallback, useRef } from 'react';
const YearCard = lazy(() => import('../yearcards/yearcards'));

interface Props {
    year: number;
}

export const Timeline: React.FC<Props> = ({ year }) => {
    const { GetSets } = useCards();
    const currentYear = new Date().getFullYear();
    const [activeYear, setActiveYear] = useState<number>(currentYear);
    const [showNav, setShowNav] = useState<boolean>(false);
    const timelineRef = useRef<HTMLElement>(null);

    useEffect(() => {
        GetSets();
    }, []);

    const years: number[] = [];
    for (let i = currentYear; i >= year; i--) {
        years.push(i);
    }

    const scrollToYear = useCallback((targetYear: number) => {
        const element = document.getElementById(`year-${targetYear}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setActiveYear(targetYear);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            // Check if timeline section is in view to show/hide nav
            // Only show nav when we've scrolled past the intro section
            if (timelineRef.current) {
                const rect = timelineRef.current.getBoundingClientRect();
                // Show nav only when timeline top is above 30% of viewport
                const isVisible = rect.top < window.innerHeight * 0.3;
                setShowNav(isVisible);
            }

            // Update active year
            const yearElements = years.map((y) => ({
                year: y,
                element: document.getElementById(`year-${y}`),
            }));

            for (const { year: y, element } of yearElements) {
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                        setActiveYear(y);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, [years]);

    return (
        <section className="timeline" ref={timelineRef}>
            {/* Year navigation sidebar - only visible when timeline is in view */}
            <nav className={`timeline__nav ${showNav ? 'timeline__nav--visible' : ''}`}>
                <div className="timeline__nav-container">
                    <h3 className="timeline__nav-title">YEARS</h3>
                    <ul className="timeline__nav-list">
                        {years.map((y) => (
                            <li key={`nav-${y}`} className="timeline__nav-item">
                                <button
                                    className={`timeline__nav-button ${
                                        activeYear === y ? 'active' : ''
                                    }`}
                                    onClick={() => scrollToYear(y)}
                                    aria-label={`Go to year ${y}`}
                                >
                                    {y}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Timeline content */}
            <div className="timeline__wrapper">
                {/* Central line */}
                <div className="timeline__line" />

                {/* Year entries */}
                <div className="timeline__entries">
                    {years.map((y, index) => (
                        <Fade
                            duration={800}
                            delay={100}
                            triggerOnce
                            key={y.toString() + 'Fade'}
                        >
                            <div
                                id={`year-${y}`}
                                className={`timeline__entry ${
                                    index % 2 === 0
                                        ? 'timeline__entry--left'
                                        : 'timeline__entry--right'
                                }`}
                            >
                                {/* Dot on the line */}
                                <div className="timeline__dot">
                                    <span className="timeline__dot-year">
                                        {y}
                                    </span>
                                </div>

                                {/* Connector line */}
                                <div className="timeline__connector" />

                                {/* Card */}
                                <div className="timeline__card-wrapper">
                                    <Suspense
                                        fallback={
                                            <div className="timeline__loading">
                                                Loading...
                                            </div>
                                        }
                                    >
                                        <YearCard year={y.toString()} />
                                    </Suspense>
                                </div>
                            </div>
                        </Fade>
                    ))}
                </div>
            </div>
        </section>
    );
};
