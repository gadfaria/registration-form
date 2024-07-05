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

export type PF = {
  type: "PF";
  name: string;
  cpf: string;
  birthDay: string;
};

export type PJ = {
  type: "PJ";
  company: string;
  cnpj: string;
  foundationDate: string;
};

export type SecondStepFormData = PF | PJ;
