import { Link } from "react-router"

export default function EmptyState({ text, to, buttonText }) {
    return (
        <div className="flex flex-col items-center justify-center py-10">
            <p className="text-md font-medium text-backgroud-dark-gray mb-1">
                {text}
            </p>
            <Link 
                className="px-2 py-1 bg-accent-green text-white rounded-sm hover:bg-main-green/80 transition"
                to={to}
            >
                {buttonText}
            </Link>
        </div>
    )
}