import React, { useState } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper'

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const { name, email, password, error, success } = values

    const handleChange = nam => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    })
                }
            })
            .catch(console.log("Error in signup"))
    }

    const signUpForm = () => {
        return (
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label className="text-light">Name</label>
                        <input className="form-control"
                            onChange={handleChange("name")} type="text" />
                    </div>

                    <div className="form-group">
                        <label className="text-light">Email</label>
                        <input className="form-control"
                            onChange={handleChange("email")} type="email" />
                    </div>

                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <input onChange={handleChange("password")}
                            className="form-control" type="password" />
                    </div>

                    <button className="btn btn-success btn-block">Submit</button>
                </form>
            </div>
        )
    }
    return (
        <Base title="Sign-up Page" description="A page for user to sign up!">

            {signUpForm()}
        </Base>
    )
}

export default Signup