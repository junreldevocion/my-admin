
import Head from 'next/head';
import Styles from '../../styles/css/login.module.css'

export default function Login() {
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
                    <h1 className="align-middle fs-1 fw-bold py-2"><span className="text-primary">My</span>admin</h1>
                    <hr />
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" name="email" required id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" name="password" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    {/* <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div> */}
                    <button name="login" className="w-100 btn btn-lg btn-primary text-light py-2" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
                </form>
            </div>
        </div>
        </>
    )
}