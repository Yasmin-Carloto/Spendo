export default function HomeCard({ value, label, color }) {
    return (
        <div 
            style={{ backgroundColor: color}}
            className="text-white rounded-lg p-6 shadow"
        >
            <p className="text-2xl font-semibold">R$ {value}</p>
            <p className="text-sm">{label}</p>
        </div>
    )
}