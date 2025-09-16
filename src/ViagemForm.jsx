import { useState } from "react";
import axios from "axios";

export default function ViagemForm({ onViagemCriada }) {
  const [nome, setNome] = useState("");
  const [dataSaida, setDataSaida] = useState("");
  const [dataChegada, setDataChegada] = useState("");
  const [valor, setValor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/viagens", {
        nome,
        dataSaida: Number(),
        dataChegada: Number(),
        valor,
      });
      onViagemCriada(res.data);
      setNome("");
      setDataSaida("");
      setDataChegada("");
      setValor("");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar viagem");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-2">
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        placeholder="Data de Saída"
        value={dataSaida}
        onChange={(e) => setDataSaida(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        placeholder="Data de Chegada"
        value={dataChegada}
        onChange={(e) => setDataChegada(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Criar Viagem
      </button>
    </form>
  );
}
