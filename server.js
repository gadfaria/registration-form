import bodyParser from "body-parser";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(bodyParser.json());

const personSchema = z.object({
  name: z.string().min(3),
  cpf: z.string().length(11),
  birthDay: z.string(),
});

const companySchema = z.object({
  company: z.string().min(3),
  cnpj: z.string().length(14),
  foundationDate: z.string(),
});

const schema = z
  .object({
    email: z.string().email(),
    type: z.enum(["PF", "PJ"]),
    phone: z.string().min(10).max(11),
    password: z.string().min(6),
  })
  .and(personSchema.or(companySchema));

const DATA = [];

app.use(express.static(path.resolve(__dirname, "dist")));

app.get("/registration", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.post("/registration", (req, res) => {
  try {
    const value = schema.parse(req.body);

    const { email, cpf, cnpj } = value;

    const alreadyRegisteredWithEmail = DATA.find(
      (data) => data.email === email
    );
    if (alreadyRegisteredWithEmail) {
      return res.status(400).send({
        code: "DUPLICATED_DATA",
        message: "Email já cadastrado",
        key: "email",
      });
    }

    if (cpf) {
      const alreadyRegisteredWithCpf = DATA.find((data) => data.cpf === cpf);
      if (alreadyRegisteredWithCpf) {
        return res.status(400).send({
          code: "DUPLICATED_DATA",
          message: "CPF já cadastrado",
          key: "cpf",
        });
      }
    }

    if (cnpj) {
      const alreadyRegisteredWithCnpj = DATA.find((data) => data.cnpj === cnpj);
      if (alreadyRegisteredWithCnpj) {
        return res.status(400).send({
          code: "DUPLICATED_DATA",
          message: "CNPJ já cadastrado",
          key: "cnpj",
        });
      }
    }

    DATA.push(req.body);

    return res.status(201).send({
      message: "Cadastro realizado com sucesso",
      data: value,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({
        code: "INVALID_DATA",
        message: "Dados inválidos",
        errors: error.errors,
      });
    }

    return res.status(500).send({
      code: "INTERNAL_SERVER_ERROR",
      message: "Erro interno no servidor",
    });
  }
});

app.get("/data", (req, res) => {
  res.send(DATA);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
