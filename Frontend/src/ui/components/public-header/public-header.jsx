import spendoLogo from "@/ui/assets/spendo-logo.svg"

export function PublicHeader() {
    return (
        <header className="p-6 sticky top-0 z-10">
            <img 
                className="h-8 w-auto"
                src={spendoLogo}
            />
        </header>
    )
}