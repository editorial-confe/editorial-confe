import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  // Simulación de datos que vendrían de Firebase
  const [stats, setStats] = useState({
    totalSales: 154200,
    totalOrders: 771,
    activeUsers: 1205
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: '#88392', user: 'maria@ejemplo.com', date: 'Hace 5 min', status: 'Completado', amount: 200 },
    { id: '#88391', user: 'juan.perez@test.com', date: 'Hace 12 min', status: 'Completado', amount: 200 },
    { id: '#88390', user: 'parroquia.sanjose@org.mx', date: 'Hace 1 hora', status: 'Pendiente', amount: 2000 },
    { id: '#88389', user: 'luisa.m@gmail.com', date: 'Hace 2 horas', status: 'Completado', amount: 200 },
  ]);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Panel de Control - Editorial CONFE</h2>
        <div className="admin-user">Hola, Administrador 🛡️</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
            <h3>Ventas Totales</h3>
            <div className="value">${stats.totalSales.toLocaleString()} MXN</div>
        </div>
        <div className="stat-card green">
            <h3>Pedidos</h3>
            <div className="value">{stats.totalOrders}</div>
        </div>
        <div className="stat-card purple">
            <h3>Usuarios Activos</h3>
            <div className="value">{stats.activeUsers}</div>
        </div>
      </div>

      <div className="admin-section">
        <h3>Últimos Pedidos (Tiempo Real)</h3>
        <div className="table-responsive">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID Pedido</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Monto</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {recentOrders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.user}</td>
                            <td>{order.date}</td>
                            <td>
                                <span className={`status-badge ${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td>${order.amount}</td>
                            <td>
                                <button className="btn-icon">👁️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      <div className="admin-section">
        <h3>Gestión de Archivos (PDF)</h3>
        <div className="file-manager card">
            <div className="file-info">
                <span className="file-icon">📄</span>
                <div>
                    <strong>Libro_Jesus_y_Maria_Master.pdf</strong>
                    <p>Última actualización: 10 Oct 2023 • 25 MB</p>
                </div>
            </div>
            <button className="btn btn-secondary small">Reemplazar Archivo</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;