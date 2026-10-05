export default function Field({
    label,
    type = "text",
    name,
    placeholder,
    value,
    onChange,
    required = false,
}) {
    return (
        <label className="field">
            <span>{label}</span>

            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        </label>
    );
}