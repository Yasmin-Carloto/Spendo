"use client"

import HomeCard from "./components/home-card/home-card"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import useHome from "./useHome"
import GoalCard from "./components/goal-card/goal-card"

export default function Home() {
    const { chartData, totalIncome, totalExpense, totalBalance, goals } = useHome()
    const chartConfig = {
        income: {
            label: "Saída",
            color: "#2563eb",
        },
        expense: {
            label: "Entrada",
            color: "#60a5fa",
        },
    }
    console.log(goals)
    return (
        <div className="p-8 space-y-10">
            <h1 className="text-3xl font-bold text-green-700">Dashboard</h1>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <HomeCard color="#00a63e" label="Entradas do Mês" value={totalIncome} />
                <HomeCard color="#e7000b" label="Saídas do Mês" value={totalExpense} />
                <HomeCard color="#9810fa" label="Saldo" value={totalBalance} />
            </div>

            {/* Despesas e Metas */}
            <div className="flex flex-col lg:flex-row justify-between gap-1 w-full">
                <div className="flex flex-col lg:w-1/2 w-full">
                    <h2 className="text-lg font-bold mb-4">Entradas e Saídas</h2>
                    <div className="md:col-span-2">
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
                                <Bar dataKey="income" fill="var(--chart-1)" radius={4} />
                                <Bar dataKey="expense" fill="var(--chart-2)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>

                <div className="p-2 shadow-sm lg:w-1/2 w-full">
                    <h2 className="text-lg font-bold mb-4">Metas</h2>
                    {goals.length > 0 ? (
                        goals.slice(0, 3).map((goal) => (
                            <GoalCard 
                                key={goal.id}
                                title={goal.title}
                                partialValue={goal.moneyCollected}
                                totalValue={goal.moneyToCollect}
                                percentage={Math.min(100, (goal.moneyCollected / goal.moneyToCollect) * 100)}
                            />
                        ))
                    ) : (
                        <p>Ainda não existe nenhuma meta criada.</p>
                    )}
                </div>
            </div>
        </div>
    )
}