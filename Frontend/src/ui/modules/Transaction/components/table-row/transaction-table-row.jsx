import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function TransactionTableRow({ 
    title, 
    transactionDate, 
    transactionTotalValue, 
    transactionType, 
    categoryName, 
    goToEditTransaction, 
    openDeleteDialog, 
    categoryColor,
    transactionId
}) {
    return (
        <TableRow>
            <TableCell className="font-medium">{title}</TableCell>
            <TableCell>{transactionDate}</TableCell>
            <TableCell>R$ {transactionTotalValue}</TableCell>
            <TableCell>{transactionType}</TableCell>
            <TableCell>
                <p
                    style={{ backgroundColor: categoryColor }}
                    className="rounded-md text-white p-2"
                >
                    {categoryName}
                </p>
            </TableCell>
            <TableCell className="flex gap-2 justify-center">
                <Button variant="outline" onClick={() => goToEditTransaction(transactionId)}>Editar</Button>
                <Button variant="destructive" onClick={() => openDeleteDialog(transactionId)}>Excluir</Button>
            </TableCell>
        </TableRow>
    )
}