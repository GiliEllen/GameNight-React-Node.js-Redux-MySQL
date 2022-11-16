import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { userSelector } from '../loggedInUser/loggedInUser'
import { useEffect } from 'react';
import { login } from "../loggedInUser/userAPI";
import { useAppDispatch } from './../../app/hooks';


function HomePage() {
  const loggedInUser = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  useEffect(()=> {
    dispatch(login())
  } , [])

  console.log(loggedInUser)
  return (
    <div>HomePage</div>
  )
}

export default HomePage