import React from 'react';
import RazorpayCheckout from './components/RazorpayCheckout';
import ChatWindow from './components/ChatWindow';

export default function App(){
  return (
    <div className="app">
      <header className="hero">
        <h1>KAI — Your Pocket Genius</h1>
        <p>Created by Kaushik</p>
      </header>
      <main className="main-grid">
        <aside className="sidebar">
          <div className="card">Chat</div>
          <div className="card">Tools</div>
          <div className="card">Avatar</div>
        </aside>
        <section className="content">
          <ChatWindow />
          <RazorpayCheckout />
        </section>
      </main>
    </div>
  );
}
