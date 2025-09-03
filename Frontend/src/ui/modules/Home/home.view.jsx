"use client"

import HomeCard from "./components/home-card/home-card"
import { 
    Bar, 
    BarChart, 
    CartesianGrid, 
    XAxis 
} from "recharts"
import { 
  BanknoteArrowDown, 
  BanknoteArrowUp,
  ChartNoAxesColumn
} from "lucide-react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import useHome from "./useHome"
import GoalCard from "./components/goal-card/goal-card"
import formatToBRL from "@/ui/utils/money-formatter"
import EmptyState from "@/ui/components/empty-state/empty-state"

export default function Home() {
    const { currentMonth, chartData, totalIncome, totalExpense, totalBalance, goals, chartConfig  } = useHome()

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-10">
            <h2 className="text-3xl font-bold text-main-green">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <HomeCard 
                    label={`Entradas do Mês de ${currentMonth}`} 
                    value={totalIncome}
                    children={
                        <BanknoteArrowUp 
                            className="bg-main-green/50 text-main-green p-2 rounded-md"
                            size={48}
                        />
                    }
                />
                <HomeCard 
                    label={`Saídas do Mês de ${currentMonth}`} 
                    value={totalExpense} 
                    children={
                        <BanknoteArrowDown 
                            className="bg-destructive/50 text-destructive p-2 rounded-md"
                            size={48}
                        />
                    }
                />
                <HomeCard 
                    label={`Saldo do mês ${currentMonth}`} 
                    value={totalBalance} 
                    children={
                        <ChartNoAxesColumn 
                            className="bg-chart-4/50 text-chart-4 p-2 rounded-md"
                            size={48}
                        />
                    }
                />
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-4 w-full">
                <div className="flex flex-col lg:w-1/2 w-full bg-background-neutral/40 rounded-md shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-4">Resumo das entradas e saídas do ano separadas por mês</h2>
                    <div className="md:col-span-2">
                        {chartData.length > 0 ? (
                            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                                <BarChart accessibilityLayer data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="income" fill="var(--chart-2)" radius={4} />
                                    <Bar dataKey="expense" fill="var(--chart-1)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        ) : (
                            <EmptyState 
                                text="Você ainda não adicionou transações!" 
                                to="/create-transaction" 
                                buttonText="Adicionar nova transação"
                            />
                        )}
                    </div>
                </div>

                <div className="p-4 lg:w-1/2 w-full bg-background-neutral/40 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Metas</h2>
                    {goals.length > 0 ? (
                            <div className="w-full flex flex-col gap-2">
                                {goals
                                    .map((goal) => {
                                        const goalPartialValue = formatToBRL(goal.moneyCollected)
                                        const goalTotalValue = formatToBRL(goal.moneyToCollect)
                                        const percentage = Math.min(100, (goal.moneyCollected / goal.moneyToCollect) * 100)

                                        return (
                                            <GoalCard 
                                                goalId={goal.id}
                                                key={goal.id}
                                                title={goal.title}
                                                partialValue={goalPartialValue}
                                                totalValue={goalTotalValue}
                                                percentage={percentage}
                                            />
                                        )
                                    })
                                }
                            </div>
                        ) : (
                            <EmptyState 
                                text="Você ainda não adicionou metas!" 
                                to="/create-goal" 
                                buttonText="Adicionar nova  meta"
                            />
                        )}
                </div>
            </div>
        </div>
    )
}