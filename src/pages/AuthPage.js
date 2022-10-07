import AuthForm from "../components/Auth/AuthForm";

const AuthPage = (props) => {
  const addHandler = (userData) => {
    props.onAdd(userData);
  };
  const datasHandler = (data) => {
    props.onAddDataSuccess(data);
  };

  return <AuthForm onAddSuccess={datasHandler} onAddData={addHandler} />;
};

export default AuthPage;
