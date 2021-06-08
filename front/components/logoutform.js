import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const LogoutForm = () => {
    const dispatch = useDispatch()
    
    const onLogout = useCallback(()=>{
        dispatch(logoutRequestAction(null))
    },[])
    
    return(
        <a onClick={onLogout}>로그아웃</a>        
    );}

export default LogoutForm;