import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '/src/firebase-config';
import { Link } from 'react-router-dom';
import PostItem from '/src/components/PostItem.jsx';
import '/public/MainPage.css';

const PopularPosts = () => {
    const [popularPosts, setPopularPosts] = useState([]);

    useEffect(() => {
        const fetchPopularPosts = async () => {
            try {
                const postsCollection = collection(db, 'posts');
                const yamaeCollection = collection(db, 'yamae');
                const jinsimCollection = collection(db, 'jinsim');
                const jayouCollection = collection(db, 'jayou');

                const postsQuery = query(postsCollection, orderBy('views', 'desc'), limit(3));
                const yamaeQuery = query(yamaeCollection, orderBy('views', 'desc'), limit(3));
                const jinsimQuery = query(jinsimCollection, orderBy('views', 'desc'), limit(2));
                const jayouQuery = query(jayouCollection, orderBy('views', 'desc'), limit(2));

                const postsSnapshot = await getDocs(postsQuery);
                const yamaeSnapshot = await getDocs(yamaeQuery);
                const jinsimSnapshot = await getDocs(jinsimQuery);
                const jayouSnapshot = await getDocs(jayouQuery);

                const postsData = postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                const yamaeData = yamaeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                const jinsimData = jinsimSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                const jayouData = jayouSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                const mergedData = [...postsData, ...yamaeData, ...jinsimData, ...jayouData];
                const sortedData = mergedData.sort((a, b) => b.views - a.views).slice(0, 10);

                setPopularPosts(sortedData);
            } catch (error) {
                console.error('인기 게시물을 불러오는 동안 오류가 발생했습니다:', error);
            }
        };

        fetchPopularPosts();
    }, []);

    return (
        <div className="popular-posts">
            <div className="notice">
                <p>인기 게시물</p>
            </div>
            <div className="post-header">
                <p>순서</p>
                <p>닉네임</p>
                <p>제목</p>
                <p>날짜</p>
            </div>
            <div className="popular-list">
                {popularPosts.map((post, index) => (
                    <li key={post.id}>
                        <Link to={`/Notice/${post.id}`}>
                            <PostItem key={post.id} index={index + 1} post={post} showImage={false} nicknameFirst={true} />
                        </Link>
                    </li>
                ))}
            </div>
        </div>
    );
};

export default PopularPosts;