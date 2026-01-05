import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Movements() {
  const [movements, setMovements] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    product_id: "",
    type: "IN",
    quantity: "",
    reason: ""
  });

  const loadMovements = async () => {
    const res = await api.get("/api/movements");
    setMovements(res.data);
  };

  const loadProducts = async () => {
    const res = await api.get("/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadMovements();
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/movements", {
        ...form,
        product_id: Number(form.product_id),
        quantity: Number(form.quantity),
      });

      setForm({
        product_id: "",
        type: "IN",
        quantity: "",
        reason: ""
      });

      loadMovements();
      loadProducts();
      alert(" Movimiento registrado");
    } catch (error) {
      alert(error.response?.data?.msg || "Error al registrar movimiento");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Movimientos</h2>

      {/* FORM */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Registrar Movimiento</h3>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <select
            name="product_id"
            value={form.product_id}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          >
            <option value="">Selecciona un producto</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (Stock: {p.stock})
              </option>
            ))}
          </select>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          >
            <option value="IN">Entrada (IN)</option>
            <option value="OUT">Salida (OUT)</option>
          </select>

          <input
            name="quantity"
            type="number"
            placeholder="Cantidad"
            value={form.quantity}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          />

          <input
            name="reason"
            placeholder="Motivo (Compra, Venta, Ajuste...)"
            value={form.reason}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          />

          <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition md:col-span-2">
            Guardar Movimiento
          </button>
        </form>
      </div>

      {/* HISTORY */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Historial</h3>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Producto</th>
              <th className="p-2 border">Tipo</th>
              <th className="p-2 border">Cantidad</th>
              <th className="p-2 border">Motivo</th>
              <th className="p-2 border">Usuario</th>
              <th className="p-2 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((m) => (
              <tr key={m.id}>
                <td className="p-2 border">{m.id}</td>
                <td className="p-2 border">{m.product_name}</td>
                <td className={`p-2 border font-semibold ${m.type === "IN" ? "text-green-600" : "text-red-600"}`}>
                  {m.type}
                </td>
                <td className="p-2 border">{m.quantity}</td>
                <td className="p-2 border">{m.reason}</td>
                <td className="p-2 border">{m.user_name}</td>
                <td className="p-2 border">
                  {new Date(m.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {movements.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No hay movimientos registrados.
          </p>
        )}
      </div>
    </div>
  );
}
