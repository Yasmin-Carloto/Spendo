import { Progress } from "@/components/ui/progress"
import { Target } from "lucide-react"
import { Link } from "react-router"

export default function GoalCard({ goalId, title, totalValue, partialValue, percentage }) {
    return (
        <Link 
            to={`/edit-goal/${goalId}`}
        >
            <div className="space-y-3 border rounded-xl p-4 bg-background-neutral shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-main-green" />
                        <span className="font-semibold text-title-1">{title}</span>
                    </div>
                    <span className="text-sm text-subtitle-1">{`R$${partialValue} / R$${totalValue}`}</span>
                </div>

                <div>
                    <Progress value={percentage} className="h-2 rounded-full" />
                    <p className="text-sm text-subtitle-1 mt-1 text-right font-bold">{percentage.toFixed(0)}%</p>
                </div>
            </div>
        </Link>
    )
}