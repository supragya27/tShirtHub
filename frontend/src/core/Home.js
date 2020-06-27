import React from 'react'
import '../styles.css'
import { API } from '../backend'
import Base from './Base'
function Home() {
    console.log("API IS ", API)
    return (
        <div>
            <Base title="Home Page" description="Welcome to the tShirt store!">
                <h1 className="text-white">Hello front end</h1>
            </Base>
        </div>
    )
}

export default Home
