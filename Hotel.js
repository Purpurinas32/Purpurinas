const prompt = require("prompt-sync")();
let hospedes = [];
let quartos = [];

let senhaCorreta = "HotelTopzera";
let tentativas = 0;
let acessoPermitido = false;

while (tentativas < 3) {
  let senhaDigitada = prompt("Digite a senha para acessar: ");
  if (senhaDigitada === senhaCorreta) {
    console.log("Senha correta! Bem-vindo ao sistema do hotel.");
    acessoPermitido = true;
    break;
  } else {
    tentativas++;
    console.log("Senha incorreta. Tentativas restantes: " + (3 - tentativas));
  }
}

if (!acessoPermitido) {
  console.log("Acesso NÃO autorizado.");
  process.exit();
}

let opcao;

function CadastrarHospede() {
  let nomeHospede = prompt("Digite o nome do hóspede: ");
  if (nomeHospede && nomeHospede.trim() !== "") {
    hospedes.push({ nome: nomeHospede.trim(), quartoOcupado: null });
    console.log("Hóspede cadastrado com sucesso!\n");
  } else {
    console.log("Nome inválido. Tente novamente.\n");
  }
}

function ExcluirHospede() {
  let nomeExcluir = prompt("Digite o nome do hóspede para excluir: ");
  let index = hospedes.findIndex((h) => h.nome === nomeExcluir);
  if (index !== -1) {
    hospedes.splice(index, 1);
    console.log("Hóspede excluído com sucesso.\n");
  } else {
    console.log("Hóspede não encontrado.\n");
  }
}

function CadastrarQuarto() {
  let numeroQuarto = prompt("Digite o número do quarto: ");
  if (numeroQuarto && numeroQuarto.trim() !== "") {
    quartos.push(numeroQuarto.trim());
    console.log("Quarto cadastrado com sucesso!\n");
  } else {
    console.log("Número inválido. Tente novamente.\n");
  }
}

function ExcluirQuarto() {
  let numeroExcluir = prompt("Digite o número do quarto para excluir: ");
  let index = quartos.indexOf(numeroExcluir);
  if (index !== -1) {
    quartos.splice(index, 1);
    for (let i = 0; i < hospedes.length; i++) {
      if (hospedes[i].quartoOcupado === numeroExcluir) {
        hospedes[i].quartoOcupado = null;
      }
    }
    console.log("Quarto excluído com sucesso.\n");
  } else {
    console.log("Quarto não encontrado.\n");
  }
}

function VisualizarInformacoes() {
  console.log("\n=== Hóspedes cadastrados ===");
  if (hospedes.length > 0) {
    for (let i = 0; i < hospedes.length; i++) {
      let quarto = hospedes[i].quartoOcupado
        ? hospedes[i].quartoOcupado
        : "Nenhum quarto ocupado";
      console.log(`- ${hospedes[i].nome} (Quarto: ${quarto})`);
    }
  } else {
    console.log("Nenhum hóspede cadastrado.");
  }

  console.log("\n=== Quartos cadastrados ===");
  if (quartos.length > 0) {
    for (let i = 0; i < quartos.length; i++) {
      console.log(`- ${quartos[i]}`);
    }
  } else {
    console.log("Nenhum quarto cadastrado.");
  }
}

function HospedarCliente() {
  if (hospedes.length === 0 || quartos.length === 0) {
    console.log("Cadastre hóspedes e quartos antes de hospedar.\n");
    return;
  }

  let nomeHospede = prompt("Digite o nome do hóspede: ");
  let hospede = hospedes.find((h) => h.nome === nomeHospede);

  if (!hospede) {
    console.log("Hóspede não encontrado.\n");
    return;
  }

  console.log("\nQuartos disponíveis:");
  for (let i = 0; i < quartos.length; i++) {
    console.log(`${i + 1} - ${quartos[i]}`);
  }

  let indice = parseInt(prompt("Digite o número do quarto: "));
  if (indice > 0 && indice <= quartos.length) {
    hospede.quartoOcupado = quartos[indice - 1];
    console.log("Hóspede hospedado com sucesso!\n");
  } else {
    console.log("Opção de quarto inválida.\n");
  }
}


do {
  opcao = prompt(
    "\n===== MENU HOTEL =====\n" +
      "1 - Cadastrar hóspede\n" +
      "2 - Excluir hóspede\n" +
      "3 - Cadastrar quarto\n" +
      "4 - Excluir quarto\n" +
      "5 - Visualizar informações\n" +
      "6 - Hospedar hóspede em quarto\n" +
      "7 - Sair\n" +
      "Escolha uma opção: "
  );

  switch (opcao) {
    case "1":
      CadastrarHospede();
      break;
    case "2":
      ExcluirHospede();
      break;
    case "3":
      CadastrarQuarto();
      break;
    case "4":
      ExcluirQuarto();
      break;
    case "5":
      VisualizarInformacoes();
      break;
    case "6":
      HospedarCliente();
      break;
    case "7":
      console.log("Saindo do sistema...");
      break;
    default:
      console.log("Opção inválida. Tente novamente.\n");
  }
} while (opcao !== "7");
