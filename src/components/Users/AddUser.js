import React, { useState, useRef } from 'react'
import Card from '../UI/Card'
import classes from './AddUser.module.css'
import Button from '../UI/Button'
import ErrorModal from '../UI/ErrorModal'
import Wrapper from '../Helpers/Wrapper'

const AddUser = (props) => {

    const nameInputRef = useRef()
    const ageInputRef = useRef()
    // const [enteredUsername, setEnteredUsername] = useState('')
    // const [enteredAge, setEnteredAge] = useState('')
    const [error, setError] = useState()

    const addUserHandler = (event) => {

        event.preventDefault()
        const enteredName = nameInputRef.current.value
        const enteredUserAge = ageInputRef.current.value

        if (enteredUserAge.trim().length === 0 || enteredName.trim().length === 0) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid name and age (non-empty) values'
            })
            return
        }
        if (+enteredUserAge < 1) {
            setError({
                title: 'Invalid Age',
                message: 'Please enter a valid age (>0 )'
            })
            return
        }

        props.onAddUser(enteredName, enteredUserAge)
        nameInputRef.current.value=''
        ageInputRef.current.value=''
        // setEnteredUsername('')
        // setEnteredAge('')
    }

    // const usernameChangeHandler = (event) => {
    //     setEnteredUsername(event.target.value)
    // }

    // const ageChangeHandler = (event) => {
    //     setEnteredAge(event.target.value)
    // }

    const errorHandler = () => {
        setError(null)
        // setEnteredUsername('')
        // setEnteredAge('')
    }

    return (
        <Wrapper>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}></ErrorModal>}
            {/* <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}></ErrorModal> */}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username"
                        type="text"
                        // value={enteredUsername}
                        // onChange={usernameChangeHandler}
                        ref={nameInputRef}
                    ></input>
                    <label htmlFor="age">Age (Years)</label>
                    <input
                        id="age"
                        type="number"
                        // value={enteredAge}
                        // onChange={ageChangeHandler}
                        ref={ageInputRef}
                    ></input>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Wrapper>
    )
}

export default AddUser