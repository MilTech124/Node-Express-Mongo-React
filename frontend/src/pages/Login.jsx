import React from 'react'
import {useState,useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import {login,reset} from '../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'
import Spiner from '../components/Spiner'

function Login() {
    const [formData, setFormData] =useState({     
        email:'',
        password:'',     
    })
    const {email, password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user,isLoading,isError,isSuccess,message} = useSelector(state => state.auth)

    const onChange = (e) =>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        //Redirect when loged in
        if (isSuccess || user) {
          navigate('/')  
        }
        dispatch(reset())
    },[isError,isSuccess,user,message,navigate,dispatch]) 

    const onSubmit = (e) => {
        e.preventDefault() 
        const userData ={
            email,
            password
        }
        dispatch(login(userData))

    }

    if(isLoading){
        return <Spiner/>
    }
  return (
    <>
        <section className="heading">
            <h1>
                <FaSignInAlt/>Login
            </h1>
            <p>Please Log in</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>              
                <div className="form-group">
                    <input 
                    type="email"
                    name="email"
                    id="email"
                    value={email} 
                    onChange={onChange} 
                    className="form-controll"
                    placeholder='Enter your email' 
                    required/>
                </div>
                <div className="form-group">
                    <input 
                    type="password"
                    name="password"
                    id="password"
                    value={password} 
                    onChange={onChange} 
                    className="form-controll"
                    placeholder='Your password'
                    required />
                </div>                           
                <div className="form-group">
                    <button className="btn btn-block">Submit</button>
                </div>
                
            </form>
        </section>
    </>
  )
}

export default Login