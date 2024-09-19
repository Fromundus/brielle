import React from 'react'
import LogoutButton from '../../components/LogoutButton'

function Account() {
    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='min-h-screen pt-14 mb-20 px-4 lg:px-40'>
            <LogoutButton />
        </div>
    )
}

export default Account