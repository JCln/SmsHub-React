import React from 'react';
import { Login } from './components/login';
import { Button } from './components/Button';
import { Input } from './components/Input';
import 'tailwindcss';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className='text-3xl font-bold underline'>
        hello
      </h1>
      <Login></Login>
      <Button onClick={(e) => {
        e.preventDefault();
        console.log(e);
      }}
      >
        this is login
      </Button>
      <Input></Input>
    </div >
  );
}

export default App;
