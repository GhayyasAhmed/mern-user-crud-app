import React, { useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';

function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserType | null>(null);
    interface UserType {
        id: string;
        name: string;
        email: string;  
        age: number;
    }
    useEffect(() => {
        axios.get(`http://localhost:3001/api/users/${id}`)
        .then((res) => {
            setUser(res.data.data as UserType);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(user);
        axios.patch(`http://localhost:3001/api/users/${id}`, { name: user.name, email: user.email, age: user.age })
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
                <h3>Update User</h3>
                <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" placeholder="Enter name" className="form-control" id="name" value={user?.name} onChange={(e) => setUser((prev) => ({...prev, name: e.target.value}))} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" placeholder="Enter email" className="form-control" id="email" value={user?.email} onChange={(e) => setUser((prev) => ({...prev, email: e.target.value}))} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="number" placeholder="Enter age" className="form-control" id="age" value={user?.age} onChange={(e) => setUser((prev) => ({...prev, age: Number(e.target.value)}))} />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                    <Link to="/" className="btn btn-danger float-end ms-2">Cancel</Link>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser