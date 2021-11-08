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
    const { logInError, logInDone } = useSelector((state)=>state.user);

    useEffect(() => {
        if (logInError) {
          alert(logInError);
        }
      }, [logInError]);

      useEffect(() => {
        if (logInDone) {
          Router.push('/')
        }
      }, [logInDone]);

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
        <div className={Login.Login}>
            <form >
                <div className={Login.loginzone}>
                    <label>ID</label>
                    <br />
                    <input type="emain" value={email} onChange={onChangeId} />    
                
                    <label>Password</label>
                    <br />
                    <input type="password" value={password} onChange={onChangePassword} />    
                    <a onClick={onSubmit} className={Login.finallogin}> 확인</a>
                    <div className={Login.Signup}>
                        <Link href="/signup">
                            <a className={Login.signtoup}>회원가입 하러가기</a>
                        </Link>
                    </div> 
                </div>
                   
            </form>    
            
            
        </div>       
    );}

export default LoginForm;