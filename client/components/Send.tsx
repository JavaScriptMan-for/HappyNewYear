import { FC } from "react"
import { useState } from "react";
import axios from "axios"
import { useForm} from "react-hook-form"

interface Data {
  to: string;
  name: string;
  message: string
}
const Send: FC = () => {
  const { handleSubmit, register, formState: {
    errors,
    isValid,
  },
  reset
 } = useForm<Data>({
    mode: "onBlur"
  });



  const [status, setStatus] = useState<string>('');
  const [ok, setOk] = useState<number>(0)

  const onSubmit = async (data:Data) => {
    setOk(0);
    setStatus('Отправка...');
    try {
      await axios.post('https://happynewyear-1.onrender.com/api/send', data);
      setStatus('Сообщение отправлено!');
      setOk(1)
      reset();
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      setStatus(`Ошибка при отправке.`);
      setOk(2)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>Email получателя:</span> <br />
          {errors.to && <p className="validation-errors">{String(errors.to.message)}</p>}
          <input
            {...register("to",
              {
                required: "Это поле не может быть пустым",
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Некорректный email"
                }
              }
            )}
            placeholder="Напиши email того, кого хочешь поздравить..."
            id="email" type="email"
          />
        </label>
        <label>
          <span>Имя получателя:</span> <br />
          {errors.name && <p className="validation-errors">{errors.name.message}</p>}
          <input
          {...register('name',
             {
              required: "Это поле не может быть пустым"}
            )}
           placeholder="Напиши имя в родительном падеже..."
            id="name"
            type="text"/>
        </label>
        <label>
          <span>Сообщение:</span>  <br />
            {errors.message && <p className="validation-errors">{errors.message.message}</p>}
          <textarea
           {...register('message',
            {
              required: "Это поле не может быть пустым",
              minLength: {value: 6, message: "Сообщение должно быть от 6 символов"}
            }
          )}
           placeholder="Напиши здесь своё поздравление..."
             />
        </label>
        <button disabled={!isValid} type="submit">Отправить!</button>

        {ok === 0 && <p style={{ color: "white" }}>{status}</p>}
        {ok === 1 && <p style={{ color: "greenyellow" }}>{status}</p>}
        {ok === 2 && <p style={{ color: "red" }}>{status}</p>}
      </form>
    </>
  )
}
export default Send;