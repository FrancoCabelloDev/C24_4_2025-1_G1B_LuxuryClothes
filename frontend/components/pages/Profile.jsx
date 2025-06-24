import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    celular: '',
    direccion: '',
    dni: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || !storedUser.email) {
      navigate('/login');
      return;
    }
    // Obtener datos actualizados del backend
    axios.get(`http://localhost:8084/api/user/profile?email=${encodeURIComponent(storedUser.email)}`)
      .then(res => {
        setUser(res.data);
        setForm({
          nombre: res.data.nombre || '',
          celular: res.data.celular || '',
          direccion: res.data.direccion || '',
          dni: res.data.dni || ''
        });
      })
      .catch(() => {
        alert('Error al cargar datos del perfil');
        navigate('/login');
      });
  }, [navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setForm({
      nombre: user.nombre || '',
      celular: user.celular || '',
      direccion: user.direccion || '',
      dni: user.dni || ''
    });
    setEditMode(false);
  };

  const handleSave = async e => {
    e.preventDefault();
    try {
      const updated = {
        ...user,
        nombre: form.nombre,
        celular: form.celular,
        direccion: form.direccion,
        dni: form.dni
      };
      await axios.put('http://localhost:8084/api/user/profile', updated, {
        headers: { 'Content-Type': 'application/json' }
      });
      setUser(updated);
      setEditMode(false);
      alert('Perfil actualizado correctamente');
    } catch {
      alert('Error al actualizar perfil');
    }
  };

  if (!user) return null;

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href="/">Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">Usuario</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>Perfil</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="d-flex flex-column align-items-center justify-content-center text-center">
                <div className="d-flex flex-column align-items-center w-100">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle mx-auto"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    fluid
                  />
                  <p className="text-muted mb-1 mt-3">{user.nombre || 'Cliente'}</p>
                  <p className="text-muted mb-4">{user.direccion || 'Dirección no registrada'}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn outline onClick={() => navigate('/')}>Volver a la tienda</MDBBtn>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="id-card" />
                    <MDBCardText>DNI: {user.dni || 'No registrado'}</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="mobile-alt" />
                    <MDBCardText>Celular: {user.celular || 'No registrado'}</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="envelope" />
                    <MDBCardText>{user.email}</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <form onSubmit={handleSave}>
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText>Nombre completo</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      {editMode ? (
                        <input
                          type="text"
                          name="nombre"
                          value={form.nombre}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      ) : (
                        <MDBCardText className="text-muted">{user.nombre || '-'}</MDBCardText>
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <MDBCardText className="text-muted">{user.email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText>Celular</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      {editMode ? (
                        <input
                          type="text"
                          name="celular"
                          value={form.celular}
                          onChange={handleChange}
                          className="form-control"
                        />
                      ) : (
                        <MDBCardText className="text-muted">{user.celular || '-'}</MDBCardText>
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText>Dirección</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      {editMode ? (
                        <input
                          type="text"
                          name="direccion"
                          value={form.direccion}
                          onChange={handleChange}
                          className="form-control"
                        />
                      ) : (
                        <MDBCardText className="text-muted">{user.direccion || '-'}</MDBCardText>
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText>DNI</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      {editMode ? (
                        <input
                          type="text"
                          name="dni"
                          value={form.dni}
                          onChange={handleChange}
                          className="form-control"
                        />
                      ) : (
                        <MDBCardText className="text-muted">{user.dni || '-'}</MDBCardText>
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  {editMode ? (
                    <div className="d-flex gap-2">
                      <MDBBtn type="submit" color="success">Guardar</MDBBtn>
                      <MDBBtn type="button" color="secondary" onClick={handleCancel}>Cancelar</MDBBtn>
                    </div>
                  ) : (
                    <MDBBtn type="button" onClick={handleEdit}>Editar Perfil</MDBBtn>
                  )}
                </form>
              </MDBCardBody>
            </MDBCard>
            {/* Puedes agregar aquí más tarjetas con historial de compras, direcciones, etc. */}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}