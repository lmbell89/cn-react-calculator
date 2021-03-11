import React from 'react'

import styles from './display.module.css'

export const Display = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.commands}>{props.commands}</div>
            <div className={styles.number}>{props.number}</div>
        </div>
    )
}