import axios from "axios";
import React from "react";
import { FC, useState } from "react"
import {useForm} from "react-hook-form"

React.version

interface Data {
    name: string;
    message: string
}

const SendSantaClaus:FC = ()=> {
    const {handleSubmit, register, formState: {
        isValid,
        errors
    },
    reset
} = useForm<Data>({
    mode: "onBlur"
});

    const [status, setStatus] = useState<string>('');
    const [ok, setOk] = useState<number>(0)

    const onSubmit = async (data: Data)=> {
        setOk(0);
        setStatus('Отправка...');
        try {
            await axios.post('https://happynewyear-1.onrender.com/api/to-santa/', data);
            setStatus('Письмо отправлено!');
            setOk(1);
            reset();
        } catch (error) {
            console.error('Ошибка при отправке', error);
            setStatus("Ошибка при отправке");
            setOk(2);
        }   
    }
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="_name">
                <span>Твоё имя:</span> <br />
                {errors.name && <p className="validation-errors">{errors.name?.message}</p>}
                <input
                 id="name"
                 type="text" 
                {...register('name', 
                    {
                        required: "Это поле не может быть пустым",
                        minLength: {
                            value: 2,
                            message: "Слишком короткое имя"
                        },
                        maxLength: {
                            value: 30,
                            message: "Слишком длинное имя"
                        }
                    }
                )}
                 placeholder="Введите Ваше имя с заглавной буквы в именительном падеже..."
                 />
            </label>
            <label htmlFor="_message">
                <span>Содержимое письма:</span> <br />
            {errors.message && <p className="validation-errors">{errors.message?.message}</p>}
                <textarea
                {...register('message', {
                    required: "Это поле не может быть пустым",
                    minLength: {
                        value: 6,
                        message: "Письмо должно состоять минимум из 6 символов"
                    },
                    maxLength: {
                        value: 200,
                        message: "Дедушка Мороз не справится с таким количеством пожеланий"
                    }
                })}
                 placeholder="Напишите все свои пожелания..."   
                />
            </label>
            <button disabled={!isValid} type="submit">Отправить</button>
            {ok === 0 && <p style={{color:"white"}}>{status}</p>}
             {ok === 1 && <p style={{color:"greenyellow"}}>{status}</p>}
            {ok === 2 && <p style={{color:"red"}}>{status}</p>}
        </form>
        </>
    )
}
export default SendSantaClaus;
