export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-slate-800 text-xl dark:text-gray-300 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
