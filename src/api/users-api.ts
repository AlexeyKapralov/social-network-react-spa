import {instance} from "./api";
import {ProfileAPI} from "./profile-api";

type tGetUsers = {
    items: Array<User>
    totalCount: number
    error:string
}
export type tUnfollowFollow = {
    resultCode: number
    messages: Array<string>
    data:object
}
type User = {
    id: number
    name: string
    status: string
    photos: {
        small: string
        large: string
    }
    followed: boolean
}

export const UsersAPI = {
    getUsers(activePage = 1, usersCountOnPage = 10, term: string ="", friend: null | boolean = null) {
        return instance.get<tGetUsers>(`users?page=${activePage}&count=${usersCountOnPage}&term=${term}` + (friend === null ? '' : `&friend=${friend}`) )
            .then(response => (response.data))
    },
    unfollow(userID: number) {
        return instance.delete<tUnfollowFollow>(`follow/${userID}`)
            .then(response => (response.data))
    },
    follow(userID: number) {
        return instance.post<tUnfollowFollow>(`follow/${userID}`)
            .then(response => (response.data))
    }
}