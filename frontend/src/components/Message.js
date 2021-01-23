import React from 'react'
import {Alert} from 'react-bootstrap'



export const Message = ({varient,children}) => {
    return (
        <Alert className='alertMsg' variant={varient}>
            {children}
        </Alert>
    )
}
Message.defaultProps={
    varient:'info'
}
