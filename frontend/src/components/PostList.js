// frontend/src/components/PostList.js
import React, { useEffect, useState } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <h2>Post List</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
