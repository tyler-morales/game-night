export const GameOption = ({ game }) => {
  return (
    <option value={game.id} className="rounded-md">
       {game.name}
    </option>
  )
}
