import { Header } from '../header/header';
import fivecolors from '../../assets/img/fivecolors.png';
import { Timeline } from '../timeline/timeline';
import Eye from '../../assets/img/eye.png';
export const MainPage = () => {
    return (
        <>
            <Header />
            <div className="Mainpage">
                <div className="Intro__container">
                    <div className="Intro">
                        <div className="Intro__left">
                            <div className="Intro__title">
                                <h1 className="Intro__h1">
                                    WHERE <p className="Intro__p"> Magic</p>{' '}
                                    <br />{' '}
                                </h1>{' '}
                            </div>
                            <img src={fivecolors} alt="five colors icons" />{' '}
                            <br />
                            <h2 className="Intro__subtitle">TURN BACK TIME</h2>
                            <div className="Intro__article">
                                <h2 className="Intro__text">
                                    it was cool in the
                                </h2>
                            </div>
                        </div>
                        <div className="Intro__right">
                            <img
                                src={Eye}
                                alt="Eye of wisdom card img"
                                className="right__img"
                            />
                            <button>Sign Up Now {'>'}</button>
                        </div>
                    </div>
                </div>
                <Timeline />
            </div>
        </>
    );
};
