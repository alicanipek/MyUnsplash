import * as React from 'react';

export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {};

export default function Button({ ...props }: Props) {
  return (
    <button
      type="button"
      className="py-2 px-3 h-10 bg-black text-white w-full rounded"
      {...props}
    />
  );
}
