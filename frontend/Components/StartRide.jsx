import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import axios from 'axios';

const StartRide = (props) => {
  const [otp, setOtp] = useState('');
  const [visible, setVisible] = useState(props.start);

  useEffect(() => {
    gsap.to('.start-ride', {
      top: visible ? '30%' : '100%',
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        if (!visible) {
          props.setStart(false);
          props.setFinish(true);
        }
      }
    });
  }, [visible]);

  async function handleStartRide(e) {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        rideId: props.ride._id,
        otp: otp,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.status === 200) {
        setVisible(false);
      }
    } catch (error) {
      console.error('Error starting ride:', error);
    }
  }

  return (
    <div className='start-ride absolute bg-white top-[100%] left-0 w-full h-[70%] flex flex-col rounded-t-lg overflow-y-auto'>
      {/* Rider Name */}
      <div className='w-full h-[20vw] bg-yellow-400 flex flex-col justify-center items-center rounded-t-lg border-b-2 font-bold text-[8vw] border-black'>
        {props.ride.user.fullName.firstName} {props.ride.user.fullName.lastName}
      </div>

      {/* Pickup */}
      <div className='w-full px-4 flex justify-between items-center border-b-2 border-black' style={{height: '13vh'}}>
        <h3 className='text-[5vw] font-bold'>Pickup :</h3>
        <h3 className='max-w-[40%] max-h-[55%] whitespace-normal overflow-hidden'>{props.ride.pickup}</h3>
      </div>

      {/* Drop */}
      <div className='w-full px-4 flex justify-between items-center border-b-2 border-black' style={{height: '13vh'}}>
        <h3 className='text-[5vw] font-bold'>Drop :</h3>
        <h3 className='max-w-[40%] max-h-[55%] whitespace-normal overflow-hidden'>{props.ride.destination}</h3>
      </div>

      {/* Fare */}
      <div className='w-full pt-6 text-[8vw] font-bold flex justify-center items-center'>
        ₹{props.ride.fare}
      </div>

      {/* OTP Form */}
      <form
        className='w-full flex flex-col items-center gap-8 mt-6 mb-6'
        onSubmit={handleStartRide}
      >
        <div className="w-full max-w-md mx-auto flex flex-col items-center border-4 border-black rounded-2xl px-8 bg-white shadow-2xl" style={{ paddingBottom: '2rem' }}>
          <label className="text-3xl font-bold mb-6" htmlFor="otp-input">
            Enter OTP
          </label>
          <input
            id="otp-input"
            type="text"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="rounded-lg px-8 text-4xl text-center outline-none w-full mb-8"
            required
            style={{
              border: '2px solid #000',
              borderRadius: '0.5rem',
              fontSize: '1.5rem',
              textAlign: 'center',
              outline: 'none',
              width: '80%',
              marginBottom: '2rem'
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#22c55e',
              color: '#fff',
              padding: '0.5rem 2rem',
              borderRadius: '0.5rem',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              width: '60%',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            Start Ride
          </button>
        </div>
      </form>
    </div>
  );
};

export default StartRide;
