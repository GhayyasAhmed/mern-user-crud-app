import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CreateUser() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [age, setAge] = useState<number | undefined>(undefined);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name, email, age);
        axios.post('http://localhost:3001/api/users', { name, email, age })
            .then((res) => {
                console.log(res)
                console.log(res.data);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="w-50 border bg-white rounded p-3">
                <h3>Create User</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" placeholder="Enter name" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" placeholder="Enter email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="number" placeholder="Enter age" className="form-control" id="age" value={age} onChange={(e) => setAge(Number(e.target.value))} />
                    </div>
                    <button type="submit" className="btn btn-primary">Create</button>
                    <Link to="/" className="btn btn-danger float-end ms-2">Cancel</Link>
                </form>
            </div>
        </div>
    )
}

export default CreateUser