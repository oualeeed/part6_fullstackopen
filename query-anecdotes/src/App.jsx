import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './services/anecdotes'
import NotificationContext, { NotificationContextProvider } from './notificationContex'
import { useContext } from 'react'





const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)


  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({ type: 'NOTIFY', payload: `anecdote '${anecdote.content}' voted`})
    setTimeout(() => notificationDispatch({ type: 'REMOVE_NOTIF' }), 5000)
  }

  const anecdotes = result.data

  if(result.isLoading) {
    return (<div>Loading the data ... </div>)
  }

  if(result.isError) {
    return (<div>Anecdote service not available due to problems in the server.</div>)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}


export default App
