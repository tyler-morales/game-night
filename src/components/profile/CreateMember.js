import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { API, Auth } from 'aws-amplify'
import { createMember } from '../../graphql/mutations'

import { BsFillPersonPlusFill } from 'react-icons/bs'

const initialState = {
  name: '',
  saving: false,
}

export const CreateMember = ({ updateMembers, members }) => {
  const [toggleModal, setToggleModal] = useState(false)
  /* 1. Create local state with useState hook */
  const [formState, updateFormState] = useState(initialState)

  /* 2. onChangeText handler updates the form state when a user types int a form field */
  function onChangeText(e) {
    e.persist()
    updateFormState((currentState) => ({
      ...currentState,
      [e.target.name]: e.target.value,
    }))
  }

  /* 3. Upload member to db*/
  const addMember = async (e) => {
    e.preventDefault()

    try {
      const { name } = formState
      if (!name) return
      const { username } = await Auth.currentAuthenticatedUser()
      updateFormState((currentState) => ({ ...currentState, saving: true }))
      const memberId = uuid()
      const memberInfo = {
        name,
        id: memberId,
        owner: username,
        type: 'Member',
      }

      await API.graphql({
        query: createMember,
        variables: { input: memberInfo },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })

      updateMembers([...members, { ...memberInfo, owner: username }])
      updateFormState((currentState) => ({ ...currentState, saving: false }))
      updateFormState(initialState)
      setToggleModal(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleToggleModal = () => {
    setToggleModal(true)
  }

  const handleCancel = () => {
    setToggleModal(false)
  }

  return (
    // <div className="absolute top-1/3 left-1/2">
    // TOOO: Make into a modal
    <>
      {toggleModal && (
        <div className="w-max flex flex-col gap-3 bg-primary rounded-lg p-8 text-left">
          <div className="flex items-center gap-4">
            <BsFillPersonPlusFill size=".75em" />
            <h3 className="text-2xl">Add Member</h3>
          </div>
          <form onSubmit={addMember} className="mt-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm" htmlFor="member-name">
                Member's Name
              </label>
              <input
                name="name"
                onChange={onChangeText}
                value={formState.name}
                className="ring-offset-primary ring-offset-2 focus:ring-quad focus:outline-none focus:ring-2 text-base text-primary py-2 px-4 rounded-md max-w-xs"
                type="text"
                placeholder="Tim"
              />
            </div>
            <div className="flex gap-5 mt-8">
              <button
                onClick={handleCancel}
                className="transition-all ring-offset-primary ring-offset-2 focus:ring-error focus:outline-none focus:ring-2 text-lg rounded-md py-2 px-4 bg-error"
              >
                Cancel
              </button>
              <button className="transition-all ring-offset-primary ring-offset-2 focus:ring-tertiary focus:outline-none focus:ring-2 text-lg rounded-md py-2 px-4 text-primary bg-tertiary">
                Add Member
              </button>
            </div>
          </form>
          {formState.saving && (
            <p className="text-sm">Saving {formState.name}...</p>
          )}
        </div>
      )}
      <button
        onClick={handleToggleModal}
        className="transition-all focus:ring-white focus:outline-none focus:ring-2 text-xs uppercase mt-6 py-2 px-4 rounded-sm"
      >
        + Add a member
      </button>
    </>
    // </div>
  )
}
