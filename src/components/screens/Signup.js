import React, { useState } from 'react';
import { Link , useHistory } from 'react-router-dom';
import M from 'materialize-css'

const Signup = () => {

const history = useHistory()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const Postdata = () => {
        fetch("/signup", {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password

            })

        }).then(res => res.json())
            .then(data => {
                if (data.error) {

                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else{
                    M.toast({ html: data.message, classes: "#69f0ae green accent-2" })
                    history.push('/signin')
                }
            }).catch(
                error=>{console.log(error)
                }
                
                
            )
    }

    return (

        <div className="mycard">
            <div className="card auth-card  input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)
                } />
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2" onClick={() => Postdata()} >Signup

                </button>
                <h6> <Link to="/login">Already have an account?</Link> </h6>


            </div>
        </div>
    )
}

export default Signup