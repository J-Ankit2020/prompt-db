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
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);
  const handleSearch = (val) => {
    setSearchText(val);
    const filteredPosts = posts.filter((post) => {
      return post.tag.includes(searchText) || post.prompt.includes(searchText);
    });
    setPosts(filteredPosts);
  };
  return (
    <section className='feed'>
      <form className='realative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList
        posts={posts}
        handleTagClick={(tag) => {
          handleSearch(tag);
        }}
      />
    </section>
  );
};

export default Feed;
