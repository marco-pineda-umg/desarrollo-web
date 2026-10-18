import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

const emptyForm = {
  title: "",
  description: "",
  info: "",
  price: "",
  stock: "",
  category: "",
  image: "",
  section: "nuevo",
};

export default function Productos() {
  const { state } = useAuth();
  const [recursos, setRecursos] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function loadRecursos(q = "") {
    api("/recursos?q=" + encodeURIComponent(q))
      .then((data) => setRecursos(data.recursos))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadRecursos();
  }, []);

  function change(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function searchRecursos(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    loadRecursos(search);
  }

  async function save(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    const body = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      image: form.image || "/item1.webp",
    };
    try {
      if (editId) {
        await api("/recursos/" + editId, {
          method: "PUT",
          body,
        });
        setMessage("producto actualizado correctamente");
      } else {
        await api("/recursos", { method: "POST", body });
        setMessage("producto creado correctamente");
      }
      setForm(emptyForm);
      setEditId(null);
      loadRecursos(search);
    } catch (err) {
      setError(err.message);
    }
  }

  async function edit(id) {
    setError("");
    setMessage("");
    try {
      const data = await api("/recursos/" + id);
      const {
        title,
        description,
        info,
        price,
        stock,
        category,
        image,
        section,
      } = data.recurso;
      setForm({
        title,
        description,
        info,
        price,
        stock,
        category,
        image,
        section,
      });
      setEditId(id);
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    if (!window.confirm("Seguro que desea eliminar el producto?")) return;
    setError("");
    setMessage("");
    try {
      await api("/recursos/" + id, { method: "DELETE" });
      setMessage("Producto eliminado correctamente");
      loadRecursos(search);
    } catch (err) {
      setError(err.message);
    }
  }

  function cancel() {
    setForm(emptyForm);
    setEditId(null);
  }

  return (
    <section id="productos" className="section-block w-100">
      <div className="section-title">
        <h1>Gestion de productos</h1>
        <div className="underline"></div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      {state.isAuthenticated ? (
        <Card className="mb-4" style={{ maxWidth: "100%" }}>
          <Card.Body>
            <h5 className="mb-3">
              {editId ? "Editar producto" : "Nuevo producto"}
            </h5>
            <Form onSubmit={save}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group controlId="producto-title">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      name="title"
                      value={form.title}
                      onChange={change}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="producto-category">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control
                      name="category"
                      value={form.category}
                      onChange={change}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group controlId="producto-description">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                      name="description"
                      value={form.description}
                      onChange={change}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group controlId="producto-info">
                    <Form.Label>Informacion</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="info"
                      value={form.info}
                      onChange={change}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="producto-price">
                    <Form.Label>precio</Form.Label>
                    <Form.Control
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={change}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="producto-stock">
                    <Form.Label>stock</Form.Label>
                    <Form.Control
                      name="stock"
                      type="number"
                      min="0"
                      step="1"
                      value={form.stock}
                      onChange={change}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="producto-section">
                    <Form.Label>seccion</Form.Label>
                    <Form.Select
                      name="section"
                      value={form.section}
                      onChange={change}
                    >
                      <option value="ofertas">ofertas</option>
                      <option value="nuevo">nuevos productos</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group controlId="producto-image">
                    <Form.Label>Ruta de la imagen</Form.Label>
                    <Form.Control
                      name="image"
                      value={form.image}
                      onChange={change}
                      placeholder="/item1.webp"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex gap-2 mt-3">
                <Button type="submit" className="btn-item">
                  {editId ? "Guardar" : "Crear"}
                </Button>
                {editId && (
                  <Button variant="secondary" onClick={cancel}>
                    Cancelar
                  </Button>
                )}
              </div>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="warning">Inicie sesion para gestionar productos.</Alert>
      )}

      <Form className="d-flex gap-2 mb-3" onSubmit={searchRecursos}>
        <Form.Control
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="nombre de producto"
        />
        <Button type="submit" className="btn-item">
          Buscar
        </Button>
      </Form>

      {loading ? (
        <Spinner animation="border" variant="success" />
      ) : recursos.length === 0 ? (
        <p>No hay productos ingresados...</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>producto</th>
              <th>categoria</th>
              <th>seccion</th>
              <th>precio</th>
              <th>stock</th>
              {state.isAuthenticated && <th>acciones</th>}
            </tr>
          </thead>
          <tbody>
            {recursos.map((recurso) => (
              <tr key={recurso._id}>
                <td>{recurso.title}</td>
                <td>{recurso.category}</td>
                <td>
                  <Badge
                    bg={recurso.section === "ofertas" ? "danger" : "success"}
                  >
                    {recurso.section}
                  </Badge>
                </td>
                <td>Q{recurso.price.toFixed(2)}</td>
                <td>{recurso.stock}</td>
                {state.isAuthenticated && (
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="outline-success"
                        onClick={() => edit(recurso._id)}
                      >
                        editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => remove(recurso._id)}
                      >
                        borrar
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </section>
  );
}
