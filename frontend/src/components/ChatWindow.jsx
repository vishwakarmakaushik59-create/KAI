import React, { useState } from 'react';

export default function ChatWindow(){
  const [messages, setMessages] = useState([{id:1, sender:'kai', text:'Hey! I am KAI. Test me.'}]);
  const [text, setText] = useState('');
  function send(){
    if(!text) return;
    setMessages(prev=>[...prev, {id:Date.now(), sender:'user', text}]);
    setText('');
  }
  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map(m=>(
          <div key={m.id} className={'msg '+ (m.sender==='kai' ? 'ai' : 'user')}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="composer">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type something..." />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
