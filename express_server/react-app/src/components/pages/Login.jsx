import React, { useState } from 'react';
import pierogi from "../assets/pierogi.png";
import { AuthData } from "../../auth/AuthWrapper"

export default function Login() {
    const { login } = AuthData();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const doLogin = async () => {

        try {

            await login(formData.username, formData.password)

        } catch (error) {

            setErrorMessage(error)

        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-cyan-300 to-blue-900">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-4">
                    <img className="w-16 h-16 mr-2" src={pierogi} alt="Pierogi" />
                    <h2 className="text-2xl font-bold">Login</h2>
                </div>
                <form onSubmit={doLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
                </form>
            </div>
        </div>
    );
}
