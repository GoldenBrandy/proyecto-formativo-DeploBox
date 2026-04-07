export default function Select({
    label,
    name,
    options = [],
}) {
    return (
        <div className="w-[320px]"> 
        {label && (
            <label className="block text-caption mb-1 text-text-secondary place-self-start">
                {label}
            </label>
        )}

        <select
            name = {name}
            className="
            w-full
            h-12
            rounded-md
            border
            border-border
            px-4
            "
        >
            {options.map((option) => (
                <option 
                    key={option.id} 
                    value={option.id}
                >
                    {option.label}
                </option>
            ))}
        </select>     
        </div>
    )
}