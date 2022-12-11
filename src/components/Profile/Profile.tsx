import s from './Profile.module.scss'
import {connect} from "react-redux";
import {UserType} from "../../redux/users-reducer";
import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {ProfileAPI, tProfileData} from "../../api/api";
import {compose} from "redux";
import {addPost, PostType} from "../../redux/profile-reducer";
import Posts from "./Posts/Posts";
import {AppStateType} from "../../redux/redux-store";


type MapDispatchToProps = {
	addPost: (newPostText:string)=> void
}
type MapStateToPropsType = {
	posts: Array<PostType>
	users: Array<UserType>
	id: any
	isAuth: boolean
}
type OwnProps = {
	//empty
}
type Props = MapStateToPropsType & MapDispatchToProps & OwnProps

const Profile:React.FC<Props> = (props) => {
	let {userId} = useParams<string>()
	const [post, setPost] = useState<any>([]);
	const [img, setImg] = useState<string>();
	const [status, setStatus] = useState('no status');
	const [isStatusEditMode, setEditMode] = useState(false)
	const [exErrors, setExErrors] = useState<any>()

	if (!userId) {
		userId = props.id
	}

	useEffect(()=>{
			if (userId) {
			ProfileAPI.getProfile(userId).then(data => {
					setPost(data);
					setImg(data.photos.large);
				}
			)
		}
	}, [userId])

	useEffect(()=>{
		if (userId) {
			ProfileAPI.getStatus(userId).then(response => {
					if (response.data === null) {
						setStatus('no status')
					} else (setStatus(response.data))
				}
			)
		}
	}, [userId])

	let isChangeStatus = () => {
		if (userId) {
			setEditMode(false)
			ProfileAPI.setStatus(status).then(response => {
					if (response.resultCode === 0) {
						// console.log("All is good")
					}
				}
			)
		}
	}

	const setPhotoFunction = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files != null && e.target.files.length){
			const result = await ProfileAPI.setPhoto(e.target.files[0])
			if (result.data.resultCode === 0) {
				setImg(result.data.data.large)
			}
		}
	}

	const setNewProfileData = async (data:tProfileData) => {
		const result = await ProfileAPI.setNewProfileData(data)
		if (result.data.resultCode === 0) {
			setPost(data)
		} else {
			setExErrors(result.data.messages)
		}
	}

	return (
		(!props.isAuth && !userId)
		? <Navigate to={"/login"}/>
		: <div className={s.profile}>
				<div className={s.about}>
					<div className={s.image}>
						<img src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg" alt="..."/>
					</div>
					<div className={s.avatar}>
						<div className={s.photo}>
							{
								!img
									? <img
										src="https://media.istockphoto.com/vectors/user-icon-male-avatar-in-business-suitvector-flat-design-vector-id843193172"
										alt="ava"/>
									: <img src={img} alt="ava"/>
							}
						</div>
						<div className={s.nameAndDesc}>
							<div className={s.name}>{post.fullName}</div>
							<div className={s.profileStatus}>
								{(isStatusEditMode && (userId === props.id) )
									? <div><input onChange={e => (setStatus(e.target.value))} onBlur={isChangeStatus} autoFocus
												  className={s.statusTitleInput} value={status}/></div>
									:
									<div onDoubleClick={() => (setEditMode(true))} className={s.statusTitleSpan}>{status}</div>
								}
							</div>
						</div>
					</div>

					{userId === props.id &&
						<div className={s.setPhoto}>
							<input id="input__file" accept="image/jpeg,image/png,image/gif" type="file" onChange={setPhotoFunction}/>
							<label htmlFor="input__file">Change photo</label>

						</div>

					}

					<div className={s.setAvatar}></div>

				</div>
			<Posts exErrors={exErrors} posts={props.posts} addPost={props.addPost} post={post} userId={userId} propsUserId={props.id} setNewProfileData={setNewProfileData}/>
			</div>
	)
}

const MapStateToProps = (state: AppStateType) =>  {
	return {
		posts: state.profilePage.posts,
		users: state.usersPage.users,
		id: state.auth.data.id,
		isAuth: state.auth.isAuth,

	}
}

export default compose (
	connect(MapStateToProps, { addPost}),
	// withAuthRedirect,
)(Profile)