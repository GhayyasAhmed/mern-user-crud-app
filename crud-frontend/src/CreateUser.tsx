import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, getErrorMessage } from "./api";
import { validateUserForm } from "./validation";

function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationError = validateUserForm({
            name,
            email,
            age: Number(age),
        });

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setIsSubmitting(true);
            setError("");
            await api.post("/users", {
                name: name.trim(),
                email: email.trim(),
                age: Number(age),
            });
            navigate("/");
        } catch (err) {
            setError(getErrorMessage(err, "Unable to create the user."));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="app-shell d-flex justify-content-center align-items-center">
            <div className="form-panel border bg-white rounded p-3 shadow-sm">
                <h3>Create User</h3>
                <form onSubmit={handleSubmit}>
                    {error ? <div className="alert alert-danger">{error}</div> : null}
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
                        <input type="number" placeholder="Enter age" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create"}
                    </button>
                    <Link to="/" className="btn btn-danger float-end ms-2">Cancel</Link>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
