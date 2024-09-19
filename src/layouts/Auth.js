import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Auth() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-14 min-h-screen flex flex-col items-center">
            <nav className='flex flex-row border-primary border-2 w-[300px] text-center rounded-lg mt-10'>
                <NavLink to="/auth" end className="w-1/2 rounded-lg">
                    {({isActive}) => (isActive ? 
                        <div className='bg-primary p-2 text-white'>
                            Login
                        </div>
                        :
                        <div className='p-2 text-primary'>
                            Login
                        </div>
                    )}
                </NavLink>

                <NavLink to="signup" className="w-1/2 rounded-lg">
                    {({isActive}) => (isActive ? 
                        <div className='bg-primary p-2 text-white'>
                            Signup
                        </div>
                        :
                        <div className='p-2 text-primary'>
                            Signup
                        </div>
                    )}
                </NavLink>
            </nav>
            <Outlet />
        </div>
    )
}

export default Auth