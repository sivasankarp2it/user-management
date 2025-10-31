import { useState } from 'react';
export default function useForm<T extends Record<string, any>>(initial: T) {
  const [values, setValues] = useState<T>(initial);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as any;
    setValues(v => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
  };
  const reset = () => setValues(initial);
  return { values, setValues, handleChange, reset } as const;
}