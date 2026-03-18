import Input from "../shared/components/Input"

export default function App() {

    return (
      <div className="min-h-screen bg-green-800 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">
          con Rico programar Tailwind v4 funciona full...
        </h1>

        <Input 
          label="Nombre"
          placeholder="Ingrese su nombre"
        />
      </div>
    );
}