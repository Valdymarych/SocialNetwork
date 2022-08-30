const TOOGLE_IS_FETCHING="APP_TOOGLE_IS_FETCHING"


const initState={
    isFetching: false
}

const appReducer = (state=initState,action) => {
    let stateCopy={...state};
    switch (action.type){
        case TOOGLE_IS_FETCHING: {
            stateCopy={
                ...state,
                isFetching: action.isFetching
            }
            break;
        }
        default: {
            break;
        }
    }
    return stateCopy;
}

export const toogleIsFetching=(isFetching)=>({
    type: TOOGLE_IS_FETCHING,
    isFetching: isFetching
})

export default appReducer