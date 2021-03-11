import React from 'react'

import styles from './buttonGroup.module.css'

export const ButtonGroup = (props) => {

    let buttons = props.buttons.map(symbol => {
        let fn
        let className

        if (!isNaN(symbol) || symbol === ".") {
            fn = props.numberFn
            className = styles.number
        } else if (symbol === "=") {
            fn = props.equalFn
            console.log(props)
            className = styles.equal
        } else if (symbol === "±") {
            fn = props.plusMinusFn
            className = styles.number
        } else if (symbol === "(" || symbol === ")") {
            fn = props.bracketFn
            className = styles.operator
        } else {
            fn = props.operatorFn
            className = styles.operator
        }

        return (
            <button 
                key={symbol} 
                onClick={() => fn(symbol)}
                className={className}
            >
                {symbol}
            </button>
        ) 
    })

    return <>{buttons}</>
}