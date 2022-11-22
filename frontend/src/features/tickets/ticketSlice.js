import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

import ticketService from './ticketService'


const initialState={
    tickets:[],
    ticket:{},
    isError:false,
    isSucces:false,
    isLoading:false,
    message:''
}
//Create a ticket
export const createTicket = createAsyncThunk('tickets/create',async(ticketData,thunkAPI)=>{
    try {
        const token =thunkAPI.getState().auth.user.token
        return await ticketService.createTicket(ticketData,token)
    } catch (error) {
        const message = (error.ersponse && error.response.data && error.reponse.data.message)
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
//Get User Tickets
export const getTickets = createAsyncThunk('tickets/getAll',async(_,thunkAPI)=>{
    try {
        const token =thunkAPI.getState().auth.user.token
        return await ticketService.getTickets(token)
    } catch (error) {
        const message = (error.ersponse && error.response.data && error.reponse.data.message)
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get User Ticket
export const getTicket = createAsyncThunk('tickets/get',async(ticketId,thunkAPI)=>{
    try {
        const token =thunkAPI.getState().auth.user.token
        return await ticketService.getTicket(ticketId,token)
    } catch (error) {
        const message = (error.ersponse && error.response.data && error.reponse.data.message)
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Close Ticekt
export const closeTicket = createAsyncThunk('tickets/close',async(ticketId,thunkAPI)=>{
    try {
        const token =thunkAPI.getState().auth.user.token
        return await ticketService.closeTicket(ticketId,token)
    } catch (error) {
        const message = (error.ersponse && error.response.data && error.reponse.data.message)
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const ticketSlice = createSlice({
    name:'ticket',
    initialState,
    reducers:{       
            reset:(state)=>initialState
    },
        extraReducers:(builder) =>{
            builder
            .addCase(createTicket.pending,(state) =>{
                state.isLoading = true
            })
            .addCase(createTicket.fulfilled,(state) =>{
                state.isLoading = false
                state.isSucces = true
            })
            .addCase(createTicket.rejected,(state,action) =>{
                state.isLoading = false
                state.isError = true
                state.isError = action.payload
            })

            //getTickets
            .addCase(getTickets.pending,(state) =>{
                state.isLoading = true
            })
            .addCase(getTickets.fulfilled,(state,action) =>{
                state.isLoading = false
                state.isSucces = true
                state.tickets = action.payload
            })
            .addCase(getTickets.rejected,(state,action) =>{
                state.isLoading = false
                state.isError = true
                state.isError = action.payload
            })
                //getTicket
                .addCase(getTicket.pending,(state) =>{
                state.isLoading = true
            })
            .addCase(getTicket.fulfilled,(state,action) =>{
                state.isLoading = false
                state.isSucces = true
                state.ticket = action.payload
            })
            .addCase(getTicket.rejected,(state,action) =>{
                state.isLoading = false
                state.isError = true
                state.isError = action.payload
            })
            .addCase(closeTicket.fulfilled,(state,action) =>{
                state.isLoading = false
                state.tickets.map((ticket)=>ticket._id===action.payload 
                ? (ticket.status ='closed')
                : ticket)
                
            })
        }
    
})
export const {reset} = ticketSlice.actions
export default ticketSlice.reducer