import "./style.css";
function Card({ userInfo }) {
  return (
    <div className="card">
      <ul>
        <li>
          <p>Login: {userInfo.loginName}</p>
        </li>
        <li>
          <p>Nome Completo: {userInfo.completName}</p>
        </li>
        <li>
          <p>Idade: {userInfo.idade}</p>
        </li>
        <li>
          <p>Endereco: {userInfo.endereco}</p>
        </li>
        <li>
          <p>Email: {userInfo.email}</p>
        </li>
        <li>
          <p>Senha: {userInfo.password}</p>
        </li>
      </ul>
    </div>
  );
}

export default Card;
