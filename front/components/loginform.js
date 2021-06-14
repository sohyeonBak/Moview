import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Login from '../style/login.module.scss';

import { loginRequestAction } from '../reducers/user';
import Router from 'next/router';



const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { logInError } = useSelector((state)=>state.user);

    useEffect(() => {
        if (logInError) {
          alert(logInError);
        }
      }, [logInError]);

      

    const onChangeId = useCallback((e)=>{
        setEmail(e.target.value)
    },[]);

    const onChangePassword = useCallback((e)=>{
        setPassword(e.target.value)
    },[]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch(loginRequestAction({email, password}))
    },[email, password])

    return(
        <>
        <form >
            <div className={Login.loginzone}>
                <label>아이디</label>
                <br />
                <input type="emain" value={email} onChange={onChangeId} />    
            
                <label>비밀번호</label>
                <br />
                <input type="password" value={password} onChange={onChangePassword} />    
            </div>
            <div className={Login.loginconfirm}>
                <Link href="/signup">
                    <a className={Login.signtoup}>회원가입</a>
                </Link>
                <a onClick={onSubmit} className={Login.finallogin}> 확인</a>
            </div> 
        </form>    
        
         
    </>       
    );}

export default LoginForm;