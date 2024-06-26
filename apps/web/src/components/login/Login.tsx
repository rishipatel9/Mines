import axios from 'axios';
import  { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';


const Login = () => {
  const [loading,setLoading]=useState(false);
  const history=useNavigate();

  useEffect(()=>{
    const isLoggedin=async()=>{
      const res=await axios.post('http://localhost:3000/game');
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
      setLoading(true)
      await axios.post("http://localhost:3000/user/createuser", { username });
      setLoading(false)
      history("/game")
    } catch (error) {
      console.error("Error creating user:", error);
      setLoading(false)
    }
  }
  return (
    <div className='bg-[#1A2C38] lg:h-[100vh] lg:w-[100vw] md:h-[100vh] md:w-[100vw] sm:h-[100vh] sm:w-[100vw] h-[100vh] w-[100vw] flex justify-center items-center relative' >
      {loading && <div className='absolute inset-0 bg-black opacity-50'></div>}
   {loading &&  <div className='absolute  text-white text-4xl ' >
    <div role="status">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#00E800]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
    </div>}
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

