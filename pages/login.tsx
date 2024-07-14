import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LoginPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const router = useRouter();

    const login = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert('Invalid email address');
            return;
        }
        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return
        }
        const url = 'https://loops-bookings-api.loops-transport.com:444/api/auths/login/email-password';
        const body = {
            email,
            password
        }
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const res = await axios.post(url, body, { headers });
            const { data } = res.data;
            window.localStorage.setItem('token', data.accessToken);
            router.push('/dashboard');
        } catch (error: any) {
            console.error(error);
            let message = ''
            if (error.response) {
                message = `[${error.response.status}] ${error.response.data.msg}`;
            } else {
                message = error.msg;
            }
            alert(message);
        }
    };

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="row w-100">
                    <div className="col-md-4 offset-md-4">
                        <div className="card shadow-sm">
                            <div className='card-header'>
                                <h1 className='card-title text-center mb-0'>Login</h1>
                            </div>
                            <div className="card-body">
                                <form onSubmit={login}>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="email-addon">
                                            <i className="bi bi-envelope"></i>
                                        </span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            aria-describedby="emailHelp"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="password-addon">
                                            <i className="bi bi-lock"></i>
                                        </span>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <br />
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                    >Login</button>
                                    <button type="button" className="btn btn-link w-100">Forgot password?</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
