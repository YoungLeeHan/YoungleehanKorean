// 👻 Developed by DanBi Choi on Aug 16th, 2023.
// -----------------------------------------------------

export default function ProfileInput({
    label,
    type,
    value,
    placeholder,
    handleInput,
    disabled = false,
    maxlength,
}) {
    const labelConvert = label.toLowerCase().replace(/\s+/g, "");

    return (
        <>
            <label htmlFor={labelConvert}>{label}</label>
            <input
                type={type}
                id={labelConvert}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={(e) => {
                    handleInput(label, e.target.value);
                }}
                maxLength={maxlength}
            />
        </>
    );
}
