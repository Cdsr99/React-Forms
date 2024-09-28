import { Button, Label, Fieldset, Input, Form, Titulo, ErrorMessage } from "../../components";
import { useForm } from "react-hook-form";

const CadastroPessoal = () => {

  interface FormInputTipos {
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    senhaVerificada: string;
  }

  const { register, handleSubmit, formState: {errors} } = useForm<FormInputTipos>()

  const aoSubmeter = (dados: FormInputTipos) => {
    console.log(dados)
  }

  function validarEmail(valor: string){
    const formatoEmail = /^[^\s@]+@alura\.com\.br$/;
    if(!formatoEmail.test(valor)){
      console.log("Endereço de email invalido");
      return false;
    }
    return true;
  }

  return (
    <>
      <Titulo>Insira alguns dados básicos:</Titulo>
      <Form onSubmit={handleSubmit(aoSubmeter)}>
        <Fieldset>
          <Label htmlFor="campo-nome">Nome</Label>
          <Input
            id="campo-nome"
            placeholder="Digite seu nome completo"
            type="text"
            $error={!!errors.nome}
            {...register("nome", {required: "O campo nome é obrigatório", minLength: {
              value: 3,
              message: "O nome deve ter pelo menos 3 caracteres"
            }})}
          />
          {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
        </Fieldset>
        
        <Fieldset>
          <Label htmlFor="campo-email">E-mail</Label>
          <Input
            id="campo-email"
            placeholder="Insira seu endereço de email"
            type="email"
            $error={!!errors.email}
            {...register("email", {required: "O campo email é obrigatório", validate: {validarEmail}})}
          />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Fieldset>

        <Fieldset>
          <Label>Telefone</Label>
          <Input
            id="campo-telefone"
            type="text"
            placeholder="Ex: (DDD) XXXXX-XXXX"
            $error={!!errors.telefone}
            {...register("telefone", {required: "O campo telefone é obrigatório", pattern: /^\(\d{2,3}\) \d{5}-\d{4}$/})}
          />
        {errors.telefone && <ErrorMessage>{errors.telefone.message}</ErrorMessage>}
        </Fieldset>

        <Fieldset>
          <Label htmlFor="campo-senha">Crie uma senha</Label>
          <Input
            id="campo-senha"
            placeholder="Crie uma senha"
            type="password"
            $error={!!errors.senha}
            {...register("senha",{required: "O campo senha é obrigatório"})}
          />
        {errors.senha && <ErrorMessage>{errors.senha.message}</ErrorMessage>}
        </Fieldset>

        <Fieldset>
          <Label htmlFor="campo-senha-confirmacao">Repita a senha</Label>
          <Input
            id="campo-senha-confirmacao"
            placeholder="Repita a senha anterior"
            type="password"
            $error={!!errors.senhaVerificada}
            {...register("senhaVerificada",{required: "O campo confirmação de senha é obrigatório"})}
          />
        {errors.senhaVerificada && <ErrorMessage>{errors.senhaVerificada.message}</ErrorMessage>}
        </Fieldset>

        <Button type="submit">Avançar</Button>
      </Form>
    </>
  );
};

export default CadastroPessoal;
