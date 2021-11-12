import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { API, Auth } from 'aws-amplify'
import { AnimatePresence } from 'framer-motion'

import { createMember } from '../../graphql/mutations'

import useModal from '../../hooks/useModal'
import Modal from '../../components/global/modal/Modal'

const initialState = {
  name: '',
  saving: false,
}

export const CreateMember = ({ updateMembers, members }) => {
  // Modal state
  const { modalOpen, close, open } = useModal()

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
      close()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <AnimatePresence initial={false} exitBeforeEnter>
        {modalOpen && (
          <Modal
            modalOpen={modalOpen}
            handleClose={close}
            addMember={addMember}
            onChangeText={onChangeText}
            formState={formState}
            type="ADD_MEMBER"
          />
        )}
      </AnimatePresence>

      <button
        onClick={open}
        className="transition-all focus:ring-white focus:outline-none focus:ring-2 text-xs uppercase mt-6 py-2 px-4 rounded-sm"
      >
        + Add a member
      </button>
    </>
  )
}
