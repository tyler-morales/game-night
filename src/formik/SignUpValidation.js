import * as Yup from 'yup'

// Formik initial values
const SignUpValues = {
  username: '',
  email: '',
  password: '',
}

// Yup Schema
const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[A-Za-z0-9_-]*$/, 'Only letters and numbers allowed')
    .min(8, `🚨 Too short: Must be at least 8 characters`)
    .max(20, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, `🚨 Too short: Must be at least 8 characters`)
    .required('Required')
    .matches('[A-Za-z0-9]+', 'Must contain only letters and numbers'),
})

export { SignUpValues, SignUpSchema }
