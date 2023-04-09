import React, { useState } from "react";
import axios from 'axios'
import { API_BASE_URL } from '../api.js'

export default function CreateUser() {
    const [username, setUsername] = useState('')


    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const user = {
            username: username
        }
        console.log(user)

        axios.post(API_BASE_URL + '/users/add', user).then(res => console.log(res.data))

        setUsername('')
    }


    return (
        <div>
            <h3>Create a User!</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                        type='text'
                        required
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername} />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create User"
                        className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}