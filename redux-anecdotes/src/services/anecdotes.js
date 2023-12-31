import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const anecdote = {content, votes: 0}
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const update = async (id, newAnecdote) => {
  const response = await axios.put(`${baseUrl}/${id}`, newAnecdote)
  return response.data
}
const anecdoteService = { getAll, createNew, update }
export default anecdoteService