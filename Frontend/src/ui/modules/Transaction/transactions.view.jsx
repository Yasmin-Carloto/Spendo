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
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import useTransactions from "./useTransactions"
import TransactionCard from "./components/transaction-card/transaction-card"

export default function Transactions() {
  const { 
    goToAddNewTransaction, 
    categories, 
    transactionTypes,
    formatDate,
    getCategoryById,
    goToEditTransaction,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDeleteTransaction,
    selectedTransactionIdToDelete,
    months,
    years,
    filteredTransactions,
    selectedCategory,
    selectedMonth,
    selectedType,
    selectedYear,
    setSelectedCategory,
    setSelectedMonth,
    setSelectedType,
    setSelectedYear,
    cleanFilters,
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
      <div className="flex flex-col justify-end">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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

          <div className="flex flex-col">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
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

          <div className="flex flex-col">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
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

          <div className="flex flex-col">
            <Select value={selectedType} onValueChange={setSelectedType}>
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

        <div className="flex justify-between items-center mb-6">
          <Button
            className="flex flex-col text-center"
            onClick={() => cleanFilters()}
          >
            Limpar filtros
          </Button>
        </div>
      </div>

      {/* Transactions Table*/}
      <div className="block lg:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredTransactions.map(transaction => {
            const category = getCategoryById(transaction.categoryId)
            const transactionDate = formatDate(transaction.date)
            const transactionType = transaction.type == "income" ? "Entrada" : "Saída"

            return (
              <TransactionCard 
                categoryName={category.name || ""}
                goToEditTransaction={goToEditTransaction}
                openDeleteDialog={openDeleteDialog}
                title={transaction.title}
                transactionDate={transactionDate}
                transactionId={transaction.id}
                transactionType={transactionType}
                transactionValue={transaction.id}
                key={transaction.id}
              />
            )
          })}
        </div>
      </div>
      <div className="hidden lg:block overflow-x-auto w-full">
        <Table>
          <TableCaption>Uma lista das suas transações.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nome</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map(transaction => {
              const category = getCategoryById(transaction.categoryId)
              const transactionDate = formatDate(transaction.date)
              const transactionType = transaction.type == "income" ? "Entrada" : "Saída"

              return (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.title}</TableCell>
                  <TableCell>{transactionDate}</TableCell>
                  <TableCell>R$ {transaction.value}</TableCell>
                  <TableCell>{transactionType}</TableCell>
                  <TableCell>
                    <p
                      style={{ backgroundColor: category?.color || "#9CA3AF" }}
                      className="rounded-md text-white p-2"
                    >
                      {category.name}
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