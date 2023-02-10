import { FetchCardDetail } from '../fetchcarddetail/fetchcarddetail';
import { createPortal } from 'react-dom';
export const Modal = ({ closeModal }: any) => {
    const handleSetShowModal = (value: boolean) => {
        closeModal(value);
    };

    return (
        <div className="Modal">
            <div className="Modal__background">
                <div className="Modal__container">
                    <FetchCardDetail setShowModal={handleSetShowModal} />
                </div>
            </div>
        </div>
    );
};
