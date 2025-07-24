import buildImage from '../../assets/build-screen-image.svg'

export default function BuildScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <img
          src={buildImage}
          alt="Tela em construção"
          className="w-72 h-auto mx-auto mb-8 animate-pulse"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🚧 Em construção 🚧
        </h1>
        <p className="text-gray-600">
          Estamos trabalhando para criar algo incrível. Volte logo! :)
        </p>
      </div>
    </div>
  )
}