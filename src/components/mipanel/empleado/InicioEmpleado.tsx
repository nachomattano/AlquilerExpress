export default function InicioEmpleado() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    return (
        <div>
            <h1 className="text-xl mb-4">
                ¡Bienvenido {user.nombre}!
            </h1>
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white rounded-md shadow-md p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Total Empleados</p>
                            <p className="text-2xl font-bold text-gray-90">18</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-md shadow-md p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Total Empleados</p>
                            <p className="text-2xl font-bold text-gray-90">18</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-md shadow-md p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Total Empleados</p>
                            <p className="text-2xl font-bold text-gray-90">18</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-md shadow-md p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Total Empleados</p>
                            <p className="text-2xl font-bold text-gray-90">18</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}