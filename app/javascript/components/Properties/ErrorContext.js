import React from 'react'

export const ErrorContext = React.createContext({
  error: {key: '', severity: '', msg: ''},
  setError: () => {}
})

