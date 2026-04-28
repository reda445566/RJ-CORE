import { useState } from "react";

export default function useForm(initialValues, validate) {
  const [values, setValues]   = useState(initialValues);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    // clear error on type
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (onSubmit) => async (e) => {
    e.preventDefault();
    const validationErrors = validate ? validate(values) : {};
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await onSubmit(values);
    } catch (err) {
      setErrors({ general: err.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, loading, handleChange, handleSubmit, reset };
}



