import React, { FC, useEffect, useState } from 'react'
import { DEACTIVE_STYLE, ACTIVE_STYLE } from "../styles/style"
import Form from '../components/Form'
import Section from '../components/Section'
import LabelInput from '../components/LabelInput'
import axios from 'axios'
import ErrMsg from '../components/ErrMsg'
import Taps from '../components/Taps'
import { useNavigate } from 'react-router'


const LOGIN_URL = `http://127.0.0.1:5000/login`;

const Login: FC = () => {
    const navigate = useNavigate()

    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ errMsg, setErrMsg ] = useState<string>('')

    const clearForm = (): void => {
        setEmail("");
        setPassword("");
    };

    useEffect((): void => setErrMsg(""), [email, password]);

    const handleSubmit = async(e: React.SyntheticEvent<HTMLFormElement>) =>{
        e.preventDefault()
        try {
             await axios.post(LOGIN_URL, 
                JSON.stringify({ email, password }),
                {
                    headers: {  "Content-Type": "application/json" },
                    withCredentials: true,
                },
            ).then( response => {
                if (response.status === 200 && response.data.message === 'user loggedin') {
                    clearForm()
                    navigate('/home')
                }
            }).catch(err => {
                if (err.response.status === 401) {
                    setErrMsg('wrong password')
                }
                else if (err.response.status === 404) {
                    setErrMsg('user not found')
                }
            })
        } 
        catch (error) {
            setErrMsg('server error')
        }
    }
 
    return (
      <Section>
        <Taps />
        <ErrMsg errMsg={errMsg} />
            <Form onSubmit={handleSubmit}>
              <LabelInput 
                 text='Email'
                 type='email' 
                 id='email'
                 name='email'
                 value={email}
                 onChange={e => { setEmail(e.target.value) }}
                 />
              <LabelInput
                  text='Password'
                  type='password'
                  id='password'
                  name='password'
                  value={password}
                  onChange={e => { setPassword(e.target.value) }}
              />
              
              <button
                  type="submit"
                  disabled={!password || !email ? true : false}
                  className={
                        !password || !email
                            ? DEACTIVE_STYLE
                            : ACTIVE_STYLE
                    }
              >
                  Sign In
              </button>
          </Form>

      </Section>
  )
}

export default Login