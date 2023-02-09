export default function InputField({ label = null, type = null, placeholder = null, value = null, handleChange = (id) => { }, id = null, note = null, disable = false, className="", min=null}) {
    return (
        <div className="mb-4 w-full">
            <label className="block text-gray-700 text-md font-bold mb-2">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                key={id}
                onChange={handleChange(id)}
                className={"border rounded w-full py-2 px-3 text-gray-700 " + className}
                disabled={disable}
                min={min}
            />
            <span className="text-xs text-gray-500">{note}</span>
        </div>
    )
}