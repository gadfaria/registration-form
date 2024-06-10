import { Fragment, useContext, useState } from "react";
import { z } from "zod";
import { RegistrationFormContext } from "../../../utils/contexts";
import { masks } from "../../../utils/functions";
import { secondStepSchema } from "../../../utils/schemas";
import { SecondStepFormData } from "../../../utils/types";
import Button from "../../global/Button";
import Input from "../../global/Input";
import Title from "../../global/Title";

export default function SecondStep() {
  const { nextStep, data, previousStep } = useContext(RegistrationFormContext);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

    if (masks[name]) {
      e.target.value = masks[name](value);
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  }

  function InputsByType() {
    let d = data.current as SecondStepFormData;
    if (d.type === "PF") {
      return (
        <Fragment>
          <Title>Pessoa Física</Title>
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
            label="Data de nascimento"
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
          <Title>Pessoa Jurídica</Title>
          <Input
            label="Razão social"
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
            id="foundationDate"
            name="foundationDate"
            type="date"
            defaultValue={d.foundationDate}
            errorMessage={errors.foundationDate}
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
