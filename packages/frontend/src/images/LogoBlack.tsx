import * as React from 'react';

function LogoBlack(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="20 21 96 96"
      height="24"
      width="24"
      {...props}
    >
      <path
        d="M50 21h36v27H50zM20 63h30.087v27.24h36.079V63H116v54H20z"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default LogoBlack;
