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
  birthdate: z.string(),
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
    const { email, cpf, cnpj } = req.body;

    const alreadyRegisteredWithEmail = DATA.find(
      (data) => data.email === email
    );
    if (alreadyRegisteredWithEmail) {
      return res.status(400).send({
        message: "Email já cadastrado",
        key: "email",
      });
    }

    if (cpf) {
      const alreadyRegisteredWithCpf = DATA.find((data) => data.cpf === cpf);
      if (alreadyRegisteredWithCpf) {
        return res.status(400).send({
          message: "CPF já cadastrado",
          key: "cpf",
        });
      }
    }

    if (cnpj) {
      const alreadyRegisteredWithCnpj = DATA.find((data) => data.cnpj === cnpj);
      if (alreadyRegisteredWithCnpj) {
        return res.status(400).send({
          message: "CNPJ já cadastrado",
          key: "cnpj",
        });
      }
    }

    DATA.push(req.body);

    return res.status(201).send("Cadastro realizado com sucesso");
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Erro ao realizar cadastro",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
