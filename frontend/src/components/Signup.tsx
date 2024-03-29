
import { Link } from 'react-router-dom';
import { COUNTRIES } from '../helper/static';

import Modal from './Modal'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../globalRedux/store';

import { createUser } from '../globalRedux/features/user/user';

const Signup: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const res = useSelector((state: RootState) => { return state.user });

    const title = useRef('');
    const message = useRef('');
    const type = useRef('');

    const dispatched = useRef(false);

    const [openModal, setModalOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("firstName: ", firstName)
        console.log("lastName: ", lastName)
        console.log("email: ", email)
        console.log("country: ", country)
        console.log("password: ", password)
        console.log("confirmPassword: ", confirmPassword)

        if (firstName.trim() === '' || email.trim() === '' || country === '' || password.trim() === '' || confirmPassword.trim() === '' || country == 'Select Country') {
            title.current = 'Error';
            message.current = 'All fields are required';
            type.current = 'error';
            setModalOpen(true);
            return;
        }

        if (password.length < 8) {
            title.current = 'Error';
            message.current = 'Password should be at least 8 characters';
            type.current = 'error';
            setModalOpen(true);
            return;
        }

        if (password.trim() !== confirmPassword.trim()) {
            title.current = 'Error';
            message.current = 'Password and Confirm Password do not match';
            type.current = 'error';
            setModalOpen(true);
            return;
        }

        console.log("dispatching")
        dispatched.current = true;
        dispatch(createUser({ name: firstName + ' ' + lastName, email: email, country: country, password: password }))
    }

    useEffect(() => {
        if (!dispatched.current)
            return

        if (res.status === 'loading') {
            setLoading(true);
        } else if (res.status === 'success') {
            dispatched.current = false;
            window.location.href = '/';
        } else if (res.status === 'failed') {
            title.current = 'Error';
            message.current = res.message;
            type.current = 'error';
            setModalOpen(true);
        }

    }, [res])


    return (
        <>
            <Modal title={title.current} message={message.current} type={type.current} open={openModal} setOpen={setModalOpen} />
            {loading &&
                <div className="bg-red-400 p-5 rounded-lg">
                    <h1 className="text-center text-2xl">Loading...</h1>
                </div>
            }
            <div className="flex justify-center items-center w-full h-screen">
                <div className='mx-2'>

                    <form className="bg-white shadow-md rounded px-5 md:px-8 pt-3 md:pt-6 pb-4 md:pb-8 mb-4 w-full max-w-lg" style={{ fontFamily: "PTSans" }} onSubmit={handleSubmit}>
                        <div className="flex justify-center items-center">
                            <h1 className="text-3xl text-gray-700 mb-7">Signup</h1>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    First Name
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" onChange={(e) => {setFirstName(e.target.value)}}/>
                                {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Last Name
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" onChange={(e) => {setLastName(e.target.value)}}/>
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                                    Email
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-email" type="email" placeholder="email@example.com" onChange={(e) => {setEmail(e.target.value)}} />
                                {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-country">
                                    Country
                                </label>
                                <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" onChange={(e) => {setCountry(e.target.value)}}>
                                    <option value="">Select Country</option>
                                    {
                                        COUNTRIES.map((country: string, index: number) => {
                                            return <option key={index} value={country}>{country}</option>
                                            // console.log(country, index)
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Password
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="password" placeholder="password" onChange={(e) => {setPassword(e.target.value)}}/>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Confirm Password
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="password" placeholder="confirm password" onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                            </div>
                        </div>

                        {/* <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Password
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="*********" />
                        <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                            City
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                            State
                        </label>
                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option>New Mexico</option>
                                <option>Missouri</option>
                                <option>Texas</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                            Zip
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
                    </div>
                </div> */}

                        <div className="flex justify-center items-center mb-5">
                            <p>Already have an account? <span className="text-red-500"><Link to={'/login'}>Login </Link></span></p>
                        </div>


                        <div className="flex items-center justify-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Sign up
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                        &copy; All rights reserved.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Signup;