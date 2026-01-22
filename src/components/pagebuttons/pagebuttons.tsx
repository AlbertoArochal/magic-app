import { useContext } from 'react';
import { CardContext } from '../../contexts/cards/cardcontext';
import { useCards } from '../../hooks/logdelete/useCards';

export const PageButtons = ({ period = 2011 }: { period?: number }) => {
    const { page, paginationInfo, activeFilter, isLoadingPage } = useContext(CardContext);
    const { GetFetchCardsByYear, GetByYearAndColor, GetByYearAndType } = useCards();

    const handlePreviousPage = async () => {
        if (page <= 1 || isLoadingPage) return;
        
        const newPage = page - 1;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Call the appropriate API based on active filter
        if (activeFilter) {
            switch (activeFilter.type) {
                case 'color':
                    await GetByYearAndColor(period, activeFilter.value, newPage);
                    break;
                case 'cardType':
                    await GetByYearAndType(period, activeFilter.value, newPage);
                    break;
                default:
                    await GetFetchCardsByYear(period, newPage);
            }
        } else {
            await GetFetchCardsByYear(period, newPage);
        }
    };

    const handleNextPage = async () => {
        if (!paginationInfo.hasMore || isLoadingPage) return;
        
        const newPage = page + 1;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Call the appropriate API based on active filter
        if (activeFilter) {
            switch (activeFilter.type) {
                case 'color':
                    await GetByYearAndColor(period, activeFilter.value, newPage);
                    break;
                case 'cardType':
                    await GetByYearAndType(period, activeFilter.value, newPage);
                    break;
                default:
                    await GetFetchCardsByYear(period, newPage);
            }
        } else {
            await GetFetchCardsByYear(period, newPage);
        }
    };

    // Calculate total pages (Scryfall returns 175 cards per page)
    const cardsPerPage = 175;
    const totalPages = Math.ceil(paginationInfo.totalCards / cardsPerPage);

    return (
        <div className="Pagebuttons__container">
            <button
                onClick={handlePreviousPage}
                className={`Pagebutton Pagebutton__prev ${page <= 1 ? 'Pagebutton--disabled' : ''}`}
                disabled={page <= 1 || isLoadingPage}
                aria-label="Previous page"
            >
                ← Prev
            </button>
            
            <span className="Pagebuttons__info">
                {isLoadingPage ? (
                    'Loading...'
                ) : (
                    <>
                        Page {page}{totalPages > 0 ? ` of ${totalPages}` : ''}
                        {paginationInfo.totalCards > 0 && (
                            <span className="Pagebuttons__total"> ({paginationInfo.totalCards} cards)</span>
                        )}
                    </>
                )}
            </span>
            
            <button
                onClick={handleNextPage}
                className={`Pagebutton Pagebutton__next ${!paginationInfo.hasMore ? 'Pagebutton--disabled' : ''}`}
                disabled={!paginationInfo.hasMore || isLoadingPage}
                aria-label="Next page"
            >
                Next →
            </button>
        </div>
    );
};
