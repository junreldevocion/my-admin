
import { useState } from 'react';
import Head from 'next/head';
import Styles from '../../styles/css/login.module.css'
import {isLoggedIn, logIn} from '../../util/auth'
import api from '../../util/api'

export default function Login() {

    const [formInput, setFormInput] = useState({email:'', password:''});

    const updateFormInput = (e) => {
        e.persist();
        setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const submitFormInput = (e) => {
        e.preventDefault();
        api().get('/sanctum/csrf-cookie').then(() => {
            api().post('api/login', formInput).then(response => {
                logIn(response.data.token, response.data.user.name)
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

                    <div className="form-floating">
                        <input type="email" className="form-control" name="email" required id="floatingInput" 
                        placeholder="name@example.com" 
                        onChange={updateFormInput}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" name="password" id="floatingPassword" 
                        placeholder="Password" 
                        onChange={updateFormInput}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    {/* <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div> */}
                    <button onClick={submitFormInput} name="login" className="w-100 btn btn-lg btn-primary text-light py-2" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
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