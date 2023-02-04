import React from 'react'
import { Breadcrumbs, Link, Typography } from '@mui/material'

const Crumbs = ({currentProperty, currentUnit}) => {
  const hasProperty = !!currentProperty?.id
  const hasUnit = !!currentUnit?.id

  return (
    <>
      <Breadcrumbs className="" sx={{mb:1}}>
        { hasProperty &&
            <Link underline="hover" color="inherit" href="/properties">
              Properties
            </Link>
        }

        { hasProperty && !hasUnit &&
            <Typography color="text.primary">{currentProperty.name}</Typography>
        }

        { hasUnit &&
            <Link underline="hover" color="inherit" href={"/properties/"+currentProperty.id}>
            {currentProperty.name}
            </Link>
        }

        { hasUnit &&
            <Typography color="text.primary">{currentUnit.name}</Typography>
        }
      </Breadcrumbs>
    </>
  )
}

export default Crumbs

