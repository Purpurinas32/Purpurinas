const prompt = require("prompt-sync")();
let clientes = [];
let carros = [];

let senhaCorreta = "CarrosTopzera";
let tentativas = 0;
let acessoPermitido = false;

while (tentativas < 3) {
  let senhaDigitada = prompt("Digite a senha para acessar: ");

  if (senhaDigitada === senhaCorreta) {
    console.log("Senha correta! Dirijigão.");
    acessoPermitido = true;
    break;
  } else {
    tentativas++;
    console.log("Senha incorreta. Tentativas restantes: " + (3 - tentativas));
  }
}

if (!acessoPermitido) {
  console.log("Acesso NÃO autorizado. Você é comédia.");
  process.exit();
}

let opcao;

function CadastrarCliente() {
  let nomeCliente = prompt("Digite o nome do cliente: ");
  if (nomeCliente && nomeCliente.trim() !== "") {
    clientes.push({ nome: nomeCliente.trim(), CarroAlugado: null });
    console.log("Cliente cadastrado com sucesso!\n");
  } else {
    console.log("Nome inválido. Tente novamente.\n");
  }
}

function ExcluirCliente() {
  let nomeExcluir = prompt("Digite o nome do cliente para excluir: ");
  let index = clientes.findIndex((c) => c.nome === nomeExcluir);
  if (index !== -1) {
    clientes.splice(index, 1);
    console.log("Cliente excluído com sucesso.\n");
  } else {
    console.log("Cliente não encontrado.\n");
  }
}

function CadastrarCarro() {
  let nomeCarro = prompt("Digite o nome do carro: ");
  if (nomeCarro && nomeCarro.trim() !== "") {
    carros.push(nomeCarro.trim());
    console.log("Carro cadastrado com sucesso!\n");
  } else {
    console.log("Modelo inválido. Tente novamente.\n");
  }
}

function ExcluirCarro() {
  let nomeExcluir = prompt("Digite o nome do carro para excluir: ");
  let index = carros.indexOf(nomeExcluir);
  if (index !== -1) {
    carros.splice(index, 1);
    for (let i = 0; i < clientes.length; i++) {
      if (clientes[i].CarroAlugado === nomeExcluir) {
        clientes[i].CarroAlugado = null;
      }
    }
    console.log("Carro excluído com sucesso.\n");
  } else {
    console.log("Carro não encontrado.\n");
  }
}

function VisualizarInformacoes() {
  console.log("\n=== Clientes cadastrados ===");
  if (clientes.length > 0) {
    for (let i = 0; i < clientes.length; i++) {
      let carro = clientes[i].CarroAlugado
        ? clientes[i].CarroAlugado
        : "Nenhum carro alugado";
      console.log(`- ${clientes[i].nome} (Carro: ${carro})`);
    }
  } else {
    console.log("Nenhum cliente cadastrado.");
  }

  console.log("\n=== Carros cadastrados ===");
  if (carros.length > 0) {
    for (let i = 0; i < carros.length; i++) {
      console.log(`- ${carros[i]}`);
    }
  } else {
    console.log("Nenhum carro cadastrado.");
  }
}

do {
  opcao = prompt(
    "\n===== MENU =====\n" +
      "1 - Cadastrar cliente\n" +
      "2 - Excluir cliente\n" +
      "3 - Cadastrar carro\n" +
      "4 - Excluir carro\n" +
      "5 - Visualizar informações\n" +
      "6 - Alugar carro para cliente\n" +
      "7 - Sair\n" +
      "Escolha uma opção: "
  );

  switch (opcao) {
    case "1":
      CadastrarCliente();
      break;

    case "2":
      ExcluirCliente();
      break;

    case "3":
      CadastrarCarro();
      break;

    case "4":
      ExcluirCarro();
      break;

    case "5":
      VisualizarInformacoes();
      break;

    case "6":
      if (clientes.length === 0 || carros.length === 0) {
        console.log(
          "É necessário ter clientes e carros cadastrados para realizar o aluguel.\n"
        );
        break;
      }

      let nomeCliente = prompt("Digite o nome do cliente: ");
      let cliente = clientes.find((c) => c.nome === nomeCliente);

      if (!cliente) {
        console.log("Cliente não encontrado.\n");
        break;
      }

      console.log("\nCarros disponíveis:");
      for (let i = 0; i < carros.length; i++) {
        console.log(`${i + 1} - ${carros[i]}`);
      }

      let indice = parseInt(prompt("Digite o número do carro: "));
      if (indice > 0 && indice <= carros.length) {
        cliente.CarroAlugado = carros[indice - 1];
        console.log("Carro alugado com sucesso!\n");
      } else {
        console.log("Opção de carro inválida.\n");
      }
      break;

    case "7":
      console.log("Saindo do sistema...");
      break;

    default:
      console.log("Opção inválida. Tente novamente.\n");
  }
} while (opcao !== "7");
