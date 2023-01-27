import { MainPage } from './components/pages/mainpage';
import { Footer } from './components/footer/footer';
import { UserProvider } from './context/usercontext';
export const App = () => {
    return (
        <div>
            <UserProvider>
                <MainPage />
                <Footer />
            </UserProvider>
        </div>
    );
};
