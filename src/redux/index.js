const initialState = {
  nextSurah: 0,
  prevSurah: 0,
  showNav: false
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_SURAH':
      return {
        ...state,
        nextSurah: action.nextSurah,
        prevSurah: action.prevSurah,
        showNav: action.showNav
      }
    default:
      return state
  }
}

export default rootReducer