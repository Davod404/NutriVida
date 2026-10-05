export default function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    disabled = false,
    className = ""
}) {
    const variants = {
        primary:
            "bg-[#1f6b4f] text-white hover:bg-[#164b39]",

        secondary:
            "bg-[#e9f5ee] text-[#1f6b4f] hover:bg-[#f3faf6]",

        outline:
            "bg-white border border-[#1f6b4f] text-[#1f6b4f] hover:bg-[#e9f5ee]",
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                flex
                flex-row
                gap-4
                items-center    
                px-5 py-2.5
                rounded-lg
                font-medium
                transition
                cursor-pointer
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${variants[variant]}
                ${className}
            `}
        >
            {children}
        </button>
    );
}