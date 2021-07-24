
import { useState } from "react"
import Layout from "../../components/layouts"
import { isLoggedIn, logIn } from "../../util/auth"
import api from "../../util/api"

export default function ChangePassword({token}) {

    const [formInput, setFormInput] = useState({oldpassword: '', password: '', password_confirmation: ''})

    const updateFormInput = (e) => {
        e.persist();
        setFormInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
    }

    const submitFormInput = (e) => {
        e.preventDefault();

        api().post('api/update_password', formInput, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            logIn(response.data.token, response.data.user.name)
        })
        .catch(error => {
            if (error.response.status === 422) {
                console.log(error.response.data.errors);
                const errors = error.response.data.errors;
                

                const object = {
                    "oldpassword": [
                        "The oldpassword field is required."
                    ],
                    "password": [
                        "The password field is required."
                    ],
                    "password_confirmation": [
                        "The password confirmation field is required."
                    ]
                }

                Object.keys(object).map(function(item, index) {
                    console.log(item);
                })
            }

        })
    }

    return (
        <>
           <Layout title="Change Password" token={token}>
                <h1 className="h3 mb-3">Change Password</h1>
                    <div className="row">
						<div className="col-6 offset-md-3">
							<div className="card">
								<div className="card-header">
									<h5 className="card-title mb-0"></h5>
								</div>
								<div className="card-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="oldpassword" className="form-label">Old Password</label>
                                            <input type="password" name="oldpassword" className="form-control is-invalid" id="oldpassword"
                                                onChange={updateFormInput}
                                            />
                                            <div id="oldpasswordFeedback" className="invalid-feedback">
                                                Please provide a valid city.
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">New Password</label>
                                            <input type="password" name="password" className="form-control" id="password" 
                                                onChange={updateFormInput}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
                                            <input type="password" name="password_confirmation" className="form-control" id="password_confirmation"
                                                onChange={updateFormInput}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <button className="btn btn-primary" onClick={submitFormInput} type="submit">Change Password</button>
                                        </div>
                                    </form>
								</div>
							</div>
						</div>
					</div>
           </Layout>
        </>
    )
}

export async function getServerSideProps(context) {
    const cookie = isLoggedIn(context?.req?.headers.cookie || '')
    
    if ( !cookie.isLoggedIn && !cookie.token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }


    return { props: JSON.parse(JSON.stringify(cookie)) };
}
