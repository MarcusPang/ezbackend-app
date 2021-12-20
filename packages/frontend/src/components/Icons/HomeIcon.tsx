import * as React from 'react';
import { SVGProps } from 'react';

const SvgHomeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="currentColor"
    {...props}
  >
    <path
      d="M45.5 47.5H30.2c-1.1 0-2-.9-2-2V36c0-2.4-1.9-4.3-4.3-4.3s-4.3 1.9-4.3 4.3v9.5c0 1.1-.9 2-2 2H2.5c-1.1 0-2-.9-2-2V19.9c0-1.8.9-3.5 2.3-4.5L22.9.9c.7-.5 1.6-.5 2.3 0l20.1 14.5c1.4 1 2.3 2.7 2.3 4.5v25.7c-.1 1-1 1.9-2.1 1.9zm-13.3-3.9h11.4V19.9c0-.5-.3-1-.7-1.3L24 4.9 5.1 18.5c-.4.3-.7.8-.7 1.3v23.7h11.4V36c0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2z"
      xmlns="http://www.w3.org/2000/svg"
    />
  </svg>
);

export default SvgHomeIcon;
