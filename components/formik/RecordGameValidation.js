import * as Yup from 'yup'

// Formik initial values
const RecordGameValues = {
  gamePlayed: '',
  players: [],
  winners: [],
}

// Yup validation
const RecordGameSchema = Yup.object().shape({
  gamePlayed: Yup.string().required('Required'),
  players: Yup.array().min(2),
  winners: Yup.array().min(1),
})

export { RecordGameValues, RecordGameSchema }
