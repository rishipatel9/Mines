import axios from 'axios';
import  { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';


const Login = () => {
  const history=useNavigate();

  useEffect(()=>{
    const isLoggedin=async()=>{
      const res=await axios.post('http://localhost:3000/game');
      console.log(res);
      if(res.status===200){
          history('/game');
      }
    }
    isLoggedin()
  },[])


  const [random, setRandom] = useState(false);  
  const [name,setName]=useState("");

  const getRandomUsername=()=>{
    return "user"+Math.floor(Math.random()*10000);
  }

  axios.defaults.withCredentials = true;
  
  const sendUsername=async(name:string)=>{
    let username=name;
    if(name==""){
      username = getRandomUsername()
    }
    try {
      // console.log(username);
      const res = await axios.post("http://localhost:3000/user/createuser", { username });
      // console.log(res);
      history("/game")
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }
  return (
    <div className='bg-[#1A2C38] lg:h-[100vh] lg:w-[100vw] md:h-[100vh] md:w-[100vw] sm:h-[100vh] sm:w-[100vw] h-[100vh] w-[100vw] flex justify-center items-center ' >
      <div className="lg:h-[60%] lg:w-[60%] md:h-[55%] md:w-[60%] sm:h-[60%]  w-[70%] h-[60%]  bg-[#203844] shadow-xl">
        {/* xl:h-[70%] xl:w-[70%] lg:h-[70%] lg:w-[60%] md:h-[10%] md:w-[100%] sm:h-[70%] sm:w-[70%] bg-[#203844] flex justify-center items-center flex-col p-10 */}
        <div className="p-10">
          <p className="text-[#00E800] text-7xl text-center "><b>Mines</b></p>
        </div>
        <div className="p-10 w-[100%] flex justify-center items-center flex-col">
          {!random && <p className="text-left font-bold text-[#B2BBD3]"> Get your Username</p>}
          {random && <p className="text-left font-bold text-[#B2BBD3]"> Username</p>}
          {random && <input  value={name} onChange={(e) => setName(e.target.value)} className="bg-[#1A2C38] lg:h-10 lg:w-[50%] md:h-14 md:w-[60%] sm:w-[70%] sm:h-14 h-8 w-[100%]  outline-[#304553] border border-[#304553] text-white shadow-md font-bold" type="text" />}
        </div>
        <div className="lg:p-5 flex lg:w-full ">
          <button className="lg:h-[50px] lg:w-[50%] md:h-[60px] md:w-[50%] sm:h-[60px] sm:w-[50%]  h-[55px] w-[60%] m-5 mt-10 font-bold rounded-sm lg:m-10 bg-[#00E800] shadow-lg hover:bg-[#00b300] transition-all" onClick={()=>sendUsername("")}  >Random</button>
          <button className="lg:h-[50px] lg:w-[50%] md:h-[60px] md:w-[50%] sm:h-[60px] sm:w-[50%]  h-[55px] w-[60%] m-5 mt-10 font-bold rounded-sm lg:m-10 bg-[#00E800] shadow-lg hover:bg-[#00b300] transition-all" onClick={() => {
            random ? setRandom(false) : setRandom(true)
            random && sendUsername(name) 
          }}>{random ? <p>Continue</p> : <p>Custom</p>}</button>
        </div>
        <div>
        </div>
      </div>

    </div>
  )
}
export default Login

