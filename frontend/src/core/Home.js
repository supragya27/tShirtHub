import React from 'react'
import '../styles.css'
import { API } from '../backend'

function Home() {
    console.log("API IS ", API)
    return (
        <div>
            <h1>Hello front end</h1>
        </div>
    )
}

export default Home
