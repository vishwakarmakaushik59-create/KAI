/**
 * backend/index.js
 * Minimal Node/Express server with Razorpay order creation, verify endpoint and webhook stub.
 * Fill .env with your keys before running.
 */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razor = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});

// Health
app.get('/', (req,res)=> res.send('KAI backend running'));

// Create order (amount in INR)
app.post('/create-order', async (req,res)=>{
  try{
    const amountINR = Number(req.body.amountINR) || 199;
    const options = {
      amount: Math.round(amountINR * 100),
      currency: 'INR',
      receipt: 'rcpt_' + Date.now()
    };
    const order = await razor.orders.create(options);
    return res.json(order);
  } catch(err){
    console.error('create-order error', err);
    return res.status(500).json({ error: err.message });
  }
});

// Verify payment (client sends razorpay_* fields)
app.post('/verify-payment', async (req,res)=>{
  try{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;
    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
      return res.status(400).json({ ok:false, error: 'missing params' });
    }
    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if(generated_signature !== razorpay_signature){
      return res.status(400).json({ ok:false, error: 'invalid signature' });
    }

    // TODO: persist payment to DB (Firestore) and mark user premium.
    // For demo we just return success.
    console.log('Payment verified for user:', userId, razorpay_payment_id);
    return res.json({ ok:true, message: 'payment verified' });
  } catch(err){
    console.error('verify-payment error', err);
    return res.status(500).json({ ok:false, error: err.message });
  }
});

// Webhook endpoint (raw)
app.post('/webhook', express.raw({ type: 'application/json' }), (req,res)=>{
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
  const signature = req.headers['x-razorpay-signature'];
  const expected = crypto.createHmac('sha256', webhookSecret).update(req.body).digest('hex');
  if(signature !== expected){
    console.warn('Invalid webhook signature');
    return res.status(400).end();
  }
  const event = JSON.parse(req.body.toString());
  console.log('Webhook event received:', event.event);
  // TODO: handle payment.captured etc.
  return res.status(200).end();
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log('KAI backend listening on', PORT));
