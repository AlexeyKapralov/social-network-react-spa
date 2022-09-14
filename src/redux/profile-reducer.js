const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialData = {

	posts: [
		{
			id: 1,
			message: "Hello, it's my first message",
		},
		{
			id: 2,
			message: "Hello, it's my second message",
		},
		{
			id: 3,
			message: "Hello, it's my third message",
		}
	],
	newPostText: '',

}

export const profileReducer = (state = initialData, action) => {
	
	switch (action.type) {
		case ADD_POST: {
			return{
				...state,
				posts: [...state.posts, {id: state.posts.length + 1, message: state.newPostText}],
				newPostText: ""
			}
		}
		case UPDATE_NEW_POST_TEXT: {
			return {
				...state,
				newPostText: action.text,
			}
		}
		default:
			return state;
	}
	
	
}

export const addPostActionCreator = () => {
	return { type: ADD_POST };
};

export const updateNewPostTextActionCreator = (text) => {
	return { type: UPDATE_NEW_POST_TEXT, text: text }
}