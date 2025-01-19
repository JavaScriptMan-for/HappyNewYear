import axios from "axios";
import React from "react";
import { FC, FormEvent, useState } from "react"


React.version

const SendSantaClaus:FC = ()=> {
    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('')
    const [status, setStatus] = useState<string>('');
    const [ok, setOk] = useState<number>(0)

    const handleSubmit = async (e:FormEvent)=> {
        e.preventDefault();
        setOk(0);
        setStatus('Отправка...');
        try {
            await axios.post('/api/to-santa/', {name, message});
            setStatus('Письмо отправлено!');
            setOk(1);
            setName('');
            setMessage('')
        } catch (error) {
            console.error('Ошибка при отправке', error);
            setStatus("Ошибка при отправке");
            setOk(2);
        }   
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="_name">
                <span>Твоё имя:</span> <br />
                <input
                id="_name"
                 name="name"
                 type="text" 
                 value={name}
                 onChange={e=> setName(e.target.value)}
                 required
                 placeholder="Введите Ваше имя с заглавной буквы в именительном падеже..."
                 />
            </label>
            <label htmlFor="_message">
                <span>Содержимое письма:</span> <br />
                <textarea
                 name="message"
                 value={message}
                 onChange={e=> setMessage(e.target.value)}
                 required
                 placeholder="Напишите все свои пожелания..."   
                />
            </label>
            <button type="submit">Отправить</button>
            {ok === 0 && <p style={{color:"black"}}>{status}</p>}
             {ok === 1 && <p style={{color:"greenyellow"}}>{status}</p>}
            {ok === 2 && <p style={{color:"red"}}>{status}</p>}
        </form>
        </>
    )
}
export default SendSantaClaus;
