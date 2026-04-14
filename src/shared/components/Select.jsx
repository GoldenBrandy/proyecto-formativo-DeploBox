export default function Select({
    label,
    name,
    options = [],
}) {
    return (
        <div className="w-[320px]"> 
        {label && (
            <label className="block text-caption mb-1 text-text-secondary w-full text-left">
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
            border-[color:var(--primary-950)]
            px-4

            focus:outline-none
            focus:ring-2
            focus:ring-[color:var(--primary-950)]
            focus:border-[color:var(--primary-950)]
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
