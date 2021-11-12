export const GameOption = ({ game }) => {
  const { name, id } = game
  return (
    <option value={`${id},${name}`} className="rounded-md">
       {name}
    </option>
  )
}
