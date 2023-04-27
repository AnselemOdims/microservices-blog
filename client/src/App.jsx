import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

const App = () => {
    return ( 
        <div>
            <h1>Blog App</h1>
            <div>
                <h2>Create Post</h2>
                <PostForm />
                <hr />
                <PostList />
            </div>
        </div>
     );
}
 
export default App;