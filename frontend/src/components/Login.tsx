
import { Link } from "react-router-dom";
import React from "react";

const Login = () => {

    const emailValue = React.createRef<HTMLInputElement>();
    const passwordValue = React.createRef<HTMLInputElement>();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        console.log("Email Value --->", emailValue.current?.value);
        console.log("Password Value --->", passwordValue.current?.value);
    }

    return (
        <>
            <div className="flex justify-center items-center w-full h-screen">

                <div className="w-full max-w-xs mx-2" style={{ fontFamily: "PTSans" }}>
                    <form className="bg-white shadow-md rounded px-5 md:px-8 pt-3 md:pt-6 pb-4 md:pb-8 mb-4" onSubmit={handleSubmit}>
                        <div className="flex justify-center items-center">
                            <h1 className="text-3xl text-gray-700 mb-5">Login</h1>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" ref={emailValue} />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="**********" ref={passwordValue} />
                            {/* <p className="text-red-500 text-xs italic hidden">Please choose a password.</p> */}
                        </div>
                        <div className="flex justify-center items-center mb-5">
                            <p>Don't have an account? <span className="text-red-500"><Link to={'/signup'}>Create One </Link></span></p>
                        </div>
                        <div className="flex items-center justify-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Log In
                            </button>
                            {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                Forgot Password?
                            </a> */}
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

export default Login;