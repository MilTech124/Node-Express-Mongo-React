import React from 'react'
import {useState,useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import {register,reset} from '../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'
import Spiner from '../components/Spiner'



function Register() {
    const [formData, setFormData] =useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })
    const {name, email, password, password2} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user,isLoading,isSuccess,isError,message} = useSelector(state => state.auth)

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

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()

        if (password!==password2){
            toast.error('Password do not match')
        }else{
            const userData ={
                name,
                email,
                password
            }
            dispatch(register(userData))
        }

    }

    if(isLoading){
        return <Spiner/>
    }
  return (
    <>
        <section className="heading">
            <h1>
                <FaUser/>Register
            </h1>
            <p>Please create an account</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                    type="text"
                    name="name"
                    id="name"
                    value={name} 
                    onChange={onChange} 
                    className="form-controll"
                    placeholder='Enter your Name' 
                    required/>
                </div>
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
                    <input 
                    type="password"
                    name="password2"
                    id="password2"
                    value={password2} 
                    onChange={onChange} 
                    className="form-controll"
                    placeholder='Confirm your Password' 
                    required/>
                </div>
                
                <div className="form-group">
                    <button className="btn btn-block">Submit</button>
                </div>
                
            </form>
        </section>
    </>
  )
}

export default Register