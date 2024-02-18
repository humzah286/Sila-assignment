import { useState } from "react";

type ModalProps = {
    title: string;
    message: string;
    type: string;
    open: boolean;
    setOpen: Function
};

const Modal: React.FC<ModalProps> = ({ title, message, type, open, setOpen }) => {


    const [close, setClose] = useState(false);

    if (!open || close) return <></>;

    const handleClose = async () => {
        setClose(false);
        setOpen(false);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" onClick={handleClose}>
            <div className="w-52 h-52 bg-red-400">
                <h2>{title}</h2>
                <p>{message}</p>
            </div>

        </div>
    )
}

export default Modal;
