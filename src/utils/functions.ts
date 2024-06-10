function cpfMask(cpf: string = "") {
  cpf = cpf.replace(/\D/g, "");

  cpf = cpf.substring(0, 11);

  cpf = cpf.replace(/^(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  cpf = cpf.replace(/\.(\d{3})(\d)/, ".$1-$2");
  return cpf;
}

function cnpjMask(cnpj: string = "") {
  if (!cnpj) return cnpj;

  cnpj = cnpj.replace(/\D/g, "");

  cnpj = cnpj.substring(0, 14);

  cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
  cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");

  return cnpj;
}

function maskPhone(phone: string = "") {
  if (!phone) return phone;
  phone = phone.replace(/\D/g, "");

  phone = phone.replace(/^0/, "");

  if (phone.length > 10) {
    phone = phone.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (phone.length > 5) {
    phone = phone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (phone.length > 2) {
    phone = phone.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else {
    phone = phone.replace(/^(\d*)/, "($1");
  }
  return phone;
}

export const masks: {
  [key: string]: (value?: string) => string;
} = {
  cpf: cpfMask,
  cnpj: cnpjMask,
  phone: maskPhone,
};
