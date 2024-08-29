import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/signup', { username, email, password });
            console.log(response.data);
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl mb-4">Sign Up</h2>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="mb-4 p-2 w-full border rounded"/>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mb-4 p-2 w-full border rounded"/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mb-4 p-2 w-full border rounded"/>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
