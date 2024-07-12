import { getCurrentUser } from '@/services/getCurrentUser';
import React from 'react'
import UserMenue from './NavBar/UserMenue';

const UserDrop = async() => {
    const currentUser = await getCurrentUser();  
  return (
    <UserMenue currentUser={currentUser} />

  )
}

export default UserDrop