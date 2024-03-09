import React, { useState } from 'react'
import s from './News.module.scss'
import Post from '../../components/Post/Post';
import Loader2 from '../../components/Loader2/Loader2';


const News = ({ posts, setPosts }) => {
    return (
        <div className={s.news}>
            <div className={s.posts}>
                {
                    posts !== null
                        ? posts.map((post, index) =>
                            <Post key={index} post={post} setPosts={setPosts} posts={posts} />
                        )
                        : <div className={s.load}><Loader2 /></div>
                }
            </div>
        </div>
    );
};
export default News