
const Modal = (title: string, message: string,  type: string) => {
    return (
        <div className="">
            <h2>{title}</h2>
            <p>{message}</p>
            <button className={type}>Close</button>
        </div>
    )
}

export default Modal;
