
import { useState } from "react"
import Layout from "../../components/layouts"
import { isLoggedIn } from "../../util/auth"
import api from "../../util/api"

export default function Setting({token}) {

    const [formInput, setFormInput] = useState({oldpassword: '', npassword: '', confpassword: ''})

    const updateFormInput = (e) => {
        e.persist();
        setFormInput(prevState => ({...prevState, [e.target.name] : e.target.value}))

    }

    const submitFormInput = (e) => {
        e.preventDefault();

        api().post('api/update_password', formInput, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error.response.errors);
        })
    }

    return (
        <>
           <Layout title="setting" token={token}>
                <h1 className="h3 mb-3">Settings</h1>
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
                                            <input type="text" name="oldpassword" className="form-control" id="oldpassword"
                                                onChange={updateFormInput}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">New Password</label>
                                            <input type="text" name="password" className="form-control" id="password" 
                                                onChange={updateFormInput}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="confpassword" className="form-label">Confirm Password</label>
                                            <input type="text" name="confpassword" className="form-control" id="confpassword"
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
