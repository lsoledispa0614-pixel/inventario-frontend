import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    min_stock: "",
    category_id: ""
  });

  const loadProducts = async () => {
    const res = await api.get("/api/products");
    setProducts(res.data);
  };

  const loadCategories = async () => {
    const res = await api.get("/api/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/products", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        min_stock: Number(form.min_stock),
        category_id: form.category_id ? Number(form.category_id) : null
      });

      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        min_stock: "",
        category_id: ""
      });

      loadProducts();
      alert(" Producto creado");
    } catch (error) {
      alert(error.response?.data?.msg || "Error al crear producto");
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;
    await api.delete(`/api/products/${id}`);
    loadProducts();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Productos</h2>

      {/* FORM */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Agregar Producto</h3>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          />

          <input
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />

          <input
            name="price"
            type="number"
            placeholder="Precio"
            value={form.price}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock inicial"
            value={form.stock}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          />

          <input
            name="min_stock"
            type="number"
            placeholder="Stock mínimo"
            value={form.min_stock}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          />

          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          >
            <option value="">Sin categoría</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition md:col-span-2">
            Guardar Producto
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Lista de Productos</h3>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Precio</th>
              <th className="p-2 border">Categoría</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="p-2 border">{p.id}</td>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.stock}</td>
                <td className="p-2 border">${p.price}</td>
                <td className="p-2 border">{p.category_name || "Sin categoría"}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No hay productos registrados.
          </p>
        )}
      </div>
    </div>
  );
}
