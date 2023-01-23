import { Header } from '../header/header';
import fivecolors from '../../assets/img/fivecolors.png';
export const MainPage = () => {
    return (
        <>
            <Header />
            <div className="Intro">
                <h1 className="Intro__h1">
                    WHERE <p className="Intro__p"> MAGIC</p> <br />{' '}
                    <img src={fivecolors} alt="five colors icons" /> <br />
                    TURN BACK TIME
                </h1>
                <div className="Intro__article">
                    <p className="Intro__text">
                        Welcome to the place where you will learn how to play
                        Magic The Gathering they way you first experienced it.
                        Sign Up! it was cool in the 90s!
                    </p>
                </div>
                <button>Sign Up Now {'>'}</button>
            </div>
        </>
    );
};
