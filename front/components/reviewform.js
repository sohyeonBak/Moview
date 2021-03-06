import React, { useCallback, useState, useRef, useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CARD_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGE_REQUEST } from '../reducers/card';
import Edit from '../style/editform.module.scss';
import StarsForm from './starsform';

const ReviewForm = () => {
    const [ title, setTitle ] = useState('');
    const [ alretTitle, setAlretTitle ] = useState(false);
    const [ content, setContent ] = useState('');
    const [ alretContent, setAlretContent ] = useState(false);
    const [ rating, setRating ] = useState(0);
    const [ hoverRating, setHoverRating ] = useState(0);
    const imageRef = useRef()
    
    const { addCardDone, imagePaths, uploadImageDone } = useSelector((state)=> state.card);
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
        if(title!=='' && content!=='') {
            formData.append('title', title);
            formData.append('content', content);
            formData.append('star', rating);
            dispatch({
                type: ADD_CARD_REQUEST,
                data: formData
            })
        }else {
            if(title==='') setAlretTitle(true)
            if(content=='') setAlretContent(true)
        }

        
    },[title, content, rating, imagePaths,setAlretTitle,setAlretContent])
    
    
    return(
        <div>
            <div className={Edit.editform}>
                <div className={Edit.editcon} >
                    <input type="text" className={Edit.edittitle} placeholder="??????" value={title} onChange={onChangeTitle} />
                    {alretTitle?<p>????????? ??????????????????.</p> : ''}
                    <textarea placeholder="?????? ????????? ??????????????????" value={content} onChange={onChangeContent} />
                    {alretContent?<p>????????? ??????????????????.</p> : ''}
                    <input type="file" name="image" className={Edit.editfile} ref={imageRef} onChange={onChangeImage} />
                    <button className={Edit.editfilebtn} onClick={onPickImage}>
                        <span className="material-icons">folder_open</span>
                        ???????????? ???????????? ??????????????????. (1???)
                    </button>
                </div>
                {uploadImageDone?
                    <div className={Edit.roadimage}>
                        <img src={imagePaths[0]} alt='' />
                        <button onClick={onRemoveImage(0)}>??????</button>
                    </div>
                :''}
                <p>????????? ???????????????.</p>
                <div className={Edit.starzone}>
                    <div className={Edit.starline}>
                        {[1, 2, 3, 4, 5].map((inx) => {
                            return (
                                <StarsForm 
                                    key={inx}
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
                <a>?????????</a>
            </button>
            </div>
        </div>        
    );}

export default ReviewForm;