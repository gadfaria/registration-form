import { useContext, useState } from "react";
import { z } from "zod";
import { RegistrationFormContext } from "../../../utils/contexts";
import { firstStepSchema } from "../../../utils/schemas";
import Button from "../../global/Button";
import Input from "../../global/Input";
import RadioGroups from "../../global/RadioGroups";
import Title from "../../global/Title";

export default function FirstStep() {
  let { nextStep, data } = useContext(RegistrationFormContext);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function handleSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const dataToValidate = Object.fromEntries(formData);

    try {
      const values = firstStepSchema.parse(dataToValidate);
      data.current = { ...data.current, ...values };
      nextStep();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const mappedErrors: { [key: string]: string } = {};

        err.issues.forEach((issue) => {
          mappedErrors[issue.path[0]] = issue.message;
        });

        setErrors(mappedErrors);
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    data.current = { ...data.current, [name]: value };

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Title>Seja bem-vindo(a)!</Title>

      <Input
        id="email"
        name="email"
        type="text"
        label="Endereço de e-mail"
        defaultValue={data.current.email}
        errorMessage={errors.email}
        onChange={handleChange}
      />

      <RadioGroups
        options={[
          { id: "PF", title: "Pessoa Física" },
          { id: "PJ", title: "Pessoa Jurídica" },
        ]}
        name="type"
        defaultValue={data.current.type}
        errorMessage={errors.type}
        onChange={handleChange}
      />

      <Button type="submit">Continuar</Button>
    </form>
  );
}
