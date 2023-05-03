import axios from 'axios';
import { useState, useEffect } from 'react';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false)
    
    const fetchComments = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
            setComments(data.comments)
        } catch(err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])

    return ( 
        <div>
            <h3>Comments</h3>
            {loading ? 'Loading...' : (
                <ul>
                    {comments.map(item => (
                        <li key={item.commentId}>{item.comment}</li>
                    ))}
                </ul>
            )}
        </div>
     );
}
 
export default CommentList;