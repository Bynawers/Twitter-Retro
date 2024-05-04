import React from 'react';
import twitterConfig from '../../../../twitterConfig.json';

const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL
  : twitterConfig.BASE_URL_ONLINE;
const UserListItem = ({ handleFunction , user }) => {
    return (
        <div className="flex" onClick={handleFunction}>
           <img src={`${BASE_URL}/images/profile/${user._id}`} className="w-12 h-12 bg-gray-400 rounded-full" />
            <div className='flex-col'>
                <div>{user.fullName}</div>
                <div>{user.tag}</div>
            </div>
            

            
        </div>
    );
};

export default UserListItem;