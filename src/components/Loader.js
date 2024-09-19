import React from 'react'
import { SyncLoader } from 'react-spinners'

function Loader({ isLoading }) {
    if(!isLoading) return null;

    return (
        <div className='min-h-[70vh] flex items-center'>
            <SyncLoader color='#8B5CF6' />
        </div>
    )
}

export default Loader