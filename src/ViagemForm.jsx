import { useState } from "react";
import axios from "axios";

export default function ViagemForm({ onViagemCriado }) {
  const [nome, setNome] = useState("");
  const [dataSaida, setDataSaida] = useState("");
  const [dataChegada, setDataChegada] = useState("");
  const [valor, setValor] = useState("");
  const [destino, setDestino] = useState("");
  const [destinos, setDestinos] = useState([]);

  const addDestino = () => {
    if (destino.trim() !== "") {
      setDestinos([...destinos, destino]);
      setDestino("");
    }
  };

  const removeDestino = (index) => {
    setDestinos(destinos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/viagens", {
        nome,
        dataSaida,
        dataChegada,
        valor,
        destinos,
      });
      onViagemCriado(res.data);
      setNome("");
      setDataSaida("");
      setDataChegada("");
      setValor("");
      setDestinos([]);
    } catch (err) {
      console.error(err);
      alert("Erro ao criar viagem");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-2">
      <input
        type="text"
        placeholder="Nome da viagem"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="date"
        value={dataSaida}
        onChange={(e) => setDataSaida(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="date"
        value={dataChegada}
        onChange={(e) => setDataChegada(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        className="border p-2 w-full"
      />

      {/* Gerenciamento de destinos */}
      <div className="border p-2 rounded">
        <h3 className="font-bold">Destinos</h3>
        <div className="flex space-x-2 mt-2">
          <input
            type="text"
            placeholder="Nome do destino"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            className="border p-2 flex-1"
          />
          <button type="button" onClick={addDestino} className=" px-2 rounded">
            Adicionar
          </button>
        </div>
        <ul className="mt-2 space-y-1">
          {destinos.map((d, i) => (
            <li
              key={i}
              className="flex justify-between items-center border p-1"
            >
              {d}
              <button
                type="button"
                onClick={() => removeDestino(i)}
                className="text-red-500"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button type="submit" className=" p-2 rounded">
        Criar Viagem
      </button>
    </form>
  );
}
