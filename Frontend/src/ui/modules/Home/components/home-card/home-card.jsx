import formatToBRL from "@/ui/utils/money-formatter"

export default function HomeCard({ value, label, children }) {
    return (
        <div className="rounded-md p-6 shadow-md bg-background-neutral flex justify-between items-center gap-2">
            <div>
                <p className="text-sm font-bold text-title-1">{label}</p>
                <p className="text-2xl font-semibold">R$ {formatToBRL(value)}</p>
            </div>
            {children}
        </div>
    )
}