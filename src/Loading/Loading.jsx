import React, {useState,useEffect} from "react"
import CircleLoader from "react-spinners/ClipLoader";
import  style from './Loading.module.css'


const LoadingScreen = () => {

    let [loading,setLoading]=useState(false)


    useEffect(()=>{
        setLoading(true)
    },[])

    return (
        <div className={style.LoadingScreen}>
            {
                loading ?
                    <CircleLoader loading={loading} color={"red"} size={500} />
                    :null
            }
        </div>

    )
}
export default LoadingScreen;
