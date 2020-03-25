const ComentReducer = (state = [], action) =>{
	switch(action.type) {
		case 'ADD_COMMENT' :
		return state.cancat([action.data]);
		default:
		return state;
	}
}
export default ComentReducer;