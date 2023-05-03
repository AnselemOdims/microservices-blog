import axios from 'axios';

const CommentsForm = ({ commentId }) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true)
        const { data } = await axios.post(
            `http://localhost:4001/posts/${commentId}/comments`,
            { comment: e.target.value }
          );
          console.log(data);
    } catch(err) {
        console.log(err)
    } finally {
        setLoading(false)
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment"> Create Comment</label>
      <input
        type="text"
        id="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button>{loading ? 'Loading...' : 'Submit'}</button>
    </form>
  );
};

export default CommentsForm;
