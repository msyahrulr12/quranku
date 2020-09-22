const createStore = require('redux').createStore

const initialState = {
    age: 17
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_AGE':
            return {
                ...state,
                age: state.age + 5
            }
        default:
            return state
    }
}

const store = createStore(rootReducer);

console.log(store.getState())

store.dispatch({ type: 'ADD_AGE' })

console.log(store.getState())