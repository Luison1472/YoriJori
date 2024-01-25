import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy} from 'firebase/firestore';
import { db } from '/src/firebase-config';
import Header from './Header.jsx';
import { Link } from 'react-router-dom';
import PostItem from '/src/components/PostItem.jsx';
import '/public/MainPage.css';
import Pagination from '/src/components/Pagination.jsx';


const All = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const postsPerPage = 13;
  const [currentPage, setCurrentPage] = useState(1);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchOption, setSearchOption] = useState('title');
  const [sortOption, setSortOption] = useState('latest');

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  const handleSearchOptionChange = (option) => {
    setSearchOption(option);
  };

  useEffect(() => {
    const fetchAllPosts = async () => {
  try {
    // posts 컬렉션에서 데이터 가져오기
    const postsCollection = collection(db, 'posts');
    const postsQuery = query(postsCollection, orderBy('timestamp', 'desc'));
    const postsSnapshot = await getDocs(postsQuery);
    const postsData = postsSnapshot.docs.map((doc) => ({ id: doc.id, category: 'Notice', ...doc.data() }));

    // yamae 컬렉션에서 데이터 가져오기
    const yamaeCollection = collection(db, 'yamae');
    const yamaeQuery = query(yamaeCollection, orderBy('timestamp', 'desc'));
    const yamaeSnapshot = await getDocs(yamaeQuery);
    const yamaeData = yamaeSnapshot.docs.map((doc) => ({ id: doc.id, category: 'yamaeNotice', ...doc.data() }));

    // jinsim 컬렉션에서 데이터 가져오기
    const jinsimCollection = collection(db, 'jinsim');
    const jinsimQuery = query(jinsimCollection, orderBy('timestamp', 'desc'));
    const jinsimSnapshot = await getDocs(jinsimQuery);
    const jinsimData = jinsimSnapshot.docs.map((doc) => ({ id: doc.id, category: 'jinsimNotice', ...doc.data() }));

    // jayou 컬렉션에서 데이터 가져오기
    const jayouCollection = collection(db, 'jayou');
    const jayouQuery = query(jayouCollection, orderBy('timestamp', 'desc'));
    const jayouSnapshot = await getDocs(jayouQuery);
    const jayouData = jayouSnapshot.docs.map((doc) => ({ id: doc.id, category: 'jayouNotice', ...doc.data() }));

    // 모든 데이터를 병합하고 정렬
    const mergedData = [...postsData, ...yamaeData, ...jinsimData, ...jayouData];
        const orderByField = getOrderByField();
        const orderByDirection = getOrderByDirection();
        const sortedData = mergedData.sort((a, b) => {
          if (orderByDirection === 'asc') {
            return a[orderByField] - b[orderByField];
          } else {
            return b[orderByField] - a[orderByField];
          }
        });

 
    setAllPosts(sortedData);
        setFilteredPosts(sortedData);
      } catch (error) {
        console.error('게시물을 불러오는 동안 오류가 발생했습니다:', error);
      }
    };

        fetchAllPosts();
      }, [sortOption]);

  const handleMyPageClick = () => {
    if (isUserLoggedIn) {
      navigate('/myPage');
    } else {
      alert('로그인이 필요한 기능입니다.');
    }
  };

  const handleLogout = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && user.isAnonymous) {
      auth.signOut()
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error('로그아웃 중 오류가 발생했습니다:', error);
        });
    } else {
      signOut(auth)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error('로그아웃 중 오류가 발생했습니다:', error);
        });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const filtered = allPosts.filter((post) => {
      const title = post.title || '';
      const content = post.content || '';
      const nickname = post.nickname || '';

      return (
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nickname.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredPosts(filtered);
  }, [searchQuery, allPosts]);

 const handleSearch = async (event) => {
  event.preventDefault();
  setCurrentPage(1);

  try {
    // 새로운 쿼리를 만들어 선택한 옵션에 따라 검색
    const searchField = searchOption === 'nickname' ? 'nickname' : searchOption === 'content' ? 'content' : 'title';
    const postsCollection = collection(db, 'posts');
    const searchQueryFirestore = query(postsCollection, orderBy('timestamp', 'desc'));  // 변수 이름 수정
    const searchSnapshot = await getDocs(searchQueryFirestore);  // 변수 이름 수정
    const searchData = searchSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // 필터링된 결과 설정
    const filtered = searchData.filter((post) => {
      const fieldToSearch = post[searchField] || '';
      return fieldToSearch.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredPosts(filtered);
    setShowSearchResults(true);
  } catch (error) {
    console.error('검색 결과를 불러오는 동안 오류가 발생했습니다:', error);
  }
  };
  
  const getOrderByField = () => {
    switch (sortOption) {
      case 'mostViewed':
        return 'viewCount';
      case 'oldest':
        return 'timestamp';
      default:
        return 'timestamp'; // 기본은 최신순
    }
  };

  const getOrderByDirection = () => {
    return sortOption === 'oldest' ? 'asc' : 'desc';
  };

  return (
    <>
      <Header handleMyPageClick={handleMyPageClick} handleLogout={handleLogout} />

      <div className="all-posts">
        <div className="notice">
          <p>전체 게시물</p>
        </div>
        <div className="options">
          <div className="radio-buttons">
            <label>
              <input
                type="radio"
                value="latest"
                checked={sortOption === 'latest'}
                onChange={() => handleSortOptionChange('latest')}
              />
              최신순
            </label>
            <label>
              <input
                type="radio"
                value="mostViewed"
                checked={sortOption === 'mostViewed'}
                onChange={() => handleSortOptionChange('mostViewed')}
              />
              조회수 많은 순
            </label>
            <label>
              <input
                type="radio"
                value="oldest"
                checked={sortOption === 'oldest'}
                onChange={() => handleSortOptionChange('oldest')}
              />
              날짜 오래된 순
            </label>
          </div>
        </div>
        <div className="post-header">
          <p>순서</p>
          <p>닉네임</p>
          <p>제목</p>
          <p>날짜</p>
        </div>
        <div className="all-list">
          {allPosts
            .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
            .map((post, index) => (
              <li key={post.id}>
               <Link to={`/${post.category === 'posts' ? 'Notice' : post.category}/${post.id}`}>
                <PostItem key={post.id} index={index + 1} post={post} showImage={false} nicknameFirst={true} />
               </Link>
              </li>
            ))}
        </div>
        <Pagination
          totalPosts={allPosts.length}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

       <div className="search-form">
        <form className="search-form-box" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            placeholder="검색어를 입력하세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select value={searchOption} onChange={(e) => handleSearchOptionChange(e.target.value)}>
            <option value="nickname">닉네임</option>
            <option value="title">제목</option>
            <option value="content">내용</option>
          </select>
          <button className="search_btn" type="submit">
            검색
          </button>
        </form>
      </div>
       {showSearchResults && filteredPosts.length > 0 && (
        <div className="result-box">
          <ul className="search-results">
           {filteredPosts.slice(0, 6).map((post, index) => (
              <li key={post.id}>
                <Link to={`/${post.category ? post.category : 'Notice'}/${post.id}`}>
                  <p>{post.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
)}
    </>
  );
};

export default All;