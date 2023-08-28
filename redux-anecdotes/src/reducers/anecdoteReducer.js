import { createSlice } from "@reduxjs/toolkit"
import comparator from "../utils/comparator"
import anecdoteService from "../services/anecdotes"



const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    return dispatch(setAnecdotes(anecdotes.sort(comparator)))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    return dispatch(appendAnecdote(anecdote))
  }
}

export const upVote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.update(anecdote.id, {...anecdote, votes: anecdote.votes + 1})
    return dispatch(initializeAnecdotes())
  }
}


export default anecdoteSlice.reducer