import { FC } from "react"
import { useState } from "react";
import axios from "axios"

const Send:FC = ()=> {
    const [to, setTo] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [ok, setOk] = useState<number>(0)
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setOk(0);
      setStatus('Отправка...');
      try {
        await axios.post('/api/send', { to, name, message });
        setStatus('Сообщение отправлено!');
        setOk(1)
        setTo('');
        setMessage('');
        setName('')
      } catch (error) {
        console.error('Ошибка при отправке:', error);
        setStatus(`Ошибка при отправке.` );
        setOk(2)
      }
    };
 return (
  <>
   <form onSubmit={handleSubmit}>
      <label>
        <span>Email получателя:</span> <br />
        <input placeholder="Напиши email того, кого хочешь поздравить..." id="email" type="email" value={to} onChange={e => setTo(e.target.value)} required/>
      </label>
      <label>
        <span>Имя получателя:</span> <br />
        <input placeholder="Напиши имя в родительном падеже..." type="text" value={name} onChange={e => setName(e.target.value)} required/>
      </label>
      <label>
        <span>Сообщение:</span>  <br />
        <textarea placeholder="Напиши здесь своё поздравление..." value={message} onChange={e => setMessage(e.target.value)} required/>
      </label>
      <button type="submit">Отправить!</button>
      
      {ok === 0 && <p style={{color:"black"}}>{status}</p>}
      {ok === 1 && <p style={{color:"greenyellow"}}>{status}</p>}
      {ok === 2 && <p style={{color:"red"}}>{status}</p>}
    </form>
  </>
 )
}
export default Send;