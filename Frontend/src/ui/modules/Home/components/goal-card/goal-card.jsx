import { Progress } from "@/components/ui/progress"

export default function GoalCard({ title, totalValue, partialValue, percentage }) {
    return (
        <div className="space-y-2 border rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between gap-2">
                <span className="text-gray-800">{title}</span>
                <span className="text-right text-sm text-gray-500">{`R$ ${partialValue}/R$ ${totalValue}`}</span>
            </div>
            <Progress value={percentage} />
        </div>
    )
}