import React from 'react'

function ForgotPasswordSubmit(props) {
  return (
    <div>
      <input
        name="confirmationCode"
        placeholder="Confirmation code"
        onChange={(e) => {
          e.persist()
          props.updateFormState(e)
        }}
      />
      <input
        name="password"
        placeholder="New password"
        type="password"
        onChange={(e) => {
          e.persist()
          props.updateFormState(e)
        }}
      />
      <button onClick={props.forgotPasswordSubmit} title="Save new password" />
    </div>
  )
}

export default ForgotPasswordSubmit
