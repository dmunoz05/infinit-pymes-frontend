import AuthProvider from "../lib/auth/authProvider/AuthProvider.jsx";
import Router from "@routes/router/root.jsx";
import "./app.css";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}
