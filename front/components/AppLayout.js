import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Header from '../style/header.module.scss';
import Content from '../style/contents.module.scss';
import Router from 'next/router';
import MustLogin from './modal/mustLogin';
import ModalLogout from './modal/modalLogout';

import { useSelector } from 'react-redux';


const AppLayout = ({children, loginModal, setLoginModal}) => {
    const [alretLogout, setAlretLogout] = useState(false)
    const { me, logOutDone } = useSelector((state) => state.user);
    
    const goHome = useCallback(()=>{
        Router.push('/')
    },[])

    const onLogout = useCallback(()=>{
        setAlretLogout(true)
    },[setAlretLogout])

    useEffect(()=>{
        if(logOutDone){
            Router.push('/')
        }
    },[])

    return(
        <>
            {loginModal?<MustLogin setLoginModal={setLoginModal}/>:''}
            {alretLogout?<ModalLogout setAlretLogout={setAlretLogout}/>:''}
            <header className={Header.Header}>
                <div className={Header.Layout}>
                    <div className={Header.Homebtn}>
                        <h1>
                            <a onClick={goHome}>Cliche</a>
                        </h1>
                    </div>
                    <div className={Header.MenuList}>
                    {me 
                    ? (<ul className={Header.Menubtns}>
                        <li>
                            <a onClick={onLogout}>Logout</a>
                        </li>
                        <li className={Header.review}>
                            <Link href="/editreview">
                                <a><span className="material-icons">add_circle_outline</span></a>
                            </Link>
                        </li>
                        <li className={Header.mypage} >
                            <Link href="/mypage">
                                <a ><span className={`material-icons`}>account_circle</span></a>
                            </Link>
                        </li>
                    </ul>)
                    : (<ul className={Header.Menubtns}>
                        <li className={Header.login} >
                            <Link href="/login">
                                <a>Login</a>
                            </Link>
                        </li>
                    </ul>)
                    }
                    </div>
        
                </div>
            </header>      
            <section>
                <div className={Content.Contents}>
                    <div className={Content.Layout}>
                        {children}
                    </div>
                </div>
            </section>
        </>  
    )
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };


export default AppLayout;