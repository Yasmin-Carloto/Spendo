import {
  Accordion,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import useTransactions from "./useTransactions"
import formatDate from "@/ui/utils/date-formatter"
import formatToBRL from "@/ui/utils/money-formatter"
import { 
  BanknoteArrowDown, 
  BanknoteArrowUp 
} from "lucide-react"
import SelectFilter from "./components/Select-Filter/SelectFilter"
import TransactionCard from "./components/Transaction-Card/TransactionCard"
import ConfirmationDialog from "../../components/confirmation-dialog/ConfirmationDialog"

export default function Transactions() {
  const { 
    goToAddNewTransaction, 
    categories, 
    transactionTypes,
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
        <h2 className="text-3xl font-bold text-main-green">Transações</h2>
        <Button
          className="flex flex-col text-center"
          onClick={() => goToAddNewTransaction()}
        >
          + Nova transação
        </Button>
      </div>

      <div className="flex flex-col justify-end">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <SelectFilter 
            items={categories} 
            placeholder="Categoria" 
            selectedItem={selectedCategory} 
            setSelectedItem={setSelectedCategory} 
          />

          <SelectFilter 
            items={months} 
            placeholder="Mês" 
            selectedItem={selectedMonth} 
            setSelectedItem={setSelectedMonth} 
          />

          <SelectFilter 
            items={years} 
            placeholder="Ano" 
            selectedItem={selectedYear} 
            setSelectedItem={setSelectedYear} 
          />

          <SelectFilter 
            items={transactionTypes} 
            placeholder="Tipos" 
            selectedItem={selectedType} 
            setSelectedItem={setSelectedType} 
          />
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

      <div className="flex flex-col shadow-sm">
        <h2 className="bg-main-green/50 p-4 rounded-t-md font-bold text-lg font-main-text">
          {filteredTransactions.length <= 0
            ? "Não há transações cadastradas (0)"
            : `Últimas transações (${filteredTransactions.length})`}
        </h2>

        <Accordion type="single" collapsible className="w-full bg-background-neutral/40 px-4 rounded-b-md">
          {filteredTransactions
            .map(transaction => {
              const category = getCategoryById(transaction.categoryId)
              const categoryName = category?.name || "Categoria não encontrada"
              const categoryColor = category?.color || "#9CA3AF"
              const transactionDate = formatDate(transaction.date)
              const transactionType = transaction.type == "income" ? "Entrada" : "Saída"
              const transactionColor = transaction.type == "income" ? "#00AD5C" : "#ff0000"
              const TransactionIcon = transaction.type == "income" ? BanknoteArrowDown : BanknoteArrowUp
              const transactionTotalValue = formatToBRL(transaction.value)
              const transactionInstallments = transaction.installments !== null || transaction.installments > 0 ?
                                              `${transaction.installmentNumber}/${transaction.installments}` :
                                              "Não"

              return (
                <TransactionCard 
                  categoryColor={categoryColor}
                  categoryName={categoryName}
                  goToEditTransaction={goToEditTransaction}
                  openDeleteDialog={openDeleteDialog}
                  transactionColor={transactionColor}
                  transactionDate={transactionDate}
                  transactionIcon={<TransactionIcon size={32} />}
                  transactionId={transaction.id}
                  transactionTitle={transaction.title}
                  transactionType={transactionType}
                  transactionValue={transactionTotalValue}
                  installments={transactionInstallments}
                  key={transaction.id}
                />
              )
            })
          }
        </Accordion>
      </div>

      <ConfirmationDialog 
        closeDeleteDialog={closeDeleteDialog}
        confirmDelete={confirmDeleteTransaction}
        dialogDescription="Essa ação não poderá ser desfeita. A transação será removida permanentemente."
        dialogTitle="Tem certeza que deseja excluir esta transação?"
        selectedItemIdToDelete={selectedTransactionIdToDelete}
      />
    </div>
  )
}