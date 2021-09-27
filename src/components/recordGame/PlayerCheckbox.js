import { Field } from 'formik'
import '../../styles/checkboxStyles.css'

export const PlayerCheckbox = ({
  player,
  index,
  checkedStatus,
  checkboxStatus,
}) => {
  return (
    <div key={index} className="wrapper">
      <Field
        type="checkbox"
        onClick={() => checkboxStatus(index, 'PLAYERS')}
        id={player.name}
        name="players"
        value={player.name}
      />
      <label
        htmlFor={player.name}
        className={`block h-full py-1 px-2 rounded-md transition-all border-2 border-quad text-base cursor-pointer ${
          checkedStatus[index] ? 'bg-quad text-primary' : 'bg-transparent'
        }`}
      >
        {player.name}
      </label>
    </div>
  )
}
