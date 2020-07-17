import React, { useState } from 'react'
function PostList(props) {
    const { posts, onDeletePost, onEditPost, onAdd } = props;
    const handleClick = (post) => {
        onDeletePost(post)
    }
    const [name, setName] = useState('');
    const [last_name, setLast_name] = useState('');
    const [address, setAddress] = useState('');
    const [id, setId] = useState(null);
    const [status, setStatus] = useState(true);
    const handleEditClick = (post) => {
        onEditPost(post);
        setId(post.id)
        setName(post.name);
        setLast_name(post.last_name);
        setAddress(post.address);
        setStatus(!status);
    }
    const SaveForm = () => {
        if (id == null) {
            console.log("a")
            let id = (new Date()).getTime()
            const fromValues = {
                // id: id, name: name, last_name: last_name, address: address
                id, name, last_name, address
            }
            onAdd(fromValues);
            console.log(fromValues)
            setName('');
            setLast_name('');
            setAddress('')
            console.log(id, name, last_name, address)
        }
        else {
            console.log(id)
            const post = {
                // id: id, name: name, last_name: last_name, address: address
                id, name, last_name, address
            }
            console.log(post)
            onEditPost(post);
            setName('');
            setLast_name('');
            setAddress('');
            setId(null)
            setStatus(!status);
            console.log(id, name, last_name, address)
        }
    }
    return (
        <div>
            <div className="form-list" >
                <span>Name </span>
                <input className="input-todo"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <span>Last Name</span>
                <input className="input-todo"
                    type="text"
                    name="last_name"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                />
                <span>Address</span>
                <input className="input-todo"
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <button onClick={() => SaveForm()} >{status ? 'Thêm mới' : 'Sửa'}</button>
            </div>
            <div>
                <tr>
                    <th>Name</th>
                    <th>LasName</th>
                    <th>Address</th>
                    <th colSpan="2">Action</th>
                </tr>
                {posts.map((post, key) => (
                    <tr key={post.id}>
                        <td >{post.name}</td>
                        <td>{post.last_name}</td>
                        <td>{post.address}</td>
                        <td onClick={() => handleEditClick(post)}>Sửa</td>
                        <td onClick={() => handleClick(post)}>Xóa</td>
                    </tr>
                ))}
            </div>
        </div>
    )
}
export default PostList;