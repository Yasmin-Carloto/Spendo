import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"

export default function ConfirmationDialog({ 
    selectedItemIdToDelete,
    closeDeleteDialog,
    confirmDelete,
    dialogTitle,
    dialogDescription
}) {
    return (
        <Dialog open={selectedItemIdToDelete !== null} onOpenChange={closeDeleteDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {dialogDescription}
                </DialogDescription>
                <DialogFooter className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={closeDeleteDialog}>
                      Cancelar
                    </Button>
                    <Button variant="destructive" onClick={confirmDelete}>
                      Excluir
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}