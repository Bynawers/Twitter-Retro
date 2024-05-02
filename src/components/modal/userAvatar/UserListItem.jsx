import React from 'react';

const UserListItem = ({ handleFunction , user }) => {
    return (
        <div className="flex" onClick={handleFunction}>
            <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
            <div className='flex-col'>
                <div>{user.fullName}</div>
                <div>{user.tag}</div>
            </div>
            

            
        </div>
    );
};

export default UserListItem;