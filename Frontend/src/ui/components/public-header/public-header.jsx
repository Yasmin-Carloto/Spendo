import spendoLogo from "@/ui/assets/spendo-logo.svg"

export function PublicHeader() {
    return (
        <header className="p-2 flex items-center justify-center md:items-start md:justify-start">
            <img src={spendoLogo} />
        </header>
    )
}