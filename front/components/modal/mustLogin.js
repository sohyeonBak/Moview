import React, { useCallback } from 'react';
import Modal from '../../style/modal.module.scss'
import Link from 'next/link';

const MustLogin = ({setLoginModal}) => {

  const onCancelModal = useCallback(() => {
    setLoginModal(false)
  },[setLoginModal])

  return(
    <div className={Modal.BackGrond}>
      <div className={Modal.Alret}>
        <p>로그인이 필요합니다.</p>
        <ul>
          <li onClick={onCancelModal}> 취소 </li>
          <li> 
            <Link href="/login">
              <a>로그인 페이지로 이동</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MustLogin;