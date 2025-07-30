import { Button } from "@/components/ui/button"

export default function TransactionCard({ 
    title, 
    transactionDate, 
    transactionValue, 
    categoryName, 
    transactionType,
    goToEditTransaction,
    openDeleteDialog,
    transactionId
}) {
    return (
        <div 
            className="border rounded-lg shadow p-4 bg-white text-center flex flex-col w-full sm:w-[48%] flex-grow"
        >
            <div className="flex flex-col items-start justify-between text-left gap-4">
                <div className="flex flex-col">
                    <span className="text-zinc-600 font-light">Nome</span>
                    <h4 className="text-2xl font-bold break-all">{title}</h4>
                </div>
                <div className="flex justify-between w-full">
                    <div className="flex flex-col text-center gap-2">
                        <p className="flex flex-col text-left">
                            <span className="font-light text-zinc-600 text-sm">
                                Data:
                            </span> 
                            {transactionDate}
                        </p>
                        <p className="flex flex-col text-left">
                            <span className="font-light text-zinc-600 text-sm">
                                Valor:
                            </span> 
                            R$ {transactionValue}
                        </p>
                    </div>
                    <div className="flex flex-col text-center gap-2">
                        <p className="flex flex-col text-left">
                            <span className="font-light text-zinc-600 text-sm">
                                Categoria:
                            </span> 
                            {categoryName}
                        </p>
                        <p className="flex flex-col text-left">
                            <span className="font-light text-zinc-600 text-sm">
                                Tipo:
                            </span> 
                            {transactionType}
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-2 flex gap-2 justify-between">
                <Button variant="outline" onClick={() => goToEditTransaction(transactionId)}>Editar</Button>
                <Button variant="destructive" onClick={() => openDeleteDialog(transactionId)}>Excluir</Button>
             </div>
        </div>
    )
}