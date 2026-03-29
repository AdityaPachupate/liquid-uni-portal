import { InputHTMLAttributes, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FloatingLabelInput = forwardRef<HTMLInputElement, Props>(
  ({ label, id, ...props }, ref) => (
    <div className="floating-label-group">
      <input ref={ref} id={id} placeholder=" " {...props} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
);
FloatingLabelInput.displayName = 'FloatingLabelInput';
