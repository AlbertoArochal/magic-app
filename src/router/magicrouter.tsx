import { Route, Routes, Navigate } from 'react-router-dom';
import { ProfilePage } from '../components/pages/profilepage';
import { App } from '../App';
import { YearsPage } from '../components/pages/yearspage';
import { CataloguePage } from '../components/pages/cataloguepage';

export const MagicRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/years" element={<YearsPage />} />
            <Route path="/catalogue" element={<CataloguePage />} />
        </Routes>
    );
};
