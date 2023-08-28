import { useMutation, useQueryClient } from "@tanstack/react-query"

import { addNewAnecdote } from "../services/anecdotes"
import { useContext } from "react"
import NotificationContext from "../notificationContex"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)


  const anecdoteMutation = useMutation({
    mutationFn: addNewAnecdote,
    mutationKey: ['anecdotes'],
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['anecdotes']}),
    onError: () => {
      notificationDispatch({ type: 'NOTIFY', payload: 'too short anecdote, must have length 5 or more'})
      setTimeout(() => notificationDispatch({ type: 'REMOVE_NOTIF' }), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    anecdoteMutation.mutate({ content, important: false })
    notificationDispatch({ type: 'NOTIFY', payload: `anecdote '${content}' created`})
    setTimeout(() => notificationDispatch({ type: 'REMOVE_NOTIF' }), 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
