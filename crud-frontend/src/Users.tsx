import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, fetchUsers as fetchUsersFromApi, getErrorMessage } from "./api";
import type { UserType } from "./types";

function Users() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [pendingDeleteUser, setPendingDeleteUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError("");
      setUsers(await fetchUsersFromApi());
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load users right now."));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchUsers();
  }, []);

  const handleDeleteUser = async () => {
    if (!pendingDeleteUser) {
      return;
    }

    try {
      setDeletingUserId(pendingDeleteUser.id);
      setError("");
      await api.delete(`/users/${pendingDeleteUser.id}`);
      setUsers((currentUsers) =>
        currentUsers.filter((user) => user.id !== pendingDeleteUser.id),
      );
      setPendingDeleteUser(null);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to delete the user."));
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <div className="app-shell d-flex justify-content-center align-items-center">
      <div className="app-panel border bg-white rounded p-3 shadow-sm">
        <div className="panel-header d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <h3 className="mb-0">Users</h3>
          <Link to="/create" className="btn btn-success">
            Add User
          </Link>
        </div>

        {error ? (
          <div className="alert alert-danger" role="alert" aria-live="polite">
            <div className="button-row">
              <span>{error}</span>
              <button className="btn btn-outline-danger btn-sm" onClick={() => void fetchUsers()}>
                Retry
              </button>
            </div>
          </div>
        ) : null}

        {isLoading ? (
          <div className="alert alert-info" role="status" aria-live="polite">
            Loading users...
          </div>
        ) : null}

        {!isLoading && users.length === 0 ? (
          <div className="alert alert-secondary mb-0">No users found yet.</div>
        ) : null}

        {!isLoading && users.length > 0 ? (
          <div className="table-wrap">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td className="actions-cell">
                      <button className="btn btn-primary" onClick={() => navigate(`/update/${user.id}`)}>
                        Update
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => setPendingDeleteUser(user)}
                        disabled={deletingUserId === user.id}
                      >
                        {deletingUserId === user.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>

      {pendingDeleteUser ? (
        <div className="danger-overlay" role="presentation">
          <div
            className="danger-dialog border bg-white rounded p-4 shadow"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
          >
            <h4 id="delete-dialog-title" className="mb-3">
              Delete user
            </h4>
            <p className="mb-3">
              Delete <strong>{pendingDeleteUser.name}</strong>? This action cannot be undone.
            </p>
            <div className="button-row">
              <button className="btn btn-outline-secondary" onClick={() => setPendingDeleteUser(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={() => void handleDeleteUser()}>
                Confirm delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Users;
