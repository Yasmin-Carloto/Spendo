import page404Image from '@/ui/assets/page-404-image.png'
import { Link } from "react-router"

export default function Page404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-4">
        <img
          src={page404Image}
          alt="Tela em construção"
          className="w-72 h-auto mx-auto mb-8 animate-pulse"
        />
        <div className="text-center">
            <h1 className="text-2xl font-bold text-main-green">
                OOPS... Acho que você se perdeu!
            </h1>
            <p className="text-backgroud-dark-gray">
                A página que você está procurando não existe.
            </p>
        </div>
        <Link 
          className="px-2 py-1 bg-accent-green text-white rounded-sm hover:bg-main-green/80 transition"
          to="/"
        >
          Ir para home
        </Link>
    </div>
  )
}