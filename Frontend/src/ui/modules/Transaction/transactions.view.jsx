import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import useTransactions from "./useTransactions"

export default function Transactions() {
  const { 
    goToAddNewTransaction, 
    categories, 
    transactions, 
    transactionTypes,
    formatDate,
    getCategoryById,
    goToEditTransaction,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDeleteTransaction,
    selectedTransactionIdToDelete,
    months,
    years
  } = useTransactions()

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-main-green">Transações</h2>
        <Button
          className="flex flex-col text-center"
          onClick={() => goToAddNewTransaction()}
        >
          + Nova transação
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-row items-end justify-between md:gap-4 mb-6 flex-wrap">
        <div className="flex flex-col w-1/5">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col w-1/5">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col w-1/5">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col w-1/5">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipos" />
            </SelectTrigger>
            <SelectContent>
              {transactionTypes.map((type) => (
                <SelectItem key={type.id} value={type.type}>
                  {type.type === "income" ? "Entrada" : "Saída"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transactions Table*/}
      <div className="block md:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {transactions.map(transaction => (
            <div 
              key={transaction.id} 
              className="border rounded-lg shadow p-4 bg-white text-center"
            >
              <div className="flex items-center justify-around">
                <div className="text-left">
                  <div className="flex flex-col">
                    <span>Nome</span>
                    <h4 className="text-2xl font-bold">{transaction.title}</h4>
                  </div>
                  <p>
                    <span className="font-medium">
                      Data:
                    </span> 
                    {formatDate(transaction.date)}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium">
                      Valor:
                    </span> 
                    R$ {transaction.value}
                  </p>
                  <p>
                    <span className="font-medium">
                      Categoria:
                    </span> 
                    {transaction.category}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex gap-2 justify-between">
                <Button variant="outline" onClick={() => goToEditTransaction(transaction.id)}>Editar</Button>
                <Button variant="destructive" onClick={() => openDeleteDialog(transaction.id)}>Excluir</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:block overflow-x-auto w-full">
        <Table>
          <TableCaption>Uma lista das suas transações.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nome</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map(transaction => {
              const category = getCategoryById(transaction.categoryId)

              return (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.title}</TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>R$ {transaction.value}</TableCell>
                  <TableCell>
                    <p
                      style={{ backgroundColor: category?.color || "#9CA3AF" }}
                      className="rounded-md text-white p-2"
                    >
                      {category?.name}
                    </p>
                  </TableCell>
                  <TableCell className="flex gap-2 justify-center">
                    <Button variant="outline" onClick={() => goToEditTransaction(transaction.id)}>Editar</Button>
                    <Button variant="destructive" onClick={() => openDeleteDialog(transaction.id)}>Excluir</Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={selectedTransactionIdToDelete !== null} onOpenChange={closeDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tem certeza que deseja excluir esta transação?</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Essa ação não poderá ser desfeita. A transação será removida permanentemente.
          </DialogDescription>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={closeDeleteDialog}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDeleteTransaction}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}