const SET_NEWPOSTTEXT = "BLOG_SET-NEWPOSTTEXT";
const ADD_POST = "BLOG_ADD-POST";
const SET_POSTS = "BLOG_SET_POSTS";
const TOOGLE_IS_FOREIGN = "BLOG_TOOGLE_FOREIGN"
const TOOGLE_IS_FETCHING= "BLOG_TOOGLE_IS_FETCHIN"
const POST_UPLOADED="BLOG_POST_UPLOADED"
const SET_FOREIGNED="BLOG_SET_FOREIGNED"
const initBlog={
    posts: [],
    newPost: {
        content: {
            text: '',
        },
    },
    foreigned: {
        name: '',
        avatar: '',
    },
    isFetching: true,
    noUploadedCount: 0,
    isForeign: false,
}

const blogReducer = (state=initBlog,action) => {
    let stateCopy={...state};

    switch (action.type) {
        case SET_NEWPOSTTEXT: {
            stateCopy={
                ...state,
                newPost: {
                    ...stateCopy.newPost,
                    content: {
                        ...stateCopy.newPost.content,
                        text:action.text,
                    }
                }
            }
            break;
        }
        case ADD_POST: {
            let newPost = {...stateCopy.newPost,uploaded:false, onUpload:
                function (){
                    return this;
                },
                tempId:((new Date).getTime())
            }
            newPost.onUpload=newPost.onUpload.bind(newPost);
            stateCopy={
                ...state,
                posts: [...stateCopy.posts,newPost],
                newPost: {
                    content: {
                      text:''
                    },
                    user: action.userCreator,
                },
                noUploadedCount: stateCopy.noUploadedCount+1
            }
            break;
        }
        case SET_POSTS: {
            stateCopy={
                ...state,
                posts: action.posts.map(function (post){post.uploaded=true;return post;})
            }
            break;
        }
        case TOOGLE_IS_FETCHING: {
            stateCopy={
                ...state,
                isFetching: action.isFetching
            }
            break;
        }
        case POST_UPLOADED: {
            let currentPost=action.onUpload();
            delete currentPost.onUpload;
            const keys=Object.keys(action.postCreated)
            for (let i in keys){
                currentPost[keys[i]]=action.postCreated[keys[i]]
            }
            currentPost.uploaded=true;
            stateCopy={
                ...state,
                noUploadedCount:stateCopy.noUploadedCount-1
            }
            break;
        }
        case TOOGLE_IS_FOREIGN: {
            stateCopy={
                ...state,
                isForeign: action.isForeign,
            }
            break;
        }
        case SET_FOREIGNED: {
            stateCopy={
                ...state,
                foreigned: {
                    name: action.name,
                    avatar: action.avatar
                }
            }
        }
        default: {
            break;
        }
    }
    
    return stateCopy;
}

export const setNewPostText = (text) => ({
    type: SET_NEWPOSTTEXT,
    text: text
});
export const addPost = () => ({
    type: ADD_POST
});
export const setPosts = (posts) => ({
    type: SET_POSTS,
    posts:posts
});
export const toogleIsFetching = (isFetching) => ({
    type: TOOGLE_IS_FETCHING,
    isFetching: isFetching
});
export const postUploaded = (onUpload,postCreated) => ({
    type: POST_UPLOADED,
    onUpload: onUpload,
    postCreated: postCreated,
});
export const toogleIsForeign = (isForeign) => ({
    type: TOOGLE_IS_FOREIGN,
    isForeign: isForeign
});
export const setForeigned = (name,avatar) => ({
    type: SET_FOREIGNED,
    name: name,
    avatar: avatar
});

export default blogReducer;