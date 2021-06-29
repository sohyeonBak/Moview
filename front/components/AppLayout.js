import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Header from '../style/header.module.scss';
import Content from '../style/contents.module.scss';
import Router from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const AppLayout = ({children}) => {
    const { me, logOutDone } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    
    const goHome = useCallback(()=>{
        Router.push('/')
    },[])

    const onLogout = useCallback(()=>{
        dispatch(logoutRequestAction())
    },[])

    useEffect(()=>{
        if(logOutDone){
            Router.push('/')
        }
    },[])

    return(
        <>
            <header className={Header.allheader}>
                <div className={Header.layout}>
                    <div className={Header.header}>
                        <div className={Header.homebtn}>
                            <h1>
                                <a onClick={goHome}>MOVIEW</a>
                            </h1>
                        </div>
                        <div className={Header.searchcon}>
                            <form>
                                <input type="text" placeholder="찾으시는 영화 제목을 입력하세요." />
                                <button>
                                    <span className="material-icons">search</span>
                                </button>
                            </form>
                        </div>
                        {me 
                        ? (<ul className={Header.menubtns}>
                            <li>
                                <a onClick={onLogout}>로그아웃</a>
                            </li>
                            <li className={Header.review}>
                                <Link href="/editreview">
                                    <a>
                                        <span className="material-icons">add_circle_outline</span>
                                    </a>
                                </Link>
                            </li>
                            <li className={Header.mypage} >
                                <Link href="/mypage">
                                    <a >
                                        <span className={`material-icons ${Header.outlined}`}>account_circle</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>)
                        : (<ul className={Header.menubtns}>
                            <li className={Header.login} >
                                <Link href="/login">
                                    <a>로그인</a>
                                </Link>
                            </li>
                        </ul>)
                        }
                    </div>
                </div>
            </header>      
            <section>
                <div className={Content.allcontents}>
                    {children}
                </div>
            </section>
        </>  
    )
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };


export default AppLayout;