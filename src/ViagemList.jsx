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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/viagens/${id}`);
      fetchViagens();
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir viagem");
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
            <div>
              <strong>{viagem.nome}</strong> <br />
              Saída: {new Date(viagem.dataSaida).toLocaleDateString()} <br />
              Chegada: {new Date(viagem.dataChegada).toLocaleDateString()}{" "}
              <br />
              Valor: R$ {viagem.valor} <br />
              Destinos:
              <ul className="list-disc ml-6">
                {viagem.destinos?.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handleDelete(viagem._id)}
              className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
