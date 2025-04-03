import React from 'react'
import { useLocation } from 'react-router-dom'

function ShowProject() {

  const {state} = useLocation();

  return (
    <div>showProject</div>
  )
}

export default ShowProject