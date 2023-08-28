import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then(res => res.data)

export const addNewAnecdote = async (anecdote) =>{
    if (anecdote.content.length < 5 ) throw new Error("You can't create anecdote under 5 characters")
    else return axios.post(baseUrl, anecdote).then(res => res.data)
}

export const updateAnecdote = (anecdote) => axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote).then(res => res.data)
