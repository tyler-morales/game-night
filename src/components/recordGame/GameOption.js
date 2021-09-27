export const GameOption = ({ game }) => {
  return (
    <option value={game.name} className="rounded-md">
      {game.name}
    </option>
  )
}
