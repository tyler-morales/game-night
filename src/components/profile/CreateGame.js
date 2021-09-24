import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { API, Auth } from 'aws-amplify'
import { AnimatePresence } from 'framer-motion'

import { createGame } from '../../graphql/mutations'

import useModal from '../../hooks/useModal'
import Modal from '../global/modal/Modal'

const initialState = {
  name: '',
  saving: false,
}

export const CreateGame = ({ updateGames, games }) => {
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

  /* 3. Upload game to db*/
  const addGame = async (e) => {
    e.preventDefault()

    try {
      const { name } = formState
      if (!name) return
      const { username } = await Auth.currentAuthenticatedUser()
      updateFormState((currentState) => ({ ...currentState, saving: true }))

      const gameId = uuid()
      const gameInfo = {
        name,
        id: gameId,
        owner: username,
        type: 'Game',
      }

      await API.graphql({
        query: createGame,
        variables: { input: gameInfo },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })

      updateGames([...games, { ...gameInfo, owner: username }])
      updateFormState((currentState) => ({ ...currentState, saving: false }))
      updateFormState(initialState)
      close()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {modalOpen && (
          <Modal
            modalOpen={modalOpen}
            handleClose={close}
            addGame={addGame}
            onChangeText={onChangeText}
            formState={formState}
            type='ADD_GAME'
          />
        )}
      </AnimatePresence>

      <button
        onClick={open}
        className="transition-all focus:ring-white focus:outline-none focus:ring-2 text-xs uppercase mt-6 py-2 px-4 rounded-sm"
      >
        + Add a game
      </button>
    </>
  )
}
