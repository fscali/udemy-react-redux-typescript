import React from 'react'
import { ChildAsFC } from './Child'
function Parent() {
  return <ChildAsFC color={'yellow'} onClick={() => console.log("you clicked")}>
    abcdef
  </ChildAsFC>

}

export default Parent
