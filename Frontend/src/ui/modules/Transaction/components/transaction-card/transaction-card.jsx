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
            className="border rounded-lg shadow p-4 bg-white text-center flex flex-col"
        >
            <div className="flex items-start justify-between text-left gap-4">
                <div className="text-left">
                    <div className="flex flex-col">
                        <span>Nome</span>
                        <h4 className="text-2xl font-bold break-all">{title}</h4>
                    </div>
                    <p>
                        <span className="font-medium">
                            Data:
                        </span> 
                        {transactionDate}
                    </p>
                </div>
                <div>
                    <p>
                        <span className="font-medium">
                            Valor:
                        </span> 
                        R$ {transactionValue}
                    </p>
                    <p>
                        <span className="font-medium">
                            Categoria:
                        </span> 
                        {categoryName}
                    </p>
                    <p>
                        <span className="font-medium">
                            Tipo:
                        </span> 
                        {transactionType}
                    </p>
                </div>
            </div>
            <div className="mt-2 flex gap-2 justify-between">
                <Button variant="outline" onClick={() => goToEditTransaction(transactionId)}>Editar</Button>
                <Button variant="destructive" onClick={() => openDeleteDialog(transactionId)}>Excluir</Button>
             </div>
        </div>
    )
}