import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import Link from 'next/link';

import Profile from '../style/profile.module.scss';


const MyReviewList = ({card}) => {
    const router = useRouter()
    const {id} = router.query;
    const onList = useCallback(()=>{
        console.log(id)
    },[])

    return(
        <Link href="/card/[id].js" as={`/card/${card.id}`} >
            <a>
                <li onClick={onList}>
                    <span className={Profile.title} >{card.title}</span>
                    <span className={Profile.con} >{card.content}</span>
                </li>     
            </a>
        </Link>
    )
}

export default MyReviewList;