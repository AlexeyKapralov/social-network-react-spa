import React from 'react';
import s from './CreatePost.module.css'

const CreatePost = (props) => {

	let textArea = React.createRef();


	const addPost = () => {
		props.addPost(textArea.current.value);
	};

	const updateNewPostText = () => {
		props.updateNewPostText(textArea.current.value);
	};

	return (
		<div className={s.createPost}>
			<textarea onChange={updateNewPostText} ref={textArea} placeholder='Say some nice news for your friens!'></textarea>
			<button onClick={addPost}>Create post</button>
		</div>
	)
}

export default CreatePost;