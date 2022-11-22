import React from 'react'
import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createTicket,reset} from '../features/tickets/ticketSlice'
import Spiner from '../components/Spiner'
import BackButton from '../components/BackButton'


function NewTicket() {
    const {user} = useSelector((state)=>state.auth)
    const {isLoading,isError,isSucces,message} = useSelector((state)=>state.tickets)
    const [name] = useState(user.name)
    const [email]= useState(user.email)
    const [product,setProduct]= useState('phone')
    const [description,setDescription]= useState(user.email)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (e) =>{
        e.preventDefault()
        dispatch(createTicket({product,description}))
    }

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        
        if(isSucces){
            dispatch(reset())
            navigate('/tickets')
        }
        dispatch(reset())
    },[dispatch,isError,isSucces,navigate,message])

    if(isLoading){
        return <Spiner />
    }
   
  return (
    <>
    <BackButton/>
        <section className="heading">
            <h1>Create New Ticket</h1>
            <p>Please fill out the form Below</p>
        </section>
        <section className='form' >
            <div className="form-group">
                <label htmlFor="name">Customer Name</label>
                <input type="text" className='form-control' value={name}  disabled/>
            </div>  
            <div className="form-group">
                <label htmlFor="name">Customer email</label>
                <input type="text" className='form-control' value={email}  disabled/>
            </div>    
            <form onSubmit={onSubmit}>
                <div className="form-group">
                <label htmlFor="product">Product</label>
                    <select name="product" id="product" value={product} onChange={(e)=>setProduct(e.target.value)}>
                        <option value="phone">phone</option>
                        <option value="iMac">iMac</option>
                        <option value="iPad">iPad</option>
                    </select>
                </div>   
                <div className="form-group">
                    <label htmlFor="description">Description of the issue</label>
                    <textarea className='form-control' name="description" id="description" cols="30" rows="10" onChange={(e)=>{
                        setDescription(e.target.value)
                    }}></textarea>
                </div>
                <div className="form-group">
                    <button className="btn btn-block">Submit</button>
                </div>
            </form>      
        </section>
    </>
  )
}

export default NewTicket