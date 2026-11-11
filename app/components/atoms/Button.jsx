export default function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    disabled = false,
    className = "",
    style,
    ...rest
}) {
    const variants = {
        primary: "bg-[#1f6b4f] text-white hover:bg-[#164b39]",
        secondary: "bg-[#e9f5ee] text-[#1f6b4f] hover:bg-[#f3faf6]",
        outline: "bg-white border border-[#1f6b4f] text-[#1f6b4f] hover:bg-[#e9f5ee]",
        danger: "bg-white border border-[#e0b4b4] text-[#a15252] hover:bg-[#fff5f5]",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={style}
            className={`
                inline-flex
                items-center
                justify-center
                gap-2
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
            {...rest}
        >
            {children}
        </button>
    );
}