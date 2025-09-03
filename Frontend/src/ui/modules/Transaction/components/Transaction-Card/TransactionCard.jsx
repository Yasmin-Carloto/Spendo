import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import StatusBadge from "@/ui/components/badge/StatusBadge"

export default function TransactionCard({ 
    transactionId, 
    transactionColor,
    transactionTitle,
    categoryColor,
    categoryName,
    transactionType,
    transactionDate,
    transactionValue,
    goToEditTransaction,
    openDeleteDialog,
    transactionIcon,
    installments
}) {
    return (
        <AccordionItem value={transactionId} key={transactionId}>
            <AccordionTrigger className="flex justify-between items-center no-underline hover:no-underline focus:no-underline hover:bg-background-neutral">
                <div className="w-full flex flex-row items-center justify-between flex-wrap">
                    <div className="flex justify-start items-center">
                      <div 
                        style={{ 
                          backgroundColor: `${transactionColor}60`,
                          color: transactionColor
                        }}
                        className="p-2 rounded-md hidden lg:block"
                      >
                        {transactionIcon}
                      </div>
                      <div className="flex flex-col justify-start p-4">
                        <div>
                          <h3 className="text-lg">
                            {transactionTitle || ""}
                          </h3>
                        </div>
                        <div className="flex items-center text-xs gap-2 flex-wrap">
                          <StatusBadge color={categoryColor} name={categoryName} />
                          <StatusBadge color={transactionColor} name={transactionType} />
                          <StatusBadge color="#ff8800" name={`Parcelado: ${installments}`} />
                          <span className="text-subtitle-1 flex items-center justify-center gap-0.5">
                            <Calendar size={20} />
                            <p>{transactionDate}</p>
                          </span>
                        </div>
                      </div>
                    </div>

                    <p
                      className="text-xl font-bold mr-6 ml-6"
                      style={{ color: transactionColor }}
                    >
                      R$ {transactionValue}
                    </p>
                </div>
            </AccordionTrigger>
            <AccordionContent className="flex gap-2 flex-wrap">
                <Button 
                    variant="outline" 
                    onClick={() => goToEditTransaction(transactionId)}
                >
                    Editar
                </Button>
                <Button 
                    variant="destructive" 
                    onClick={() => openDeleteDialog(transactionId)}
                >
                    Excluir
                </Button>
            </AccordionContent>
        </AccordionItem>
    )
}