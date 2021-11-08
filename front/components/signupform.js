import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';
import Router from 'next/router'
import SignUp from '../style/signup.module.scss';
import userInput from '../hooks/useinput';

const SignUpForm = () => {
    const [email, setEmail] = userInput('');
    const [nickname, setNickname] = userInput('');
    const [password, setPassword] = userInput('');
    const [checkPassword, setCheckedPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('')
    
    const onConfirmPassword = useCallback((e)=>{
        setCheckedPassword(e.target.value)
        setErrorPassword(e.target.value !== password)
    },[password])
    
    const dispatch = useDispatch();
    const {signUpDone} = useSelector((state)=>state.user);

    useEffect(()=>{
        if(signUpDone){
            Router.replace('/login')
        }
    },[signUpDone])

    const onSignUp = useCallback((e)=>{
        e.preventDefault()
        if (password !== checkPassword) {
            return setErrorPassword(true);
        }
        console.log(email, nickname, password )
        dispatch({
            type : SIGN_UP_REQUEST,
            data: { email, nickname, password }
        })
    },[email, nickname, password, checkPassword])

    return(
        <div className={SignUp.SignUp}>
        <form>
            <div className={SignUp.signupzone}>
            
                <label>ID</label>
                <br />
                <input type="email" value={email} onChange={setEmail} />    
            
            
                <label>Nick-Name</label>
                <br />
                <input type="text" value={nickname} onChange={setNickname} />    
            
            
                <label>Password</label>
                <br />
                <input type="password" value={password} onChange={setPassword} />    
            
            
                <label>Confirmed Password</label>
                <br />
                <input type="password" value={checkPassword} onChange={onConfirmPassword} />    
            
                {errorPassword && <p>비밀번호가 일치하지 않습니다.</p>}
                <div className={SignUp.signupconfirm}>
                    <button onClick={onSignUp} >확인</button>
                </div>
            </div>  
            
        </form>
          
        </div>   
    );}

export default SignUpForm;