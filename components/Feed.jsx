'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ posts, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {posts.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [timeout, setTimeout] = useState(null);
  const [posts, setPosts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const filterPosts = (searchText) => {
    const filteredPosts = posts.filter((post) => {
      const regex = new RegExp(searchText, 'i');
      return (
        regex.test(post.tag) ||
        regex.test(post.prompt) ||
        regex.test(post.creator.username)
      );
    });
    return filteredPosts;
  };

  const handleSearch = (e) => {
    clearTimeout(timeout);
    setSearchText(e.target.value);
    // debounce the search
    setTimeout(
      setTimeout(() => {
        const filteredPosts = filterPosts(e.target.value);
        setSearchResult(filteredPosts);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const filteredPosts = filterPosts(tag);
    setSearchResult(filteredPosts);
  };
  return (
    <section className='feed'>
      <form className='realative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearch}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList
        posts={searchText === '' ? posts : searchResult}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
