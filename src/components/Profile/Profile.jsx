import s from './Profile.module.css'
import PostsContainer from "./Posts/PostsContainer";
import {connect} from "react-redux";
import {setUsers} from "../../redux/users-reducer";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {UsersAPI} from "../../api/api";
import {withAuthRedirect} from "../HOC/withAuthRedirect";

const ProfileFunc = (props) => {
	const {userId} = useParams()
	const [post, setPost] = useState([]);
	const [img, setImg] = useState('https://media.istockphoto.com/vectors/user-icon-male-avatar-in-business-suitvector-flat-design-vector-id843193172');

	useEffect(()=>{
		UsersAPI.getProfile(userId).then(data => {
				setPost(data);
				setImg(data.photos.large);
			}
		)
	}, [])

	return (
		<div className={s.profile}>
			<div className={s.about}>
				<div className={s.image}>
					<img src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg" alt="..." />
				</div>
				<div className={s.avatar}>
					<div className={s.photo}>
						{
							img === null
							? <img  src="https://media.istockphoto.com/vectors/user-icon-male-avatar-in-business-suitvector-flat-design-vector-id843193172" alt="ava" />
 							: <img  src={img} alt="ava" />
						}
					</div>
					<div className={s.nameAndDesc}>
						<div className={s.name}>{post.fullName}</div>
						<div className={s.description}>Middle Full Stack Developer</div>
					</div>
				</div>
			</div>
			<PostsContainer/>
		</div>
	)
}

const MapStateToProps = (state) =>  {
	return {
		users: state.usersPage.users
	}
}

let ProfileWithRedirect = withAuthRedirect(ProfileFunc)

export const Profile = connect(MapStateToProps, {setUsers})(ProfileWithRedirect)