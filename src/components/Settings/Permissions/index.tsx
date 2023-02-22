import React from 'react'

import DispatcherPermissions from './Dispatcher'


const Permissions = () => {
    return (
        <div className="p-4 space-y-6 bg-gray-50 dark:bg-gray-800  border border-gray-100 rounded-xl divide-y divide-gray-200 dark:divide-gray-700 dark:bg-theme">
            <DispatcherPermissions />
        </div>
    )
}

export default Permissions