import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import BackButton from '../components/BackButton'
import Spiner from '../components/Spiner'
import {getTicket,closeTicket} from '../features/tickets/ticketSlice'
import {getNotes,reset as notesReset,createNote} from '../features/notes/notesSlice'
import { useParams,useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import NoteItem from '../components/NoteItem'
import Modal from 'react-modal'
import {FaPlus} from 'react-icons/fa' 

const customStyles={
  content:{
    width:'600px',
    top:'50%',
    left:'50%',
    right:'auto',
    bottom:'auto',
    marginRight:'-50%',
    transform:'translate(-50%,-50%)',
    position:'relative',
  }
}
Modal.setAppElement('#root')


function Ticket() {
  const [modalIsOpen,setModalIsOpen] =useState(false)
  const [noteText,setNoteText]=useState('')
  const {ticket,isLoading,isSucces,isError,message} = useSelector((state)=>state.tickets)
  const {notes, isLoading: notesIsLoading} = useSelector((state)=>state.notes)

  const params=useParams()
  const dispatch= useDispatch()
  const {ticketId} =useParams()
  const navigate =useNavigate()


  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))
  },[isError,message,dispatch,ticketId])

//Close ticket 
const onTicketClose = () =>{
  dispatch( closeTicket(ticketId))
  toast.success('Ticket Closed')
  navigate('/tickets')
}

//Create note submit
const onNoteSubmit = (e) =>{
  e.preventDefault()
   dispatch(createNote({noteText,ticketId}))
  closeModal()
}

const openModal = () =>setModalIsOpen(true)
const closeModal = () =>setModalIsOpen(false)

  if (isLoading || notesIsLoading) {
       return <Spiner/>
  }
  if (isError) {
    return <h3>Is error</h3>
  }
  return (
   <div className="ticket-page">
    <header className="ticket-header">
      <BackButton url="/tickets" />
      <h2>
        ticket Id: {ticket._id}
        <span className={`status status-${ticket.status}`}>
        {ticket.status}
      </span>        
      </h2>
      <h3>
        Date Submitted :{new Date(ticket.createdAt).toLocaleString('en-US')}
      </h3>
      <h3>Product: {ticket.product}</h3>
      <hr />
      <div className="ticket-desc">
        <h3>Description of issue</h3>
        <p>{ticket.description}</p>
      </div>
      <h2>Notes</h2>
      {notes._id}
    </header>
    {ticket.status !== 'closed' && (
      <button className='btn' onClick={openModal}><FaPlus/>Add Note</button>
    )}
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Add note'>
      <h2>Add Note</h2>
      <button className="btn-close" onClick={closeModal}>X</button>
      <form onSubmit={onNoteSubmit}>
        <div className="form-group">
          <textarea className='form-control'
           placeholder='Note Text'
            onChange={(e)=>setNoteText(e.target.value)}
             value={noteText}
             name="noteText"
             id="noteText">
          </textarea>
        </div>
        <div className="form-group">
          <button className="btn" onSubmit={onNoteSubmit}>Submit</button>
        </div>
      </form>
    </Modal>
    {notes.map((note)=>
      <NoteItem key={note._id} note={note} />
    )}
    {ticket.status !== 'closed' && (
      <button className="btn btn-block btn-danger " onClick={onTicketClose}>Close Tiket</button>
    )}
   </div>
  )
}

export default Ticket