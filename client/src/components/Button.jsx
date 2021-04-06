import React from 'react'
import '../styles/Button.css'

function Button(props) {

    var nameClass = "Button " + props.type;

    return (
        <button className={nameClass}>
            {props.name}
        </button>
    )
}

export default Button
