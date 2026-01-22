import { Route, Routes, Navigate } from 'react-router-dom';
import { ProfilePage } from '../components/pages/profilepage';
import { App } from '../components/app/App';
import { YearsPage } from '../components/pages/yearspage';
import { CataloguePage } from '../components/pages/cataloguepage';
import { DeckPage } from '../components/pages/deckpage';
import { AboutPage } from '../components/pages/aboutpage';
import { SecretLairPage } from '../components/pages/secretlairpage';

export const MagicRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/years" element={<YearsPage />} />
            <Route path="/catalogue" element={<CataloguePage />} />
            <Route path="/deck" element={<DeckPage />} />
            <Route path="/secret-lair" element={<SecretLairPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
