export default function Dashboard({ user }) {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-blue-600">Dashboard</h1>
      <p className="text-gray-700">
        Bienvenido <strong>{user?.name}</strong> 
      </p>
      <p className="mt-2 text-gray-500">
        Usa el menú superior para gestionar productos y movimientos.
      </p>
    </div>
  );
}


