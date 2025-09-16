import ViagemForm from "./ViagemForm";
import ViagemList from "./ViagemList";
import { useState } from "react";

function App() {
  const [viagensAtualizadas, setViagensAtualizadas] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Viagens App</h1>
      <ViagemForm
        onViagemCriado={() => setViagensAtualizadas(!viagensAtualizadas)}
      />
      <ViagemList key={viagensAtualizadas} />
    </div>
  );
}

export default App;
