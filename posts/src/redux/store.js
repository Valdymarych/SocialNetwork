import blogReducer from "./blogReducer";

let store = {
    _state: {
        blog: {
            posts: [
                {
                    text: 'Helle! Its mine Blog!'
                },
                {
                    text: 'my pet - biba'
                }
            ],
            newPost: {
                text: ''
            },
        }
    },
    subscribe(observer){
        this._callSubscriber = observer;
    },
    getState(){
        return this._state;
    },


    dispatch(action){
        this._state.blog=blogReducer(this._state.blog,action);

        this._callSubscriber();
    },

}

window.state=store;
export default store;