// import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {Policia} from './Policia';
import {Leja} from './Leja';
import {Vaksina} from './Vaksina';
import {Navigation} from './Navigation';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
     Departamenti i Policise
     </h3>

     <Navigation/>

     <Routes>
       <Route path='/' element={<Home/>} exact/>
       <Route path='/Policia' element={<Policia/>}/>
       <Route path='/Leja' element={<Leja/>}/>
       <Route path='/Vaksina' element={<Vaksina/>}/>
       </Routes>
    
    </div>
    </BrowserRouter>
  );
}
export default App;
