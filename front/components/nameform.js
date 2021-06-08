import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';


const NameForm = (props) => {
    const { me } = useSelector((state)=> state.user)
    const [ nickname, setChangeNickname ] = useState('');
    const dispatch = useDispatch()
    
    const onChangeNickname = useCallback((e)=>{
        setChangeNickname(e.target.value)
    },[])

    const onChangeName = useCallback((e)=>{
        e.preventDefault();
        if(!me){
            window.alert('로그인 후 사용가능합니다.')
        }else{
            dispatch({
                type: CHANGE_NICKNAME_REQUEST,
                data: nickname
            })
            console.log()
        }
    },[nickname])

    return(
        <form>
            <input type="text" value={nickname} onChange={onChangeNickname} />
            <button onClick={onChangeName}>확인</button>
        </form>        
    );}

export default NameForm;