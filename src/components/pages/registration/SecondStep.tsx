import { Fragment, useContext, useEffect, useState } from "react";
import { z } from "zod";
import { RegistrationFormContext } from "../../../utils/contexts";
import { masks } from "../../../utils/functions";
import { secondStepSchema } from "../../../utils/schemas";
import Button from "../../global/Button";
import Input from "../../global/Input";
import { SecondStepFormData } from "../../../utils/types";

export default function SecondStep() {
  const { nextStep, data, previousStep } = useContext(RegistrationFormContext);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    console.log("[RENDER] SecondStep");
  }, []);

  function handleSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const dataToValidate = Object.fromEntries(formData);

    try {
      const values = secondStepSchema.parse(dataToValidate);
      console.log(values);
      data.current = { ...data.current, ...values };
      nextStep();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const mappedErrors: any = {};

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

    if (masks[name]) {
      e.target.value = masks[name](value);
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  }

  function InputsByType() {
    let d = data.current as SecondStepFormData;
    if (d.type === "pessoa-fisica") {
      return (
        <Fragment>
          <h1 className="text-2xl font-bold">Pessoa Física</h1>
          <Input
            label="Nome"
            id="name"
            name="name"
            type="text"
            defaultValue={d.name}
            errorMessage={errors.name}
            onChange={handleChange}
          />
          <Input
            label="CPF"
            id="cpf"
            name="cpf"
            type="text"
            defaultValue={masks.cpf(d.cpf)}
            errorMessage={errors.cpf}
            onChange={handleChange}
          />
          <Input
            label="Data de Nascimento"
            id="birthDay"
            name="birthDay"
            type="date"
            defaultValue={d.birthDay}
            errorMessage={errors.birthDay}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
          />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <h1 className="text-2xl font-bold">Pessoa Jurídica</h1>

          <Input
            label="Razão Social"
            id="company"
            name="company"
            type="text"
            defaultValue={d.company}
            errorMessage={errors.company}
            onChange={handleChange}
          />

          <Input
            label="CNPJ"
            id="cnpj"
            name="cnpj"
            type="text"
            defaultValue={masks.cnpj(d.cnpj)}
            errorMessage={errors.cnpj}
            onChange={handleChange}
          />

          <Input
            label="Data de abertura"
            id="openAt"
            name="openAt"
            type="date"
            defaultValue={d.openAt}
            errorMessage={errors.openAt}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
          />
        </Fragment>
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <InputsByType />

      <Input
        label="Telefone"
        id="phone"
        name="phone"
        type="text"
        defaultValue={masks.phone(data.current.phone)}
        errorMessage={errors.phone}
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
