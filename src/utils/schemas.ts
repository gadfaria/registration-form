import { z } from "zod";

export const firstStepSchema = z.object({
  email: z.string().email("E-mail inválido"),
  type: z.enum(["pessoa-fisica", "pessoa-juridica"], {
    message: "Tipo inválido",
  }),
});

const personSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  cpf: z
    .string()
    .refine((cpf) => cpf.replace(/\D/g, "").length === 11, "CPF inválido")
    .transform((cpf) => cpf.replace(/\D/g, "")),
  birthDay: z.string().refine((birthDay) => {
    const date = new Date(birthDay);
    return date instanceof Date && !isNaN(date.getTime());
  }, "Data de nascimento inválida"),
  phone: z
    .string()
    .refine(
      (phone) =>
        phone.replace(/\D/g, "").length === 11 ||
        phone.replace(/\D/g, "").length === 10,
      "Telefone inválido"
    )
    .transform((phone) => phone.replace(/\D/g, "")),
});

const companySchema = z.object({
  company: z.string().min(3, "Nome muito curto"),
  cnpj: z
    .string()
    .refine((cnpj) => cnpj.replace(/\D/g, "").length === 14, "CNPJ inválido")
    .transform((cnpj) => cnpj.replace(/\D/g, "")),
  openAt: z.string().refine((openAt) => {
    const date = new Date(openAt);
    return date instanceof Date && !isNaN(date.getTime());
  }, "Data de abertura inválida"),
  phone: z
    .string()
    .refine(
      (phone) =>
        phone.replace(/\D/g, "").length === 11 ||
        phone.replace(/\D/g, "").length === 10,
      "Telefone inválido"
    )
    .transform((phone) => phone.replace(/\D/g, "")),
});

export const secondStepSchema = personSchema.or(companySchema);

export const thirdStepSchema = z.object({
  password: z.string().min(6, "Senha muito curta"),
});

export const fourthStepSchema = z
  .object({})
  .and(firstStepSchema.omit({ type: true }))
  .and(secondStepSchema)
  .and(thirdStepSchema);
