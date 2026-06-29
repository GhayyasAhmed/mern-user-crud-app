import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, getErrorMessage } from "./api";
import type { UserType } from "./types";

function Users() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                setError("");
                const response = await api.get("/users");
                setUsers(response.data.data as UserType[]);
            } catch (err) {
                setError(getErrorMessage(err, "Unable to load users right now."));
            } finally {
                setIsLoading(false);
            }
        };

        void fetchUsers();
    }, []);

    const updateUser = (id: string) => {
        navigate(`/update/${id}`);
    };

    const handleDeleteUser = async (id: string) => {
        try {
            setDeletingUserId(id);
            setError("");
            await api.delete(`/users/${id}`);
            setUsers((currentUsers) => currentUsers.filter((user) => user.id !== id));
        } catch (err) {
            setError(getErrorMessage(err, "Unable to delete the user."));
        } finally {
            setDeletingUserId(null);
        }
    };

    const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="w-50 border bg-white rounded p-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">Users</h3>
                <Link to="/create" className="btn btn-success">Add User</Link>
            </div>
            {error ? <div className="alert alert-danger">{error}</div> : null}
            {isLoading ? <div className="alert alert-info">Loading users...</div> : null}
            {!isLoading && users.length === 0 ? (
                <div className="alert alert-secondary mb-0">No users found yet.</div>
            ) : null}
            {!isLoading && users.length > 0 ? (
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
                                    <button
                                        className="btn btn-danger ms-2"
                                        onClick={() => handleDeleteUser(user.id)}
                                        disabled={deletingUserId === user.id}
                                    >
                                        {deletingUserId === user.id ? "Deleting..." : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            ) : null}
        </div>
    </div>
  );
}

export default Users;
