export const API_VERSION = '/v1'

export const AUTH_LOGIN_URL = '/auth/login'
export const AUTH_REGISTER_URL = '/auth/register'
export const AUTH_REFRESH_TOKEN = '/auth/refresh-token'

export const USER_CHECK_EMAIL = `${API_VERSION}/users/checkEmail`
export const USER_URL = `${API_VERSION}/users`
export const USER_URL_AVATAR = `${API_VERSION}/users/avatar`

export const CATEGORY_URL = `${API_VERSION}/categories`

export const MENU_URL = `${API_VERSION}/menus`
export const MENU_GET_BY_CODE = `${API_VERSION}/menus/menuCode`

export const TAG_URL = `${API_VERSION}/tags`

export const CLOUDINARY_UPLOAD = `${API_VERSION}/cloudinary`

export const POST_URL = `${API_VERSION}/posts`
export const POST_GET_BY_SLUG = `${API_VERSION}/posts/slug`
export const POST_CHECK_TITLE = `${API_VERSION}/posts/checkTitle`
export const POST_GET_BY_CATEGORY = `${API_VERSION}/posts/category`
export const POST_GET_HOT_POST = `${API_VERSION}/posts/hotPosts`
export const POST_VIEW_COUNT = `${API_VERSION}/posts/postView`
export const POST_GET_RELATED_BY_SLUG = `${API_VERSION}/posts/related/slug`

export const POST_META_GET_BY_SLUG = `${API_VERSION}/postsMetas/slug`
