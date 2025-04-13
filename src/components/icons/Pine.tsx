
export function PineLarge(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L8 6.5l2 1.5-2 1 2 1-2 1 2 1-2 1 2 1-2 1 4 4.5 4-4.5-2-1 2-1-2-1 2-1-2-1 2-1-2-1 2-1.5L12 2z" />
      <line x1="12" y1="15" x2="12" y2="22" />
    </svg>
  );
}

export function PineSmall(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 4l-3 3.5 1.5 1-1.5.75 1.5.75-1.5.75 1.5.75-1.5 1L12 16l3-3.5-1.5-1 1.5-.75-1.5-.75 1.5-.75-1.5-.75 1.5-1L12 4z" />
      <line x1="12" y1="12" x2="12" y2="20" />
    </svg>
  );
}
