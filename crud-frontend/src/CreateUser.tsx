import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api, getErrorMessage } from "./api";
import UserForm from "./components/UserForm";
import { getUserFormErrors } from "./validation";

function CreateUser() {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
      await api.post("/users", {
        name: values.name.trim(),
        email: values.email.trim(),
        age: Number(values.age),
      });
      navigate("/");
    } catch (error) {
      setErrors({
        form: getErrorMessage(error, "Unable to create the user."),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <UserForm
      title="Create User"
      values={values}
      errors={errors}
      isSubmitting={isSubmitting}
      submitLabel="Create"
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

export default CreateUser;
