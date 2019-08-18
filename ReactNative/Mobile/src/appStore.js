const initState={
    walk:"walking",
    run:"running",
};
const reducer = (state=initState,action)=>{
    if(action.type==="walk"){
        return{
            ... state,
            walk:state.walk,
        }
    }
};
export default reducer;

