import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { thirdStepSchema } from "../../../utils/schemas";
import { RegistrationFormContext } from "../../../utils/contexts";
import Button from "../../global/Button";
import PasswordInput from "../../global/PasswordInput";

export default function ThirdStep() {
  const { nextStep, data, previousStep } = useContext(RegistrationFormContext);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    console.log("[RENDER] ThirdStep");
  }, []);

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
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Senha de acesso</h1>

      <PasswordInput
        id="password"
        name="password"
        defaultValue={data.current.password}
        label="Sua senha"
        errorMessage={errorMsg}
        onChange={handleChange}
      />

      <div className="flex justify-between gap-4 mt-8">
        <Button type="button" onClick={previousStep} secondary>
          Voltar
        </Button>

        <Button type="submit">Continuar</Button>
      </div>
    </form>
  );
}
