import TwitterContext from "./TwitterContext";

const TwitterState = (props) => {
    const AUTH_FUNC = () =>{
        const res = JSON.parse(localStorage.getItem("UserData"))
        if(res !== null){
            return true
        }
        return false
    }
    return <TwitterContext.Provider value={{AUTH_FUNC}}>
        {props.children}
    </TwitterContext.Provider>
}

export default TwitterState