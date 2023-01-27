import { Header } from '../header/header';
import fivecolors from '../../assets/img/fivecolors.png';
import { Timeline } from '../timeline/timeline';
import { getSets } from 'scryfall-client/dist/api-routes/sets';
export const MainPage = () => {
    getSets().then((res) => res.map);
    return (
        <>
            <Header />
            <div className="Mainpage">
                <div className="Intro">
                    <div className="Intro__title">
                        <h1 className="Intro__h1">
                            WHERE <p className="Intro__p"> Magic</p> <br />{' '}
                        </h1>{' '}
                    </div>
                    <img src={fivecolors} alt="five colors icons" /> <br />
                    <h2 className="Intro__subtitle">TURN BACK TIME</h2>
                    <div className="Intro__article">
                        <p className="Intro__text">
                            Welcome to the place where you will learn how to
                            play Magic The Gathering they way you first
                            experienced it. Sign Up! it was cool in the 90s!
                        </p>
                    </div>
                    <button>Sign Up Now {'>'}</button>
                </div>
                <Timeline />
            </div>
        </>
    );
};
