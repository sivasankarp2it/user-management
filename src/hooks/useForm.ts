import { useState } from 'react';

export default function useForm(initial: any) {
  const [values, setValues] = useState(initial);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setValues((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const reset = () => setValues(initial);

  return { values, setValues, handleChange, reset };
}