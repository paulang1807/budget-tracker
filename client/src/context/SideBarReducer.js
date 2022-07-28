const SideBarReducer = (state, action) => {
  switch (action.type) {
      case 'TOGGLE_SIDEBAR':
          return {
              ...state,
              sideBar: action.payload
          }
      default:
          return state
  }
}

export default SideBarReducer