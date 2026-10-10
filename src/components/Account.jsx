import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Form,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export default function Account() {
  const { state, dispatch } = useAuth();
  const [validated, setValidated] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!state.isAuthenticated) return;
    api("/auth/me", { token: state.token })
      .then((data) => setProfile(data.user))
      .catch((err) => setError(err.message));
  }, [state.isAuthenticated, state.token]);

  async function login(event) {
    event.preventDefault();
    setValidated(true);
    setMessage("");
    if (!event.currentTarget.checkValidity()) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: "Error de inicio de sesion. Revisar credenciales.",
      });
      return;
    }
    const data = new FormData(event.currentTarget);
    dispatch({ type: "LOGIN_START" });
    try {
      const result = await api("/auth/login", {
        method: "POST",
        body: {
          email: data.get("email").trim(),
          password: data.get("password"),
        },
      });
      dispatch({ type: "LOGIN", payload: result });
      setValidated(false);
      window.location.hash = "hero";
    } catch (err) {
      dispatch({ type: "LOGIN_ERROR", payload: err.message });
    }
  }

  async function register(event) {
    event.preventDefault();
    setValidated(true);
    setMessage("");
    setError("");
    if (!event.currentTarget.checkValidity()) {
      setError("Error al registrarse. Revisar los campos.");
      return;
    }
    const data = new FormData(event.currentTarget);
    setLoading(true);
    try {
      await api("/auth/register", {
        method: "POST",
        body: {
          name: data.get("name").trim(),
          email: data.get("email").trim(),
          password: data.get("password"),
        },
      });
      setValidated(false);
      setIsRegister(false);
      setMessage("Se registro correctamente. Puede iniciar sesion.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setProfile(null);
    dispatch({ type: "LOGOUT" });
  }

  function changeMode() {
    setIsRegister(!isRegister);
    setValidated(false);
    setMessage("");
    setError("");
  }

  return (
    <section
      id="cuenta"
      className="section-block account-section"
      aria-labelledby="account-title"
    >
      <Card className="w-100" style={{ maxWidth: "32rem" }}>
        <Card.Body>
          <h1 id="account-title" className="mb-3">
            {state.isAuthenticated
              ? "Mi perfil"
              : isRegister
                ? "Registrarse"
                : "Iniciar Sesión"}
          </h1>
          {state.isAuthenticated ? (
            <>
              {!profile && !error && (
                <Spinner
                  animation="border"
                  variant="success"
                  className="mb-3"
                />
              )}
              {error && <Alert variant="danger">{error}</Alert>}
              {profile && (
                <>
                  <Badge
                    bg={profile.role === "admin" ? "dark" : "success"}
                    className="mb-3"
                  >
                    {profile.role}
                  </Badge>
                  <ListGroup variant="flush" className="mb-3">
                    <ListGroup.Item className="text-break">
                      <strong>Nombre:</strong> {profile.name}
                    </ListGroup.Item>
                    <ListGroup.Item className="text-break">
                      <strong>Correo:</strong> {profile.email}
                    </ListGroup.Item>
                    <ListGroup.Item className="text-break">
                      <strong>Id usuario:</strong> {profile._id}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Fecha de registro:</strong>{" "}
                      {new Date(profile.createdAt).toLocaleString("es-GT")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Ultima actualizacion:</strong>{" "}
                      {new Date(profile.updatedAt).toLocaleString("es-GT")}
                    </ListGroup.Item>
                  </ListGroup>
                </>
              )}
              <Button variant="success" onClick={logout}>
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <Form
              noValidate
              validated={validated}
              onSubmit={isRegister ? register : login}
            >
              <p>
                {isRegister
                  ? "Llene los datos para registrarse"
                  : "Llene los datos para iniciar sesion"}
              </p>
              {message && <Alert variant="success">{message}</Alert>}
              {!isRegister && state.error && (
                <Alert variant="danger" role="alert">
                  {state.error}
                </Alert>
              )}
              {isRegister && error && (
                <Alert variant="danger" role="alert">
                  {error}
                </Alert>
              )}
              {isRegister && (
                <Form.Group className="mb-3" controlId="login-name">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    name="name"
                    autoComplete="name"
                    required
                    pattern=".*\S.*"
                    maxLength={100}
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingresa tu nombre.
                  </Form.Control.Feedback>
                </Form.Group>
              )}
              <Form.Group className="mb-3" controlId="login-email">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa un correo válido.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="login-password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  autoComplete={
                    isRegister ? "new-password" : "current-password"
                  }
                  required
                  minLength={8}
                  pattern=".*\S.*"
                />
                <Form.Control.Feedback type="invalid">
                  La contrasena debe tener al menos 8 caracteres
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex flex-wrap gap-2">
                <Button
                  type="submit"
                  variant="success"
                  disabled={state.isLoading || loading}
                >
                  {isRegister ? "Registrarse" : "Iniciar Sesión"}
                </Button>
                <Button
                  variant="link"
                  className="text-success"
                  onClick={changeMode}
                >
                  {isRegister ? "Tengo cuenta" : "Crear cuenta"}
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </section>
  );
}
