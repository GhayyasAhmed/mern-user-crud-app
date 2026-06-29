import type { ChangeEvent, FormEvent } from "react";

export interface UserFormValues {
  name: string;
  email: string;
  age: string;
}

export interface UserFormErrors {
  name?: string;
  email?: string;
  age?: string;
  form?: string;
}

interface UserFormProps {
  title: string;
  values: UserFormValues;
  errors: UserFormErrors;
  isSubmitting: boolean;
  isLoading?: boolean;
  submitLabel: string;
  onChange: (field: keyof UserFormValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function UserForm({
  title,
  values,
  errors,
  isSubmitting,
  isLoading = false,
  submitLabel,
  onChange,
  onSubmit,
}: UserFormProps) {
  const isDisabled = isLoading || isSubmitting;

  const getFieldClassName = (hasError: boolean) =>
    `form-control${hasError ? " is-invalid" : ""}`;

  const handleFieldChange =
    (field: keyof UserFormValues) => (event: ChangeEvent<HTMLInputElement>) => {
      onChange(field, event.target.value);
    };

  return (
    <div className="app-shell d-flex justify-content-center align-items-center">
      <div className="form-panel border bg-white rounded p-3 shadow-sm">
        <h3>{title}</h3>
        {errors.form ? (
          <div className="alert alert-danger" role="alert" aria-live="polite">
            {errors.form}
          </div>
        ) : null}
        {isLoading ? (
          <div className="alert alert-info" role="status" aria-live="polite">
            Loading user...
          </div>
        ) : null}
        <form onSubmit={onSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className={getFieldClassName(Boolean(errors.name))}
              id="name"
              value={values.name}
              onChange={handleFieldChange("name")}
              disabled={isDisabled}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name ? (
              <div id="name-error" className="invalid-feedback">
                {errors.name}
              </div>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className={getFieldClassName(Boolean(errors.email))}
              id="email"
              value={values.email}
              onChange={handleFieldChange("email")}
              disabled={isDisabled}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email ? (
              <div id="email-error" className="invalid-feedback">
                {errors.email}
              </div>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              placeholder="Enter age"
              className={getFieldClassName(Boolean(errors.age))}
              id="age"
              value={values.age}
              onChange={handleFieldChange("age")}
              disabled={isDisabled}
              aria-invalid={Boolean(errors.age)}
              aria-describedby={errors.age ? "age-error" : undefined}
            />
            {errors.age ? (
              <div id="age-error" className="invalid-feedback">
                {errors.age}
              </div>
            ) : null}
          </div>

          <button type="submit" className="btn btn-primary" disabled={isDisabled}>
            {isSubmitting ? `${submitLabel}...` : submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
