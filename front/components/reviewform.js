import React, { useCallback, useState, useRef, useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from '../reducers/card';
import Edit from '../style/editform.module.scss';
import StarsForm from './starsform';

const ReviewForm = () => {
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [ imagePath, setImagePath ] = useState(false);
    const [ rating, setRating ] = useState(0);
    const [ hoverRating, setHoverRating ] = useState(0);
    const imageRef = useRef()
    
    
    const { me } = useSelector((state) => state.user);
    const { addCardDone } = useSelector((state)=> state.card);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(addCardDone){
            Router.replace('/')
        }
    },[addCardDone])

    const onChangeTitle = useCallback((e)=> {
        setTitle(e.target.value)
    },[])

    const onChangeContent = useCallback((e) => {
        setContent(e.target.value)
    },[])

    const onImageFile = useCallback(()=>{
        console.log('hi')
    },[])

    const onPickImage = useCallback((e)=>{
        e.preventDefault()
        setImagePath(true)
        imageRef.current.click();
    },[])

    const onHoverStar = (index) => setHoverRating(index)
    const onLeaveStar = () => setHoverRating(0);
    const onClickStar = useCallback((index) => {
        setRating(index)
        console.log(index)
    },[setRating]);

    const onCardUpload = useCallback((e)=>{
        e.preventDefault();
        dispatch(addCard({title, content, User : {id : me.id}, star: rating}))
        
    },[title, content, me, rating])
    
    
    return(
        <div>
            <div className={Edit.editform}>
                <div className={Edit.editcon} >
                    <input type="text" className={Edit.edittitle} placeholder="제목" value={title} onChange={onChangeTitle} />
                    <textarea placeholder="리뷰 내용을 입력해주세요" value={content} onChange={onChangeContent} />
                    <input type="file" className={Edit.editfile} ref={imageRef} onClick={onImageFile} />
                    <button className={Edit.editfilebtn} onClick={onPickImage}>
                        <span className="material-icons">folder_open</span>
                        업로드할 이미지를 선택해주세요
                    </button>
                </div>
                {imagePath&&<div className={Edit.roadimage}>
                    <img src="" alt="" />
                    <button>제거</button>
                </div>}
                <p>별점을 채워주세요.</p>
                <div className={Edit.starzone}>
                    <div className={Edit.starline}>
                        {[1, 2, 3, 4, 5].map((inx) => {
                            return (
                                <StarsForm 
                                    index={inx}
                                    rating={rating}
                                    hoverRating={hoverRating}
                                    onHoverStar={onHoverStar}
                                    onLeaveStar={onLeaveStar}
                                    onClickStar={onClickStar}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={Edit.finalbtn}>

            <button onClick={onCardUpload}>
                <a>업로드</a>
            </button>
            </div>
        </div>        
    );}

export default ReviewForm;