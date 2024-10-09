import React, {ReactElement} from 'react';
import {useNavigate} from 'react-router-dom';

async function loginFunc(event: React.MouseEvent<HTMLButtonElement>, navigate: ReturnType<typeof useNavigate>) {
    event.preventDefault();
    const input = {
        user: document.getElementById('username') as HTMLInputElement | null,
        pass: document.getElementById('password') as HTMLInputElement | null
    };
    if (input.user && input.pass) {
        const json = {user: input.user.value, pass: input.pass.value},
            body = JSON.stringify(json);

        console.log("test:", body);

        const response = await fetch('/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body
        });
        console.log(response.status);
        if (response.status === 200) {
            alert("Login Successful");
            localStorage.setItem('user', input.user.value);
            navigate('/dashboard');
            window.location.reload();   // update the header
        } else {
            alert("Login failed");
        }
    }
}

const newLogin = async function (event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const input = {
        user: document.getElementById('username') as HTMLInputElement | null,
        pass: document.getElementById('password') as HTMLInputElement | null
    };
    if (input.user && input.pass) {
        const json = {user: input.user.value, pass: input.pass.value},
            body = JSON.stringify(json);

        const response = await fetch('/newLogin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body
        });

        if (response.status === 200) {
            alert("New Login Created");
        } else {
            alert("No New Login Created");
        }
    }
}

export default function Login(): ReactElement {
    const navigate = useNavigate();

    return (
        <div className="flex-vertical container min-w-full">
            <form className="m-auto">
                <h1 className="sm:text-mg lg:text-xl p-3 m-auto mt-3 text-center">Login or Create New Account</h1>
                <div className="field m-auto w-3/4">
                    <p className="control has-icons-left has-icons-right">
                        <input
                            className="input p-2 mt-3 mb-3 rounded-md w-full focus:bg-gray-100 focus:border-bottom focus:border-gray-600 focus:transition-300"
                            id="username" type="text"
                            name="username" placeholder="Username"/>
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                          <i className="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div className="field m-auto w-3/4">
                    <p className="control has-icons-left">
                        <input
                            className="input p-2 mt-3 mb-3 rounded-md w-full focus:bg-gray-100 focus:border-bottom focus:border-gray-600 focus:transition-300"
                            id="password" type="password"
                            name="password" placeholder="Password"/>
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-center">
                    <button id="login" type="button"
                            className="button p-2 m-2 rounded-md border-gray-600 border-solid border-2 hover:bg-gray-600 hover:text-white duration-100 focus:bg-gray-600 focus:text-white"
                            onClick={(e) => loginFunc(e, navigate)}>Login
                    </button>
                    <button id="newLogin" type="button"
                            className="button p-2 m-2 rounded-md border-gray-600 border-solid border-2 hover:bg-gray-600 hover:text-white duration-100 focus:bg-gray-600 focus:text-white"
                            onClick={newLogin}>Create New Login
                    </button>
                </div>
            </form>
        </div>
    );
}