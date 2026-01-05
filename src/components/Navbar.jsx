import { Link } from "react-router-dom";

export default function Navbar({ onLogout }) {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-lg text-blue-600">Inventario</h1>

      <div className="flex gap-4">
        <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        <Link to="/products" className="hover:text-blue-600">Productos</Link>
        <Link to="/movements" className="hover:text-blue-600">Movimientos</Link>
        <Link to="/low-stock" className="hover:text-blue-600">Stock Bajo</Link>
      </div>

      <button
        onClick={onLogout}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        Salir
      </button>
    </nav>
  );
}

