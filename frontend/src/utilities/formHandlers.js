import { useState } from "react";

export const useFormHandler = (initialValues = {}) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(`${name}: ${e.target.value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setFormData(initialValues);

  return { formData, handleChange, resetForm, setFormData };
};
