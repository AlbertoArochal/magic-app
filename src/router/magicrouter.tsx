import { Route, Routes, Navigate } from 'react-router-dom';
import { ProfilePage } from '../components/pages/profilepage';
import { App } from '../App';

export const MagicRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
