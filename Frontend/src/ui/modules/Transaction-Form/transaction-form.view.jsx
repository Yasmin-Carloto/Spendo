import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog"
import useTransactionForm from "./useTransactionForm"
import ConfirmationDialog from "@/ui/components/confirmation-dialog/ConfirmationDialog"
import { CalendarPopover } from "@/ui/components/calendar-popover/calendar-popover"
import CategoryForm from "@/ui/modules/Category-Form/category-form.view"

export default function TransactionForm() {
  const { 
    categories, 
    transactionTypes, 
    removeCategory, 
    setSelectedCategoryIdToDelete,
    selectedCategoryIdToDelete,
    setFormsField,
    setSelectField,
    submitTransaction,
    errors,
    transactionFormFields,
    selectedCategory,
    openCalendar,
    setOpenCalendar,
    categoryModalOpen,
    setCategoryModalOpen,
    openCategoryModal,
    editingCategoryId,
    isInInstallments,
    setIsInInstallments,
    id
  } = useTransactionForm()

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-main-green">Nova Transação</h2>
        <Button
          onClick={() => openCategoryModal(undefined)}
          className="flex flex-col text-center"
        >
          + Nova categoria
        </Button>
      </div>

      <div className="flex flex-col shadow-sm relative z-10">
        <h2 className="bg-main-green/50 p-4 rounded-t-md font-semibold text-lg font-main-text">
          Detalhes da transação
        </h2>

        <form className="space-y-6 p-4" onSubmit={(event) => submitTransaction(event)}>
          <div className="flex flex-col md:flex-row gap-4 my-8 items-stretch">
            <div className="w-full flex flex-col justify-start">
              <div className="w-full">
                <Label className="text-title-1 text-base">Descrição</Label>
                <Input
                  type="text"
                  name="title"
                  placeholder="Ex. Celular novo"
                  className="w-full"
                  onChange={(event) => setFormsField(event)}
                  value={transactionFormFields.title}
                />
              </div>
              {errors.title &&                     
                <p className="text-sm text-destructive py-1">{errors.title}</p>
              }
            </div>

            <div className="w-full flex flex-col justify-start">
              <div className="w-full flex flex-col justify-start">
                <Label className="text-title-1 text-base">Data</Label>
                <CalendarPopover
                  open={openCalendar}
                  setOpen={setOpenCalendar}
                  placeholder="Ex. dd/MM/AA"
                  value={transactionFormFields.date}
                  onChange={(newDate) =>
                    setFormsField({ target: { name: "date", value: newDate } })
                  }
                />
              </div>
              {errors.date &&                     
                <p className="text-sm text-destructive py-1">{errors.date}</p>
              }
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:my-8 items-stretch">
            <div className="w-full flex flex-col justify-start">
              <div className="w-full">
                <Label className="text-title-1 text-base">Valor total da compra</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  name="value"
                  placeholder="Ex. 42,78"
                  className="w-full"
                  onChange={(event) => setFormsField(event)}
                  value={transactionFormFields.value}
                />
              </div>
              {errors.value &&                     
                <p className="text-sm text-destructive py-1">{errors.value}</p>
              }
            </div>

            <div className="w-full flex flex-col justify-start">
              <div className="w-full">
                <Label className="text-title-1 text-base">Categoria</Label>
                <Select 
                  onValueChange={(value) => setSelectField("categoryId", value)} 
                  defaultValue={String(transactionFormFields.categoryId)}
                >
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue>
                      {selectedCategory ? selectedCategory.name : "Categorias"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <div className="flex flex-row justify-between py-2 my-1" key={category.id}>
                        <SelectItem value={String(category.id)} className="flex flex-row items-center">
                          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                          {category.name}
                        </SelectItem>
                        <div className="flex gap-2 items-center justify-center">
                          <Button variant="outline" onClick={() => openCategoryModal(category.id)}>Editar</Button>
                          <Button variant="destructive" onClick={() => setSelectedCategoryIdToDelete(category.id)}>Excluir</Button>
                        </div>
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {errors.categoryId &&                     
                <p className="text-sm text-destructive py-1">{errors.categoryId}</p>
              }
            </div>
          </div>

          {!id &&
            <div className="flex flex-col md:flex-row gap-4 md:my-8 items-stretch">

              <div className="w-full flex flex-col justify-start">
                <Label className="text-title-1 text-base">É uma compra parcelada?</Label>
                <Select 
                  onValueChange={(value) => setIsInInstallments(value == "true")} 
                  defaultValue={String(isInInstallments)}
                >
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue placeholder="Selecione se o valor é parcelado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true" className="flex flex-row items-center">Sim</SelectItem>
                    <SelectItem value="false" className="flex flex-row items-center">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {isInInstallments &&
                <div className="w-full flex flex-col justify-start">
                  <div className="w-full">
                    <Label className="text-title-1 text-base">Quantas parcelas?</Label>
                    <Input
                      type="number"
                      step="1"
                      min="2"
                      name="installments"
                      placeholder="Ex. 2"
                      className="w-full"
                      onChange={(event) => setFormsField(event)}
                      value={transactionFormFields.installments}
                    />
                  </div>
                  {errors.installments &&                     
                    <p className="text-sm text-destructive py-1">{errors.installments}</p>
                  }
                </div>
              }

            </div>
          }

          <div className="flex items-center justify-center w-full md:my-8">
            <div className="w-full flex flex-col justify-start">
              <div className="w-full">
                <Label className="text-title-1 text-base">Tipo</Label>
                <Select 
                  onValueChange={(value) => setSelectField("type", value)}
                  value={transactionFormFields.type}
                >
                  <SelectTrigger className="w-full rounded-xl">
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
              {errors.type &&                     
                <p className="text-sm text-destructive py-1">{errors.type}</p>
              }
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-main-green text-white px-8 py-2 rounded-full hover:bg-accent-green transition"
            >
              Salvar
            </Button>
          </div>
        </form>
      </div>

      <ConfirmationDialog 
        closeDeleteDialog={() => setSelectedCategoryIdToDelete(null)}
        confirmDelete={() => {
          removeCategory(selectedCategoryIdToDelete)
          setSelectedCategoryIdToDelete(null)
        }}
        dialogDescription="Essa ação não poderá ser desfeita. A categoria será removida permanentemente."
        dialogTitle="Tem certeza que deseja excluir esta categoria?"
        selectedItemIdToDelete={selectedCategoryIdToDelete}
      />

      <Dialog open={categoryModalOpen} onOpenChange={setCategoryModalOpen}>
        <DialogContent className="max-w-lg p-6">
          <DialogTitle></DialogTitle>
          <CategoryForm id={editingCategoryId} onClose={() => openCategoryModal(null)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
