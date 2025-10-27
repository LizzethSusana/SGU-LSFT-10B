import { useEffect, useState } from 'react'
import './App.css'
import UserController from './modules/user/user.controller'

function App() {
  const emptyForm = { fullname: '', email: '', phoneNumber: '' };
  const [form, setForm] = useState(emptyForm);
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const res = await UserController.getUsers();
    if (res && res.data) {
      setUsers(res.data);
    } else if (Array.isArray(res)) {
      setUsers(res);
    } else {
      setUsers([]);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullname.trim() || !form.email.trim()) {
      setMessage({ type: 'danger', text: 'Nombre y correo son obligatorios.' });
      return;
    }

    setLoading(true);
    if (editingId) {
      const res = await UserController.updateUser(editingId, form);
      setMessage({ type: 'success', text: res?.message || 'Usuario actualizado' });
      setEditingId(null);
    } else {
      const res = await UserController.createUser(form);
      setMessage({ type: 'success', text: res?.message || 'Usuario creado' });
    }
    setForm(emptyForm);
    await loadUsers();
    setLoading(false);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleEdit = async (user) => {
    setForm({ fullname: user.fullname || user.name || '', email: user.email || '', phoneNumber: user.phoneNumber || '' });
    setEditingId(user.id || user._id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm('¿Eliminar usuario?');
    if (!ok) return;
    setLoading(true);
    const res = await UserController.deleteUser(id);
    setMessage({ type: 'success', text: res?.message || 'Usuario eliminado' });
    await loadUsers();
    setLoading(false);
    setTimeout(() => setMessage(null), 2500);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Gestión de Usuarios</h2>

      {message && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      <div className="row flex-column">
        <div className="col-12 mb-4">
          <div className="card shadow-sm card-custom">
            <div className="card-body">
              <h5 className="card-title mb-3">{editingId ? 'Editar usuario' : 'Registrar usuario'}</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input name="fullname" value={form.fullname} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo electrónico</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Número de teléfono</label>
                  <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="form-control" />
                </div>
                    <div className="d-flex gap-2 justify-content-center flex-wrap form-actions">
                    <button type="submit" className="btn btn-primary btn-lg px-4" disabled={loading}>
                      {editingId ? 'Actualizar' : 'Crear'}
                    </button>
                  </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card shadow-sm card-custom">
            <div className="card-body">
              <h5 className="card-title mb-3">Usuarios {loading && <small className="text-muted">(cargando...)</small>}</h5>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Teléfono</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center">No hay usuarios registrados</td>
                      </tr>
                    ) : (
                      users.map(u => (
                        <tr key={u.id || u._id}>
                          <td>{u.fullname || u.name}</td>
                          <td>{u.email}</td>
                          <td>{u.phoneNumber}</td>
                          <td className="text-end">
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(u)}>Editar</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(u.id || u._id)}>Eliminar</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
