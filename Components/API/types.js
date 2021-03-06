export const EMAIL_CHANGED = 'email_changed'
export const PASSWORD_CHANGED = 'password_changed'
export const LOGIN_USER_SUCCESS = 'login_user_success'
export const LOGIN_USER_FAILED = 'login_user_failed'
export const LOADING_ATTEMPT = 'loading_attempt'
export const ALREADY_LOGIN = 'already_login'
export const base_url='https://paywelt.softgear.site';

// export const base_url='http://192.168.18.7:8000';

// Users

export const Follow_Unfollow = base_url+'/api/user/follow-unfollow-user'
export const url = base_url+'/api/auth/'
export const userByName = base_url+'/api/user-by-name/' 
export const userPostAPI = base_url+'/api/user/posts-by-user/'
export const url1 = base_url+'/api/user/posts-by-visibility/'
export const urlPost = base_url+'/api/user/posts'
export const urlProfile = base_url+'/api/user/'
export const userProfile =  base_url+'/api/user/user-profile-with-followers-followingcheck/'
export const userByDepartment = base_url+'/api/user-by-school-department/'
export const urlMessages = base_url+'/api/user/messages/'
export const urlUpdateProfile =  base_url+'/api/user/update-profile/'
export const sendRequest = base_url+'/api/user/chat-request'
export const acceptChatReq= base_url+'/api/user/accept-chat-request/'
export const deleteChatReq= base_url+'/api/user/chat-request/' 
export const Messageslist= base_url+ '/api/user/messages'

export const Messages= base_url+ '/api/user/chat-request'



export const allusers= base_url+'/api/users'
export const SIGN_UP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGN_UP_FAILED = 'SIGNUP_FAILED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const START_LOADING = 'LOADING_START'
export const POST_CREATED_SUCCESS = 'POST_CREATED_SUCCESS'
export const POST_CREATED_FAILED = 'POST_CREATED_FAILED'
export const POST_SUBMIT_FORM = 'POST_SUBMIT_FORM'
export const TOURIST_ALL_POSTS_SUCCESS = 'TOURIST_ALL_POSTS_SUCCESS'
export const TOURIST_ALL_POSTS_FAILED = 'TOURIST_ALL_POSTS_FAILED'
export const ACCEPT_REQUEST_SUCCESS = 'ACCEPT_REQUEST_SUCCESS'
export const ACCEPT_REQUEST_FAILED = 'ACCEPT_REQUEST_FAILED'
export const RESET_FORM = 'RESET_FORM'
export const TOURS_MADE_SUCCESS ='TOURS_MADE_SUCCESS'
export const TOURS_MADE_FAILED ='TOURS_MADE_FAILED'
export const COMPLETE_POST= 'COMPLETE_POST'
export const LOGOUT_USER = 'LOGOUT_USER'

export const ACTIVE_POSTS_SUCCESS = 'ACTIVE_POSTS_SUCCESS'
export const ACTIVE_POSTS_FAILED = 'ACTIVE_POSTS_FAILED'

export const OFFERS_SENT_SUCCESS = 'OFFERS_SENT_SUCCESS'
export const OFFERS_SENT_FAILED = 'OFFERS_SENT_FAILED'
export const OFFERS_ACCEPTED_SUCCESS = 'OFFER_ACCEPTED_SUCCESS'
export const OFFERS_ACCEPTED_FAILED = 'OFFERS_ACCEPTED_FAILED'
export const REQUEST_CREATED_SUCCESSFULLY = 'REQUEST_CREATED_SUCCESSFULLY'
export const REQUEST_CREATED_FAILED = 'REQUEST_CREATED_FAILED'
export const RESET_REQUEST_FORM = 'RESET_REQUEST_FORM'
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS'
export const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED'
export const READ_MESSAGE_SUCCESS = 'READ_MESSAGE_SUCCESS'
export const READ_MESSAGE_FAILED = 'READ_MESSAGE_FAILED'
export const RESET_MESSAGES = 'RESET_MESSAGES'


// Driver
export const MAKE_RIDE = 'MAKE_RIDE'
export const DRIVER_ACTIVE_RIDE = 'DRIVER_ACTIVE_RIDE'
export const FIND_RIDE_SUCCESS='FIND_RIDE_SUCCESS'
export const FIND_RIDE_FAILED='FIND_RIDE_FAILED'

export const ADD_PASSENGER_SUCCESS='ADD_PASSENGER_SUCCESS'
export const ADD_PASSENGER_FAILED='ADD_PASSENGER_FAILED'
export const GET_ACTIVE_RIDE='GET_ACTIVE_RIDE'
export const RIDE_COMPLETED='RIDE_COMPLETED'
