export const RecordGameErrors = ({ errors, touched, type }) => {
  let responses = {
    gamePlayed: 'Please select a game',
    players: 'Please select at least two players',
    winners: 'Please select at least one winner',
  }

  return errors[type] && touched[type] ? (
    <div className="text-sm text-error">🚨 {responses[type]}</div>
  ) : null
}
