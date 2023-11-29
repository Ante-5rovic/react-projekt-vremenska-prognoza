import React from 'react'
import Draggable from 'react-draggable'; 
import './FloatingWidget.css'; 

type Props = {}

//ne kosristi se ali je zanimljivo pa sam ostavi za možda neku funkcionalnost u buducnosti

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