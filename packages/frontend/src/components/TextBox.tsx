import * as React from 'react';
import {
  Control, useController,
} from 'react-hook-form';

interface TextBoxProps
  extends React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
  > {
  control: Control;
  name: string;
}

export default function TextBox({
  name,
  control,
  ...otherProps
}: TextBoxProps) {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue: '',
  });
  return (
    <div className="py-2 px-3 h-10 rounded border border-solid border-gray-600">
      <input
        {...otherProps}
        {...inputProps}
        ref={ref}
        name={name}
        className="w-full"
      />
    </div>
  );
}
