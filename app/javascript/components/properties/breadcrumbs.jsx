import React from 'react'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import { Link as RouterLink, useMatches } from 'react-router-dom'

const Breadcrumb = (props) => (
  <Link component={RouterLink} underline="hover" color="inherit" to={props.to}>
    {props.name}
  </Link>
)

const fetchName = (data, name) => {
  return (name in data) ? data[name] : name
}

const Crumbs = ({currentProperty, currentUnit}) => {
  const hasProperty = !!currentProperty?.id
  const hasUnit = !!currentUnit?.id

  const matches = useMatches()
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))

  console.log(matches)

  const dynamicNames = {
    "{property}": currentProperty?.name,
    "{unit}": currentUnit?.name
  }

  return (
    <>
      <Breadcrumbs className="" sx={{mb:1}}>
        {crumbs.map((data, index) => {
          let last = crumbs.length - 1
          let path = data.pathname
          let name = fetchName(dynamicNames, data.handle.crumb?.name)

          if (index < last){
            return (
              <Link 
                component={RouterLink}
                key={index}
                underline="hover"
                color="inherit"
                to={path}
              >
                {name}
              </Link>
            )
          } else {
            return (
              <Typography
                key={index}
                color="text.primary"
              >
               {name}
              </Typography>
            )
          }
        })}
      </Breadcrumbs>
    </>
  )
}

export default Crumbs

