import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
/* Breadcrumb Nav
 *
 * Only show breadcrumbs for the previous object
 *
 * e.g. if at properties/1/units/1 we only would want to
 * see the Properties > {Property.Name}
 *
 */
const Breadcrumbs = ({currentProperty, currentUnit}) => {
  const hasProperty = !!currentProperty?.id
  const hasUnit = !!currentUnit?.id

  return (
    <>
      <Breadcrumb className="">

    { hasProperty &&
        <Breadcrumb.Item className="h4" href="/properties">Properties</Breadcrumb.Item>
    }

    { hasUnit &&
        <Breadcrumb.Item className="h4" href={"/properties/"+currentProperty.id}>
          {currentProperty.name}
        </Breadcrumb.Item>
    }

    { (hasUnit && false) &&
        <Breadcrumb.Item className="h4" href={"/properties/"+currentProperty.id + "/units/" + currentUnit.id}>
          {currentUnit.name}
        </Breadcrumb.Item>
    }
      </Breadcrumb>
    </>
      
  )

}

export default Breadcrumbs

// To do what I'm wanting to do here we'll need to set it up so that
// we have a context set in properties/index.jsx.
//
// We might even have multiple, bu tfor now that is where we will set
// the [currentProperty, setCurrentProperty] part of useState
//
// Then we can use that context further down and even set it when we
// click on a particular property in the listing page.
  //
  // todo - might want to make it so that instead of breadcrumbs on smaller pages
  // we do something different. Either
