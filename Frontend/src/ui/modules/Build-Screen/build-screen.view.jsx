import buildImage from '@/ui/assets/build-screen-image.svg'


export default function BuildScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <img
          src={buildImage}
          alt="Tela em construção"
          className="w-72 h-auto mx-auto mb-8 animate-pulse"
        />
        <h1 className="text-3xl font-bold text-main-green mb-4">
          🚧 Em construção 🚧
        </h1>
        <p className="text-backgroud-dark-gray">
          Estamos trabalhando para criar algo incrível. Volte logo! :)
        </p>
      </div>
    </div>
  )
}