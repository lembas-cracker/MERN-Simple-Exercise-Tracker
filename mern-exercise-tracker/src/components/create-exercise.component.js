import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../api.js'


export default function CreateExercise(props) {
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])

    const userInput = useRef()
    const navigate = useNavigate()

    //getting and showing all the users that have been added to the db so far in the dropdown menu
    useEffect(() => {
        axios.get(API_BASE_URL + '/users')
            .then(res => {
                if (res.data.length > 0) {
                    setUsers(res.data.map(user => user.username))
                    setUsername(res.data[0].username)
                }
            })
    }, [])


    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }
    const onChangeDuration = (e) => {
        setDuration(e.target.value)
    }
    const onChangeDate = (date) => {
        setDate(date)
    }


    const onSubmit = (e) => {
        e.preventDefault()
        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date
        }
        axios.post(API_BASE_URL + '/exercises/add', exercise).then(res => console.log(res.data))

        navigate('/')
    }



    return (
        <div>
            <h3>Create New Exercise!</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select ref={userInput}
                        required
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}>
                        {
                            users.map(user => {
                                return <option key={user} value={user} className="text-light bg-dark">
                                    {user}
                                </option>
                            })
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label>Description: </label>
                    <input
                        type='text'
                        required
                        className="form-control"
                        value={description}
                        onChange={onChangeDescription} />
                </div>

                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type='text'
                        className="form-control"
                        value={duration}
                        onChange={onChangeDuration} />
                </div>

                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={onChangeDate}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        value="Create Exercise Log"
                        className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}