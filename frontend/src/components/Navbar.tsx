import React, { useEffect, useState } from 'react';
import { XMarkIcon, Bars3Icon, UserCircleIcon } from '@heroicons/react/20/solid';
import AmazonLogo from '/amazon-logo2.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../globalRedux/store';
import { getUser } from '../globalRedux/features/user/user';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const res = useSelector((state: RootState) => { return state.user });

    const Options = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Edit Dataset', href: '/services' },
    ]

    useEffect(() => { 
        dispatch(getUser()) 
    }, [])

    useEffect(() => {
        
    }, [res])

    return (

        <nav className='text-NavbarTextColor bg-NavbarColor ' style={{ fontFamily: 'PTSans' }}>
            <div className="flex justify-between md:justify-around px-5 md:px-8 py-4">
                <div className="flex justify-center items-center text-white gap-4 lg:gap-6">
                    <img src={AmazonLogo} alt="" className='w-8 h-8 border-white text-white' />
                    <h1 className='text-[1.25rem] md:text-[1.5rem] text-center mb-[1px] md:mb-[3px]'>Amazon Data Analysis</h1>
                </div>

                <div className="hidden md:flex justify-center items-center gap-5 lg:gap-10">
                    {Options.map((option, index) => (
                        <div>
                            {/* <a key={index} href={option.href} className="hover:text-gray-300">{option.name}</a> */}
                            <Link to={option.href} className="hover:text-gray-300" key={index}>{option.name}</Link>
                        </div>
                    ))}

                </div>

                <div className='hidden md:flex justify-center gap-3 md:ml-6'>
                    {res.name == "" ? <><div className="flex justify-center items-center">
                        <Link to={'/login'}><button className="text-white bg-SecondaryColor border-2 border-SecondaryColor px-1 py-1 rounded-lg w-24 font-bold">Login</button></Link>
                    </div>
                    <div className="flex justify-center items-center">
                        <Link to={'/signup'}><button className="text-SecondaryColor bg-NavbarColor border-2 border-SecondaryColor px-3 py-1 rounded-lg w-24 font-bold">Sign Up</button></Link>
                    </div></> : 
                    <div className="flex justify-center items-center text-white gap-2">
                        <UserCircleIcon className="h-8 w-8" />    
                        <h1>Hi, {res.name}</h1>
                    </div>}
                </div>

                <div className="flex justify-center items-center md:hidden">
                    <button onClick={() => { isOpen ? setIsOpen(false) : setIsOpen(true) }}>
                        {isOpen ? <XMarkIcon className="h-6 w-6 text-white" /> : <Bars3Icon className="h-6 w-6 text-white" />}
                    </button>
                </div>
            </div>

            {isOpen && <div className="md:hidden">
                <div className=''>
                    <hr className='border-t border-1 border-slate-400 w-full' />
                </div>
                <div className='h-3'></div>
                <div className="flex flex-col px-5 md:px-8">
                    {Options.map((option, index) => (
                        <div className='flex justify-start items-center py-2'>
                            {/* <a key={index} href={option.href} className="hover:text-gray-300">{option.name}</a> */}
                            <Link to={option.href} className="hover:text-gray-300" key={index}>{option.name}</Link>
                        </div>
                    ))}
                </div>

                <div className="flex items-center py-2 px-5 ">
                    <Link to={'/login'}><button className="text-white bg-SecondaryColor border-2 border-SecondaryColor px-1 py-1 rounded-lg w-24 font-bold">Login</button></Link>
                </div>
                <div className="flex items-center py-2 px-5 ">
                    <Link to={'/signup'}><button className="text-SecondaryColor bg-NavbarColor border-2 border-SecondaryColor px-3 py-1 rounded-lg w-24 font-bold">Sign Up</button></Link>
                </div>

                <div className='h-3'></div>
            </div>}
        </nav>
    );
};

export default Navbar;
