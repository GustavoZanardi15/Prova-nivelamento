import { useEffect, useState } from "react";
import axios from "axios";

export default function ViagemList() {
  const [viagens, setViagens] = useState([]);

  const fetchViagens = async () => {
    try {
      const res = await axios.get("http://localhost:3000/viagens");
      setViagens(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar as viagens");
    }
  };

  useEffect(() => {
    fetchViagens();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Lista de Viagens</h2>
      <ul className="space-y-2">
        {viagens.map((viagem) => (
          <li key={viagem._id} className="border p-2 rounded">
            <strong>{viagem.nome}</strong> - ({viagem.dataSaida || "Ano N/A"}) (
            {viagem.dataChegada || "Ano N/A"}) [{viagem.valor}]
          </li>
        ))}
      </ul>
    </div>
  );
}
