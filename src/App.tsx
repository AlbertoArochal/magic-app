import { MainPage } from './components/pages/mainpage';
import { Footer } from './components/footer/footer';
import { UserProvider } from './contexts/user/provider';
import { CardProvider } from './contexts/cards/cardprovider';

export const App = () => {
    return (
        <div>
            <UserProvider>
                <CardProvider>
                    <MainPage />
                    <Footer />
                </CardProvider>
            </UserProvider>
        </div>
    );
};
