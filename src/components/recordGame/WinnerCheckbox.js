import { Field } from 'formik'

export const WinnerCheckbox = ({
  player,
  index,
  checkedWinnerStatus,
  checkedStatus,
  checkboxStatus,
}) => {
  return (
    <div key={index} className="wrapper">
      <Field
        type="checkbox"
        onClick={() => checkboxStatus(index, 'WINNERS')}
        id={player.id}
        name="winners"
        value={player.id}
        disabled={!checkedStatus[index]}
      />
      <label
        htmlFor={player.id}
        className={`block h-full py-1 px-2 rounded-md transition-all border-2 border-quad text-base ${
          checkedWinnerStatus[index] ? 'bg-quad text-primary' : 'bg-transparent'
        } ${
          !checkedStatus[index]
            ? 'opacity-40 cursor-not-allowed'
            : 'cursor-pointer'
        }`}
      >
        {player.name}
      </label>
    </div>
  )
}
