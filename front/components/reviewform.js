import React, { useCallback, useState, useRef, useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CARD_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGE_REQUEST } from '../reducers/card';
import Edit from '../style/editform.module.scss';
import StarsForm from './starsform';

const ReviewForm = () => {
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [ rating, setRating ] = useState(0);
    const [ hoverRating, setHoverRating ] = useState(0);
    const imageRef = useRef()
    
    const { addCardDone, imagePaths } = useSelector((state)=> state.card);
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

    const onPickImage = useCallback((e)=>{
        e.preventDefault()
        imageRef.current.click();
    },[imageRef.current])

    const onChangeImage = useCallback((e)=>{
        console.log(e.target.files)
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f)
        });
        dispatch({
            type: UPLOAD_IMAGE_REQUEST,
            data: imageFormData
        })
    },[])

    const onRemoveImage = useCallback((index)=>()=>{
        dispatch({
            type: REMOVE_IMAGE,
            data: index
        })
    },[])

    const onHoverStar = (index) => setHoverRating(index)
    const onLeaveStar = () => setHoverRating(0);
    const onClickStar = useCallback((index) => {
        setRating(index)
        console.log(index)
    },[setRating]);

    const onCardUpload = useCallback((e)=>{
        e.preventDefault();
        const formData = new FormData();
        imagePaths.forEach((p)=>{
            formData.append('image', p);
        });
        formData.append('title', title);
        formData.append('content', content);
        formData.append('star', rating);
        dispatch({
            type: ADD_CARD_REQUEST,
            data: formData
        })
        
    },[title, content, rating, imagePaths])
    
    
    return(
        <div>
            <div className={Edit.editform}>
                <div className={Edit.editcon} >
                    <input type="text" className={Edit.edittitle} placeholder="제목" value={title} onChange={onChangeTitle} />
                    <textarea placeholder="리뷰 내용을 입력해주세요" value={content} onChange={onChangeContent} />
                    <input type="file" name="image" className={Edit.editfile} ref={imageRef} onChange={onChangeImage} />
                    <button className={Edit.editfilebtn} onClick={onPickImage}>
                        <span className="material-icons">folder_open</span>
                        업로드할 이미지를 선택해주세요
                    </button>
                </div>
                {imagePaths.map((v,i)=>{
                    <div key={v} className={Edit.roadimage}>
                        <img src={v.replace(/\/thumb\//, '/original/')} alt={v} />
                        <button onClick={onRemoveImage(i)}>제거</button>
                    </div>
                })}
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