import { MainPage } from './components/pages/mainpage';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';

export const App = () => {
    return (
        <div>
            <Header />
            <MainPage />
            <Footer />
        </div>
    );
};
