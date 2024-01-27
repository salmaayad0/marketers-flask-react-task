import React, { FC, useEffect, useState } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { INSTRUCTIONS, DEACTIVE_STYLE, ACTIVE_STYLE } from "../styles/style"
import Section from "../components/Section";
import ErrMsg from "../components/ErrMsg";
import Form from "../components/Form";
import LabelInput from "../components/LabelInput";
import axios from "axios";
import Taps from "../components/Taps";
import { useNavigate } from "react-router";


const SIGNUP_URL = `http://127.0.0.1:5000/signup`;

const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const SignUp: FC = () => {
  const navigate = useNavigate()

  const [errMsg, setErrMsg] = useState<string>('')

  const [username, setusername] = useState<string>('')
  const [validName, setvalidName] = useState<boolean>(false)
  const [userFocus, setuserFocus] = useState<boolean>(false)

  const [email, setEmail] = useState<string>('')
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [emailFocus, setEmailFocus] = useState<boolean>(false);

  const [password, setpassword] = useState<string>("");
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState<string>("");
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);


  useEffect(() => {
    const result = USER_REGEX.test(username);
    setvalidName(result);
  }, [username]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPwd(result);

    const match = password === matchPwd;
    setValidMatch(match);
  }, [password, matchPwd]);

  useEffect((): void => setErrMsg(""), [email, password, username]);

  const clearForm = () => {
    setusername("");
    setpassword("");
    setMatchPwd("");
  };


  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
       await axios.post(SIGNUP_URL,
        JSON.stringify({ username, email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      ).then(response => {
        if (response.status === 201 && response.data.message === 'user created') {
          clearForm()
          navigate('/');
        }
      }).catch(err=>{
        if (err.response.status === 409) {
          setErrMsg('email already exist')
        }
      })

    } catch (error) { 
      setErrMsg('server error ')
    }

  }

  return (
    <Section>
      <Taps />
      <ErrMsg errMsg={errMsg} />
      <Form onSubmit={handleSubmit} >
        <LabelInput
          text='User Name'
          type='text'
          id='username'
          name='username'
          value={username}
          onChange={(e) => setusername(e.target.value)}
          onFocus={() => setuserFocus(true)}
          onBlur={() => setuserFocus(false)}
        />
        <p
          id="uidnote"
          className={
            username && userFocus && !validName
              ? INSTRUCTIONS
              : "hidden"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />{' '}
          3 to 24 charachter are allowed length <br />
          must start with a letter, letters, numbers,
          <br />
          spcial charachters (_&%$#@) are allowed
        </p>

        <LabelInput
          text='Email'
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />

        <p
          id="eidnote"
          className={
            email && emailFocus && !validEmail
              ? INSTRUCTIONS
              : "hidden"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />{" "}
          email must have <br /> (@ .com or .net) at the end
        </p>

        <LabelInput
          text='Password'
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={e => setpassword(e.target.value)}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p
          id="pwdidnote"
          className={pwdFocus && !validPwd
            ? INSTRUCTIONS
            : "hidden"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />{' '}
          8 to 24 characters, must include
          <br />
          uppercase and lowercase letters,<br /> number and special character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>

        <LabelInput
          text='Password'
          type='password'
          id='confirmedpassword'
          name='password'
          value={matchPwd}
          onChange={e => setMatchPwd(e.target.value)}
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="confirmidnote"
          className={
            matchFocus && !validMatch
              ? INSTRUCTIONS
              : "hidden"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />{" "}
          Must match the first password input field.
        </p>


        <button
          type="submit"
          disabled={!validName || !validPwd || !validMatch ? true : false}
          className={
            !validName || !validPwd || !validMatch
              ? DEACTIVE_STYLE
              : ACTIVE_STYLE
          }
        >
          Sign Up
        </button>
      </Form>      
    </Section>
  );
};

export default SignUp;
