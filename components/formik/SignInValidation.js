import * as Yup from 'yup'

// Formik initial values
const SignInValues = {
  username: '',
  password: '',
}

// Yup Schema
const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[A-Za-z0-9_-]*$/, 'Only letters and numbers allowed')
    .min(8, `🚨 Too short: Must be at least 8 characters`)
    .max(20, '🚨 Too Long: Must be less than 20 characters')
    .required('🚨 Required'),
  password: Yup.string()
    .min(8, `🚨 Too short: Must be at least 8 characters`)
    .required('🚨 Required')
    .matches('(?=.*?[0-9]).+', '🚨 Must contain at least one number')
    .matches('(?=.*?[A-Za-z]).+', '🚨 Must contain at least one letter'),
})

export { SignInValues, SignInSchema }
