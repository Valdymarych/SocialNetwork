const SET_CURRENT_PAGE="USERS_SET_CURRENT_PAGE";
const TOOGLE_IS_FETCHING="USERS_TOOGLE_IS_FETCHING"
const SET_USERS="USERS_SET_USERS"

const initState={
    users:[],
    pageSize: 10,
    currentPage: 0,
    total: 0,
    isFetching: false
}

const usersReducer = (state=initState,action) => {
    let stateCopy={...state};

    switch (action.type){
        case SET_CURRENT_PAGE: {
            stateCopy={
                ...state,
                currentPage: action.currentPage
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
        case SET_USERS: {
            stateCopy={
                ...state,
                users: action.users,
                total: action.total
            }
            break;
        }
        default: {
            break;
        }
    }
    return stateCopy;
}

export const setCurrentPage=(page)=>({
    type: SET_CURRENT_PAGE,
    currentPage: page
})
export const toogleIsFetching=(isFetching)=>({
    type: TOOGLE_IS_FETCHING,
    isFetching: isFetching
})
export const setUsersData=(data)=>({
    type: SET_USERS,
    users: data.users,
    total: data.totalCount

})

export default usersReducer