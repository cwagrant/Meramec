import React from 'react'
import  { Outlet, useOutletContext, useParams, useLoaderData} from 'react-router-dom'

const Show = () => { 
  const {currentProperty, setCurrentProperty} = useOutletContext()
  const {currentUnit, setCurrentUnit} = useOutletContext()
  const loaderData = useLoaderData()

  console.log(loaderData)
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

