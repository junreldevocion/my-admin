
import { useState } from 'react';
import Head from 'next/head';
import Styles from '../../styles/css/login.module.css'
import {isLoggedIn, logIn} from '../../util/auth'
import api from '../../util/api'

export default function Login() {

    const [formInput, setFormInput] = useState({email:'', password:''});
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [badCredsError, setBadCredsError] = useState('');


    const updateFormInput = (e) => {
        e.persist();
        setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const submitFormInput = (e) => {
        e.preventDefault();
        api().get('/sanctum/csrf-cookie').then(() => {
            api().post('api/login', formInput).then(response => {
                logIn(response.data.token, response.data.user.name)
            })
            .catch(error => {
                setErrorEmail('')
                setErrorPassword('')
                setBadCredsError('')
                if (error.response.status === 422) {
                    if (typeof error.response.data.errors.email !== 'undefined') {
                        setErrorEmail(error.response.data.errors.email[0])
                    }
                    if (typeof error.response.data.errors.password !== 'undefined') {
                        setErrorPassword(error.response.data.errors.password[0])
                    }
                    if (typeof error.response.data.errors.message !== 'undefined') {
                        setBadCredsError(error.response.data.errors.message[0])
                    }
                }
            });
        });
    }

    return (
        <>
        <Head>
            <title>Login</title>
            <meta name="description" content="Sign in here" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="d-flex justify-content-center align-items-center min-vh-100 text-center">
            <div className={`${Styles.form_signin}`}>
                <form>
                    <h1 className="align-middle fs-1 fw-bold py-2"><span className="text-primary">My</span>Admin</h1>
                    <hr />
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    <div className={`alert alert-danger ${ !! !badCredsError ? 'd-none' : ''}`}>
                        {badCredsError}
                    </div>
                    <div className="form-floating text-start">
                        <input type="email" className={`form-control ${ !!errorEmail || !!badCredsError ? 'is-invalid' : ''}`} name="email" required id="floatingInput" 
                        placeholder="name@example.com" 
                        onChange={updateFormInput}
                        />
                        <div className={`py-2 ${ !!errorEmail ? 'invalid-feedback' : ''}`}>
                            {errorEmail}
                        </div>
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating text-start">
                        <input type="password" className={`form-control ${ !!errorPassword || !!badCredsError ? 'is-invalid' : ''}`} name="password" id="floatingPassword" 
                        placeholder="Password" 
                        onChange={updateFormInput}
                        />
                        <div className={`py-2 ${ !!errorPassword ? 'invalid-feedback' : ''}`}>
                            {errorPassword}
                        </div>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button onClick={submitFormInput} name="login" className="w-100 btn btn-lg btn-primary text-light py-2" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">© 2021–2021</p>
                </form>
            </div>
        </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const cookie = isLoggedIn(context?.req?.headers.cookie || '')

    if ( cookie.isLoggedIn ) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return { props: JSON.parse(JSON.stringify(cookie)) };
}