import React, { useState, useEffect } from 'react';
import './App.css';
import PostList from './post/postList';
import axios from 'axios';
function App() {
    // const [postList, setPostList] = useState([
    //     { id: 1, name: "anh", last_name: "17", address: "HN" },
    //     { id: 2, name: "BBBBBB", last_name: "17", address: "HN" },
    //     { id: 3, name: "CCCCCC", last_name: "17", address: "HN" },
    //     { id: 4, name: "DDDDDD", last_name: "17", address: "HN" },
    // ]);
    /* ----------post ------- */
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        const fetchPostList = async () => {
            axios.get(`http://localhost:3000/data`)
                .then(res => {
                    const { data } = res;
                    setPostList(data);
                })
                .catch(error => console.log(error));
        }
        fetchPostList();
    }, [setPostList]
    )
    const handleEditPost = (post) => {
        console.log(post)
        let newPostList = [...postList];
        newPostList.forEach((value, key) => {
            if (value.id === post.id) {
                value.name = post.name
                value.last_name = post.last_name
                value.address = post.address
            }
        })
        setPostList(newPostList);
    }
    const addPostList = (fromValues) => {
        console.log("handleClickFormSubmit", fromValues)
        const newTodo = {
            ...fromValues
        }
        const newPostList = [...postList];
        newPostList.push(newTodo);
        console.log(newPostList)
        setPostList(newPostList);
    }
    const handleDeletePostClick = (post) => {
        const index = postList.findIndex(x => x.id === post.id);
        if (index < 0) return;
        const newPostList = [...postList];
        newPostList.splice(index, 1);
        setPostList(newPostList);
    }
    return (
        <div className="App">
            <div className="header-menu">React Hook TodoList</div>
            <PostList posts={postList} onDeletePost={(post) => handleDeletePostClick(post)}
                onAdd={(fromValues) => addPostList(fromValues)}
                onEditPost={(post) => handleEditPost(post)}
            />
        </div>
    );
}

export default App;
