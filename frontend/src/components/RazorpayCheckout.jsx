import React, { useState } from 'react';

export default function RazorpayCheckout(){
  const [loading, setLoading] = useState(false);

  async function createOrder(){
    const res = await fetch((import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000') + '/create-order', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ amountINR: 199 })
    });
    return res.json();
  }

  async function openCheckout(){
    setLoading(true);
    try{
      const order = await createOrder();
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || '<RAZORPAY_KEY_ID>',
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'KAI Premium',
        description: 'Monthly Subscription ₹199',
        handler: async function(response){
          // verify on server
          await fetch((import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000') + '/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: 'demo_user_1'
            })
          });
          alert('Payment verified (demo).');
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    }catch(err){
      console.error(err);
      alert('Checkout error: '+ err.message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div style={{marginTop:20}}>
      <button onClick={openCheckout} disabled={loading} className="btn">{loading ? 'Please wait...' : 'Buy Premium ₹199/month'}</button>
    </div>
  );
}
