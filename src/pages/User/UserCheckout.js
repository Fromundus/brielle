import React from 'react'

function UserCheckout() {
    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='pt-14 mb-20 min-h-screen px-4 lg:px-40'>
            UserCheckout
        </div>
    )
}

export default UserCheckout