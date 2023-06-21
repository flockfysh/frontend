import UserInfo from '@/components/specific/profile/userInfo/userInfo';
import DatasetsOwned from '@/components/specific/profile/datasetsOwned/datasetsOwned';
import MarketplaceNavbar from '@/components/specific/marketplace/navbar';
import classes from './profile.module.css';
import { useContext } from 'react';
import { UserContext } from '@/contexts/userContext';


const Profile = () => {

   return ( 
     <div className={ classes.container }>
        <MarketplaceNavbar/>
        <UserInfo 
        followers={ 2000 }
        following={ 232 }
        name="User One"
        userName="userOne"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
        <DatasetsOwned />
     </div>
   );
};

export default Profile;
