export default function Select({
    label,
    name,
    options = [],
    error,
    ...props
}) {
    return (
        <div className="w-full"> 
        {label && (
            <label
                className={`block text-caption mb-1 w-full text-left ${
                    error ? "text-red-800" : "text-text-secondary"
                }`}
            >
                {label}
            </label>
        )}

        <select
            name={name}
            className={`
            w-full
            h-12
            rounded-md
            border
            px-4
            transition-colors

            focus:outline-none
            focus:ring-0
            ${
                error
                    ? "border-red-800 hover:border-red-800 focus:border-[3px] focus:border-red-800"
                    : "border-border hover:border-(--primary-950) hover:border-2 focus:border-[3px] focus:border-(--primary-950)"
            }
            `}
            {...props}
                >
                        {(options || []).map((opt) => {
                            const isString = typeof opt === "string";
                            const value = isString ? opt : opt?.value ?? opt?.id ?? '';
                            const labelText = isString ? opt : opt?.label ?? String(value);
                            const key = opt?.id ?? opt?.value ?? value;
                            return (
                                <option key={key} value={value}>
                                    {labelText}
                                </option>
                            );
                        })}
                </select>
        {error && <p className="mt-1 w-full text-left text-caption text-red-800">{error}</p>}
        </div>
    )
}
