import React, { useCallback } from 'react';
import Modal from '../../style/modal.module.scss'
import { useDispatch } from 'react-redux';
import { logoutRequestAction } from '../../reducers/user';

const ModalLogout = ({setAlretLogout}) => {
  const dispatch = useDispatch()
  const onLogOutCancelModal = useCallback(() => {
    setAlretLogout(false)
  },[setAlretLogout])

  const onLogOutModal = useCallback(()=>{
    setAlretLogout(false)
    dispatch(logoutRequestAction())
  },[setAlretLogout])

  return(
    <div className={Modal.BackGrond}>
      <div className={Modal.Alret}>
        <p>로그아웃을 하시겠습니까?</p>
        <ul>
          <li onClick={onLogOutCancelModal}> 취소 </li>
          <li onClick={onLogOutModal} className={Modal.logout}> 확인</li>
        </ul>
      </div>
    </div>
  )
}

export default ModalLogout;