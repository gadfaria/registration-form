export type RegistrationFormValues = {
  email: string;
  phone: string;
  password: string;
  type: "PF" | "PJ";
} & (
  | {
      name: string;
      cpf: string;
      birthDay: string;
    }
  | {
      company: string;
      cnpj: string;
      foundationDate: string;
    }
);

export type SecondStepFormData =
  | { type: "PF"; name: string; cpf: string; birthDay: string }
  | {
      type: "PJ";
      company: string;
      cnpj: string;
      foundationDate: string;
    };
