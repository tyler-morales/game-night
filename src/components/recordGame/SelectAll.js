import { Field } from 'formik'

export const SelectAll = ({
  checked,
  setChecked
}) => {
  return (
    <div key={"selectAll"} className="wrapper">
      <Field
        type="checkbox"
        onClick={() => setChecked(!checked)}
        id={"selectAllPlayers"}
        name="players"
        value={checked}
        />
      <label
        htmlFor={'selectAllPlayers'}
        style={{fontSize: "0.8rem", padding: "2px 5px"}}
        className={`block h-full py-1 px-2 rounded-md transition-all border-2 border-quad text-base cursor-pointer ${
        checked ? 'bg-quad text-primary' : 'bg-transparent'}`}
      >
        Select All
      </label>
    </div>
  )
}
