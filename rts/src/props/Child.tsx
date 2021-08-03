import React from 'react'
interface ChildProps {
  color: string;
  onClick?: () => void;
}
export const Child = ({ color, onClick }: ChildProps) => {
  return (
    <div>
      {color}
      {onClick && <button onClick={onClick}>Click me</button>}
    </div>

  )
}


export const ChildAsFC: React.FC<ChildProps> = ({ color, onClick, children }) => {
  return (
    <div>
      {color}
      {onClick && <button onClick={onClick}>Click me</button>}
      {children}
    </div>

  )
}

