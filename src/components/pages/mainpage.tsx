import { Header } from '../header/header';
import fivecolors from '../../assets/img/fivecolors.png';
export const MainPage = () => {
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
                    <h2>TURN BACK TIME</h2>
                    <div className="Intro__article">
                        <p className="Intro__text">
                            Welcome to the place where you will learn how to
                            play Magic The Gathering they way you first
                            experienced it. Sign Up! it was cool in the 90s!
                        </p>
                    </div>
                    <button>Sign Up Now {'>'}</button>
                </div>
            </div>
        </>
    );
};
