import React, { useState } from 'react'

import { Display } from './display'
import { ButtonGroup } from './buttonGroup'
import styles from './calculator.module.css'

export const Calculator = () => {
    const [number, setNumber] = useState(0)
    const [commands, setCommands] = useState("")
    const [clearNumber, setClearNumber] = useState(true)

    const numberFn = (n) => {
        setNumber(clearNumber ? n : number + n.toString())
        setClearNumber(false)     
    }

    const operatorFn = (op) => {
        setCommands(commands + number + op)
        setNumber(evaluate(commands + number))        
        setClearNumber(true)        
    }

    const equalFn = () => {
        setNumber(evaluate(commands + number))
        setCommands("") 
        setClearNumber(true)   
    }

    const plusMinusFn = () => {
        if (number[0] === "-") {
            setNumber(number.substr(1, number.length))
        } else {
            setNumber(`-${number}`)
        }
    }

    const bracketFn = (op) => {
        alert("Not implemented yet")
    }

    const evaluate = (str) => {
        // change variables (like pi) to real numbers first
        // then do bodmas
        let answer = str

        answer.replace("--", "+")
        answer.replace("+-", "-")

        const brackets = str.match(/\([^)]*\)/g)
        brackets?.map(str => evaluate(str)).forEach((value, i) => {
            answer = answer.replace(brackets[i], value)
        })

        const applyOperator = (str, operator, fn) => {
            const regexOp = operator === "-" ? operator : `\\${operator}`
            const regex = `\\d+(?:${regexOp}\\d+)+`

            str.match(regex)?.forEach(expression => {
                const value = expression
                    .split(operator)
                    .map(n => parseFloat(n))
                    .reduce((a, b) => fn(a, b))
                answer = answer.replace(expression, value)
            })

            return answer
        }

        answer = applyOperator(answer, "xⁿ", (a, b) => a ** b)
        answer = applyOperator(answer, "÷", (a, b) => a / b)
        answer = applyOperator(answer, "×", (a, b) => a * b)
        answer = applyOperator(answer, "+", (a, b) => a + b)
        answer = applyOperator(answer, "−", (a, b) => a - b)

        return answer
    }

    const NUMBERS = [7, 8, 9, 4, 5, 6, 1, 2, 3, "±", 0, "."]
    const BASIC = ["÷", "×", "+", "−", "="]
    const OTHER = ["xⁿ", "(", ")"]

    return (
        <div className={styles.container}>
            <Display number={number} commands={commands} />

            <div className={styles.buttons}>
                <div className={styles.other}>
                    <ButtonGroup 
                        buttons={OTHER} 
                        operatorFn={operatorFn} 
                        bracketFn={bracketFn} 
                    />
                </div>

                <div className={styles.numbers}>
                    <ButtonGroup 
                        buttons={NUMBERS} 
                        numberFn={numberFn} 
                        plusMinusFn={plusMinusFn}
                    />
                </div>

                <div className={styles.basic}>
                    <ButtonGroup 
                        buttons={BASIC} 
                        operatorFn={operatorFn} 
                        equalFn={equalFn} 
                    />
                </div>
            </div>
        </div>
    )
}