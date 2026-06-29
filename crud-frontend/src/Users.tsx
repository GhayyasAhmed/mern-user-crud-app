import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Users() {
    const [users, setUsers] = useState<UserType[]>([]);
    interface UserType {
        id: string;
        name: string;
        email: string;  
        age: number;
    }


    useEffect(() => {
        axios.get('http://localhost:3001/api/users')
        .then((res) => {
            setUsers(res.data.data as UserType[]);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const updateUser = (id: string) => {
        navigate(`/update/${id}`);
    }

    const handleDeleteUser = (id: string) => {
        console.log(id);

        axios.delete(`http://localhost:3001/api/users/${id}`)
            .then((res) => {
                console.log(res)
                console.log(res.data);
                const updatedUsers = users.filter(user => user.id !== id);
                setUsers(updatedUsers)
            })
            .catch((err) => {
                console.log(err);
            });
        // navigate(`/delete/${id}`);
    }

    const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
        <div className="w-50 border bg-white rounded p-3">
            <Link to="/create" className="btn btn-success float-end">Add User</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => updateUser(user.id)}>Update</button>
                                    <button className="btn btn-danger ms-2" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Users