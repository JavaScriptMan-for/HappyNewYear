import { FC } from "react";
import Header from "../components/Header";
import Timer from "../components/Timer";
import Snow from "../components/Snow"
import React from "react";
import "../css/bcg.css"
React.version
const NewYear:FC = () => {
    return (
        <>
        <Header>До Нового <b>{new Date().getFullYear() + 1}</b> года осталось...</Header>
        <Snow />
        <Timer />
        </>
    )
}
export default NewYear;