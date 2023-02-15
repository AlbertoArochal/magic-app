import { FetchCardDetail } from '../fetchcarddetail/fetchcarddetail';
type ModalProps = {
    closeModal: (value: boolean) => void;
};
export const Modal = ({ closeModal }: ModalProps) => {
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
