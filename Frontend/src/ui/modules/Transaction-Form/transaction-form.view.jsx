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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import useTransactionForm from "./useTransactionForm"

export default function TransactionForm() {
  const { 
    categories, 
    goToAddCategory, 
    goToEditCategory, 
    transactionTypes, 
    removeCategory, 
    setSelectedCategoryIdToDelete,
    selectedCategoryIdToDelete,
    setFormsField,
    setSelectField,
    submitTransaction,
    errors,
    transactionFormFields,
    selectedCategory
  } = useTransactionForm()

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-main-green">Nova Transação</h2>
        <Button
          onClick={() => goToAddCategory()}
          className="flex flex-col text-center"
        >
          + Nova categoria
        </Button>
      </div>

      <form className="space-y-6" onSubmit={(event) => submitTransaction(event)}>
        <div className="flex flex-col md:flex-row gap-4 items-end my-8">
          <div className="w-full">
            <Input
              type="text"
              name="title"
              placeholder="Nome"
              className="w-full"
              onChange={(event) => setFormsField(event)}
              value={transactionFormFields.title}
            />
            {errors.title &&                     
              <p className="text-sm text-destructive py-1">{errors.title}</p>
            }
          </div>

          <div className="w-full">
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-gray-700">Data</Label>
              <Input
                type="date"
                name="date"
                placeholder="Data"
                className="w-full"
                onChange={(event) => setFormsField(event)}
                value={transactionFormFields.date}
              />
            </div>
            {errors.date &&                     
              <p className="text-sm text-destructive py-1">{errors.date}</p>
            }
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full md:my-8">
          <div className="w-full">
            <Input
              type="number"
              step="0.01"
              min="0"
              name="value"
              placeholder="Valor"
              className="w-full"
              onChange={(event) => setFormsField(event)}
              value={transactionFormFields.value}
            />
            {errors.value &&                     
              <p className="text-sm text-destructive py-1">{errors.value}</p>
            }
          </div>
          
          {/* Transanction - categoryId */}
          <div className="w-full">
            <Select onValueChange={(value) =>
                setSelectField("categoryId", value)
              } 
              defaultValue={String(transactionFormFields.categoryId)}
            >
              <SelectTrigger className="w-full">
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
                      <Button variant="outline" onClick={() => goToEditCategory(category.id)}>
                        Editar
                      </Button>
                      <Button variant="destructive" onClick={() => setSelectedCategoryIdToDelete(category.id)}>
                        Excluir
                      </Button>
                    </div>
                  </div>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId &&                     
              <p className="text-sm text-destructive py-1">{errors.categoryId}</p>
            }
          </div>
        </div>

        {/* Transanction - type */}
        <div className="flex items-center justify-center w-full md:my-8">
          <div className="w-full">
            <Select onValueChange={(value) => 
                setSelectField("type", value)
              }
              value={transactionFormFields.type}
            >
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

      <Dialog open={selectedCategoryIdToDelete !== null} onOpenChange={() => setSelectedCategoryIdToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tem certeza que deseja excluir esta categoria?</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Essa ação não poderá ser desfeita. A categoria será removida permanentemente.
          </DialogDescription>
          <DialogFooter className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setSelectedCategoryIdToDelete(null)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                removeCategory(selectedCategoryIdToDelete)
                setSelectedCategoryIdToDelete(null)
              }}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}
