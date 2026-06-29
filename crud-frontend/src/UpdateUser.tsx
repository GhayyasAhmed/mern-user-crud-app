import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, getErrorMessage } from "./api";
import type { UserType } from "./types";

function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            if (!id) {
                setError("User ID is missing.");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError("");
                const response = await api.get(`/users/${id}`);
                setUser(response.data.data as UserType);
            } catch (err) {
                setError(getErrorMessage(err, "Unable to load the user."));
            } finally {
                setIsLoading(false);
            }
        };

        void fetchUser();
    }, [id]);

    const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!id || !user) {
            setError("User details are not ready yet.");
            return;
        }

        try {
            setIsSubmitting(true);
            setError("");
            await api.patch(`/users/${id}`, user);
            navigate("/");
        } catch (err) {
            setError(getErrorMessage(err, "Unable to update the user."));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="w-50 border bg-white rounded p-3 shadow-sm">
                <h3>Update User</h3>
                {error ? <div className="alert alert-danger">{error}</div> : null}
                {isLoading ? <div className="alert alert-info">Loading user...</div> : null}
                <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            className="form-control"
                            id="name"
                            value={user?.name ?? ""}
                            onChange={(e) => setUser((prev) => (prev ? { ...prev, name: e.target.value } : prev))}
                            disabled={isLoading || !user || isSubmitting}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="form-control"
                            id="email"
                            value={user?.email ?? ""}
                            onChange={(e) => setUser((prev) => (prev ? { ...prev, email: e.target.value } : prev))}
                            disabled={isLoading || !user || isSubmitting}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input
                            type="number"
                            placeholder="Enter age"
                            className="form-control"
                            id="age"
                            value={user?.age ?? ""}
                            onChange={(e) => setUser((prev) => (prev ? { ...prev, age: Number(e.target.value) } : prev))}
                            disabled={isLoading || !user || isSubmitting}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isLoading || !user || isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update"}
                    </button>
                    <Link to="/" className="btn btn-danger float-end ms-2">Cancel</Link>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
