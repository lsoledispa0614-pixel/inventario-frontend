import { useEffect, useState } from "react";
import api from "../api/axios";

export default function LowStock() {
  const [products, setProducts] = useState([]);

  const loadLowStock = async () => {
    const res = await api.get("/api/products/low-stock");
    setProducts(res.data);
  };

  useEffect(() => {
    loadLowStock();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-red-600 mb-6"> Productos con Stock Bajo</h2>

      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Mínimo</th>
              <th className="p-2 border">Categoría</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="bg-red-50">
                <td className="p-2 border">{p.id}</td>
                <td className="p-2 border font-semibold">{p.name}</td>
                <td className="p-2 border text-red-600 font-bold">{p.stock}</td>
                <td className="p-2 border">{p.min_stock}</td>
                <td className="p-2 border">{p.category_name || "Sin categoría"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
             No hay productos con stock bajo.
          </p>
        )}
      </div>
    </div>
  );
}
