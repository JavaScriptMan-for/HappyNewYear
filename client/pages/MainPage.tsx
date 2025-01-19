import  {FC} from "react"
import Send from '../components/Send';
import Header from "../components/Header"
import Snow from "../components/Snow"
import "../css/App.css";

const MainPage:FC = ()=> {
    return (
        <>
            <Header>Отправь поздравление с Новым годом</Header>
            <Snow />
            <Send />
        </>
    )
}
export default MainPage;