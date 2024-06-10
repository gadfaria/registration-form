export type RegistrationFormValues = {
  email: string;
  phone: string;
  password: string;
  type: "pessoa-fisica" | "pessoa-juridica";
} & (
  | {
      name: string;
      cpf: string;
      birthDay: string;
    }
  | {
      company: string;
      cnpj: string;
      openAt: string;
    }
);

export type SecondStepFormData =
  | { type: "pessoa-fisica"; name: string; cpf: string; birthDay: string }
  | { type: "pessoa-juridica"; company: string; cnpj: string; openAt: string };
