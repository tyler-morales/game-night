export const serverErrorOptions = (error, setServerError) => {
  switch (error) {
    case 'UsernameExistsException':
      setServerError('Username exists. Please try something different')
      break

    case 'UserNotFoundException':
      setServerError('Account name is not recognized')
      break

    default:
      setServerError('Server Error. Please try again later')
      break
  }
}
