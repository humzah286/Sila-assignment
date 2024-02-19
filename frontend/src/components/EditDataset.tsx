import { useRef, useState } from "react";
import axios from "axios";
import Modal from "./Modal";

const EditDataset = () => {

    const title = useRef('');
    const message = useRef('');
    const type = useRef('');

    const [openModal, setModalOpen] = useState(false);

    const [pid, setPid] = useState<string>('')
    const [userID, setUserID] = useState<string>('')
    const [rating, setRating] = useState<string>('')

    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        axios({
            method: 'post',
            url: `${import.meta.env.VITE_BACKEND_URL}/api/data/add-rating`,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            data: {
                item: pid,
                user: userID,
                rating: parseInt(rating)
            }
        }).then((res) => {
            console.log("res in editdataset: ", res.data)
            title.current = "Success";
            message.current = "Rating added successfully";
            type.current = "success";
            setModalOpen(true);
            
        }).catch((err) => {
            if (err.response) {
                if (err.response.data.message == "invalid JWT tokens") {
                    title.current = "Failed";
                    message.current = "Please login again";
                    type.current = "failed";
                    setModalOpen(true);
                    return;
                } 

                console.log("err in editdataset: ", err.response.data)
                title.current = "Failed";
                message.current = "Failed to add rating";
                type.current = "failed";
                setModalOpen(true);
            }
        })
    }

    return (
        <>
            <Modal title={title.current} message={message.current} type={type.current} open={openModal} setOpen={setModalOpen} />
            <div className="flex flex-col justify-center gap-6 mb-10" style={{ fontFamily: "PTSans" }} id="ratings">
                <h1 className="font-bold md:text-3xl mb-4 px-2">Give Rating</h1>

                <p className="px-2">In this section you can add a rating for a product.</p>

                <div>
                    <form className="bg-white shadow-md rounded px-5 md:px-8 pt-3 md:pt-6 pb-4 md:pb-8 mb-4 w-full max-w-lg" style={{ fontFamily: "PTSans" }} onSubmit={handleSubmit}>
                        <div className="flex justify-center items-center">
                            <h1 className="text-3xl text-gray-700 mb-7">Add Rating</h1>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Product ID
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="B001EY6ULY..." onChange={(e) => { setPid(e.target.value) }} />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    User ID
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="A2IAQ0HHDIV9FZ" onChange={(e) => { setUserID(e.target.value) }} />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                                    Your Rating
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-email" type="number" placeholder="1-5" min="1" max="5" onChange={(e) => { setRating(e.target.value) }} />
                            </div>
                        </div>


                        <div className="flex items-center justify-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Add Rating
                            </button>
                        </div>
                    </form>

                </div>

            </div>
        </>
    )
}

export default EditDataset;