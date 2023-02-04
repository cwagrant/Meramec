import React from 'react'
import { Box, FormControl, OutlinedInput, Input, InputLabel, InputAdornment, MenuItem, Select, TextField } from '@mui/material'
import { centsToDollars } from '../DataFormatHelpers'

const FormFields = (props) => {

  const [name, setName] = React.useState('')

  React.useEffect( () => {
    setName(props.values?.name || '')
  }, [props.values])

  return (
    <>
      <Box sx={{ display: 'flex'}}>
        <TextField required
          id="name"
          label="Name"
          name="name"
          placeholder="Name"
          sx={{width: 1}}
          value={name}
          onChange={(event) => {setName(event.target.value)}}
        />
      </Box>
    </>
  )
}

export default FormFields
