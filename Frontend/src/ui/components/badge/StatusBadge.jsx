export default function StatusBadge({ color, name }) {
    return (
        <span 
            style={{ 
                backgroundColor: `${color}50`,
                color: color
            }}
            className="rounded-4xl px-2 py-1 text-center"
        >
            {name}
        </span>
    )
}