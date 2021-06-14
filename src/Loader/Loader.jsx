import React from "react"
import MyLoader from "react-loader-spinner"

const Loader = () => (
    <MyLoader style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }} type="Circles" color="#00BFFF" height={80} width={80}/>
)

export default Loader