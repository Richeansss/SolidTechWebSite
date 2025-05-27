const Eye = ({ size = 20 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg"
         width={size} height={size}
         viewBox="0 0 24 24"
         fill="none" stroke="currentColor"
         strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
)

export default Eye
