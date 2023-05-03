import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentsForm from './CommentsForm';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const { data } = await axios.get('http://localhost:4000/posts');
    setPosts(data.posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <div>
      <>Posts </>
      {posts?.map((post) => (
        <>
          <div key={post.id}>{post.title}</div>
          <CommentsForm />
        </>
      ))}
    </div>
  );
};

export default PostList;
