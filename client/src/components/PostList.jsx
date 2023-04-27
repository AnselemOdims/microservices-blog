import { useState, useEffect } from "react";
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const { data } = await axios.get('http://localhost:4000/posts')
        setPosts(data.posts)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    console.log(posts)

    return ( 
        <div>
            <h2>Posts</h2>
            {posts?.map(post => (
                <div key={post.id}>{post.title}</div>
            ))}
        </div>
     );
}
 
export default PostList;