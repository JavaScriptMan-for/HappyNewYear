import React, { FC } from "react";
import Header from "../components/Header";
import SendToSantaClaus from "../components/SendToSantaClaus"
import Snow from "../components/Snow";
import "../css/App.css"
import "../css/style2.css"

React.version

const SendToSanta: FC = () => {
    return (
        <>
            <Header>Отправь письмо Деду Морозу</Header>
            <Snow />
            <SendToSantaClaus />
        </>
    )
}
export default SendToSanta;
