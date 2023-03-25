import React from 'react'
import  { Outlet, useOutletContext } from 'react-router-dom'

const Show = () => { 
  const {currentProperty, setCurrentProperty} = useOutletContext()
  const {currentUnit, setCurrentUnit} = useOutletContext()

  return ( 
    <>
      <Outlet
        context={{
          currentProperty, setCurrentProperty,
          currentUnit, setCurrentUnit
        }}
      />
    </>
  )


}

export default Show

