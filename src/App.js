import "./App.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Card from "./Components/Card";

function App() {
  const [userInfo, setUserInfo] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const handleSubmitFunction = (data) => {
    setUserInfo(data);
    setShowCard(true);
  };
  const formSchema = yup.object().shape({
    loginName: yup
      .string()
      .required("Campo Obrigatorio!")
      .test("len", "Maximo de 8 caracteres", (val) => val.length < 8),
    completName: yup
      .string()
      .required("Campo Obrigatorio!")
      .test("len", "Maximo de 18 caracteres", (val) => val.length < 18),
    endereco: yup.string("Seu endereco apenas").required("Campo Obrigatorio!"),
    idade: yup
      .number("Apenas numeros")
      .required("Campo Obrigatorio!")
      .positive("O numero deve ser entre 0 e 100")
      .integer("O numero deve ser entre 0 e 100"),

    email: yup.string().email("Email invalido").required("Campo Obrigatorio!"),
    confirmEmail: yup
      .string()
      .required("Campo Obrigatorio!")
      .email("Email invalido")
      .oneOf([yup.ref("email"), null], "O email deve ser o mesmo do acima"),
    password: yup
      .string()
      .required("Campo Obrigatorio!")
      .matches(/[a-zA-Z]/, "A senha deve conter apenas letras.")
      .min(8, "A senha e muito curta, tem que ser no min 8 caracteres."),
    confirmPassword: yup
      .string()
      .required("Campo Obrigatorio!")
      .oneOf([yup.ref("password"), null], "As senhas nao combinam"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  return (
    <div className={"container"}>
      <h3>Formulario</h3>
      {!showCard && (
        <form className={"form"} onSubmit={handleSubmit(handleSubmitFunction)}>
          <input placeholder="Nome de Usuario" {...register("loginName")} />
          {errors.loginName?.message}
          <input placeholder="Nome Completo" {...register("completName")} />
          {errors.completName?.message}
          <input placeholder="Idade" {...register("idade")} />
          {errors.idade?.message}
          <input placeholder="Endereco" {...register("endereco")} />
          {errors.endereco?.message}
          <input placeholder="Endereco de e-mail" {...register("email")} />
          {errors.email?.message}
          <input
            placeholder="Confirme seu e-mail"
            {...register("confirmEmail")}
          />
          {errors.confirmEmail?.message}
          <input placeholder="Senha Apenas Letras" {...register("password")} />
          {errors.password?.message}
          <input
            placeholder="Confirme sua Senha"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message}
          <label for="terms">Eu aceito os termos de uso da aplicacao</label>
          <input type="checkbox" name="terms" required />
          <button type="submit"> Cadastrar</button>
        </form>
      )}
      {showCard && <Card userInfo={userInfo} />}
    </div>
  );
}

export default App;
