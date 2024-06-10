import { useContext, useState } from "react";
import { z } from "zod";
import { RegistrationFormContext } from "../../../utils/contexts";
import { thirdStepSchema } from "../../../utils/schemas";
import Button from "../../global/Button";
import PasswordInput from "../../global/PasswordInput";
import Title from "../../global/Title";

export default function ThirdStep() {
  const { nextStep, data, previousStep } = useContext(RegistrationFormContext);

  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const dataToValidate = Object.fromEntries(formData);

    try {
      const values = thirdStepSchema.parse(dataToValidate);
      data.current = { ...data.current, ...values };
      nextStep();
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrorMsg(err.issues[0].message);
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    data.current = { ...data.current, [name]: value };

    setErrorMsg("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Title>Senha de acesso</Title>

      <PasswordInput
        id="password"
        name="password"
        defaultValue={data.current.password}
        label="Sua senha"
        errorMessage={errorMsg}
        onChange={handleChange}
      />

      <div className="flex justify-between gap-4 mt-4">
        <Button type="button" onClick={previousStep} secondary>
          Voltar
        </Button>

        <Button type="submit">Continuar</Button>
      </div>
    </form>
  );
}
