import React from 'react'
import Draggable from 'react-draggable'; 
import './FloatingWidget.css'; 

type Props = {}

const FloatingWidget = (props: Props) => {
  return (
    <Draggable>
    <div className="floating-widget">
      {/* Widget content goes here */}
    </div>
  </Draggable>
  )
}

export default FloatingWidget