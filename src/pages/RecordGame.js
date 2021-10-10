import { Dashboard } from '../layout/Dashboard'
import protectedRoute from './protectedRoute'

import { RecordGameForm } from '../components/recordGame/RecordGameForm'
import useUser from '../hooks/useUser'

function RecordGame() {
  const { user } = useUser()

  return (
    <Dashboard>
      <h1>Record a Game</h1>
      {user === null ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-8 flex flex-col gap-3 bg-primary p-5 md:p-8 text-left rounded-lg shadow-lg w-full md:w-96 m-auto">
          <RecordGameForm />
        </div>
      )}
    </Dashboard>
  )
}

export default protectedRoute(RecordGame, '/sign-in')
