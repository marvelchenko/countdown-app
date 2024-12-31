import React from 'react';
import './App.css';
import CountDown from './CountDown';
import Loading from './Loading';


function App() {
  const newYear = new Date('January 1, 2025 00:00:00').getTime();



  return (
    <>
    <div className='w-full h-[100vh] flex flex-wrap flex-col gap-4 items-center justify-center'>
      
      <h1 className='text-2xl font-semibold text-center text-white'>Countdown to the New Year 2025</h1>
      <CountDown newYear={newYear} />
      < Loading />
    </div>
    </>
  );
}

export default App;
