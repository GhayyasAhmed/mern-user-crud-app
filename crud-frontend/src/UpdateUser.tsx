import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, getErrorMessage } from "./api";
import UserForm from "./components/UserForm";
import { setFlashMessage } from "./notifications";
import { getUserFormErrors } from "./validation";

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    age?: string;
    form?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMissing, setIsMissing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setErrors({ form: "User ID is missing." });
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrors({});
        setIsMissing(false);
        const response = await api.get(`/users/${id}`);
        const user = response.data.data;
        setValues({
          name: user.name ?? "",
          email: user.email ?? "",
          age: String(user.age ?? ""),
        });
      } catch (error) {
        const message = getErrorMessage(error, "Unable to load the user.");
        setErrors({ form: message });
        setIsMissing(message.toLowerCase().includes("not found"));
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUser();
  }, [id]);

  const handleChange = (field: "name" | "email" | "age", value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
      form: undefined,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      setErrors({ form: "User ID is missing." });
      return;
    }

    const fieldErrors = getUserFormErrors({
      ...values,
      age: Number(values.age),
    });

    if (fieldErrors.name || fieldErrors.email || fieldErrors.age) {
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});
      await api.patch(`/users/${id}`, {
        name: values.name.trim(),
        email: values.email.trim(),
        age: Number(values.age),
      });
      setFlashMessage({
        text: "User updated successfully.",
        type: "success",
      });
      navigate("/");
    } catch (error) {
      setErrors({
        form: getErrorMessage(error, "Unable to update the user."),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isMissing && !isLoading) {
    return (
      <div className="app-shell d-flex justify-content-center align-items-center">
        <div className="form-panel border bg-white rounded p-3 shadow-sm">
          <div className="alert alert-warning mb-3" role="alert">
            The requested user could not be found.
          </div>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <UserForm
      title="Update User"
      values={values}
      errors={errors}
      isSubmitting={isSubmitting}
      isLoading={isLoading}
      submitLabel="Update"
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

export default UpdateUser;
