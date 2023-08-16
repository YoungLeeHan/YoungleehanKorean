// 👻 Developed by DanBi Choi on Aug 16th, 2023.
// -----------------------------------------------------

export default function ProfileDropDownInput({
    label,
    value,
    placeholder,
    handleInput,
    data,
}) {
    const labelConvert = label.toLowerCase().replace(/\s+/g, "");

    return (
        <>
            <label htmlFor={labelConvert}>{label}</label>
            <select
                name={labelConvert}
                id={labelConvert}
                onChange={(e) => handleInput(label, e.target.value)}
            >
                <option value={""} disabled selected>
                    {value ? value : placeholder}
                </option>
                {data.map((d) => (
                    <option key={d} value={d}>
                        {d}
                    </option>
                ))}
            </select>
        </>
    );
}
