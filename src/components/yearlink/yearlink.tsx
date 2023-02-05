import { Link } from 'react-router-dom';

export const YearLink = () => {
    return (
        <Link to="/years" className="year">
            <p className="year">Year</p>
        </Link>
    );
};
