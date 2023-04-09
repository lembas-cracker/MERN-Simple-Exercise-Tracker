import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../api.js'


const Exercise = props => {
    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0, 10)}</td>
            <td>
                <Link to={'/edit/' + props.exercise._id}>edit</Link> |<a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
            </td>
        </tr>
    )
}



export default function ExercisesList() {
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        axios.get(API_BASE_URL + '/exercises/')
            .then(res => {
                setExercises(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])


    const deleteExercise = (id) => {
        axios.delete(API_BASE_URL + '/exercises/' + id)
            .then(res => console.log(res.data))

        setExercises(exercises.filter(el => el._id !== id))
    }
    const exercisesList = () => {
        return exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={deleteExercise} key={currentExercise._id} />
        })
    }

    return (
        <div>
            <h3>All Logged Exercises!</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{exercisesList()}</tbody>
            </table>
        </div>
    )
}