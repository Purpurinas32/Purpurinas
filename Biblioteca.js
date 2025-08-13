const prompt = require("prompt-sync")();
let clientes = [];
let livros = [];

let senhaCorreta = "LivrosTopzera";
let tentativas = 0;
let acessoPermitido = false;

while (tentativas < 3) {
  let senhaDigitada = prompt("Digite a senha para acessar: ");

  if (senhaDigitada === senhaCorreta) {
    console.log("Senha correta! Aproveite nosso catálogo.");
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

function CadastrarCliente() {
  let nomeCliente = prompt("Digite o nome do cliente: ");
  if (nomeCliente && nomeCliente.trim() !== "") {
    clientes.push({ nome: nomeCliente.trim(), livroAlugado: null });
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

function CadastrarLivro() {
  let nomeLivro = prompt("Digite o nome do livro: ");
  if (nomeLivro && nomeLivro.trim() !== "") {
    livros.push(nomeLivro.trim());
    console.log("Livro cadastrado com sucesso!\n");
  } else {
    console.log("Nome inválido. Tente novamente.\n");
  }
}

function ExcluirLivro() {
  let nomeExcluir = prompt("Digite o nome do livro para excluir: ");
  let index = livros.indexOf(nomeExcluir);
  if (index !== -1) {
    livros.splice(index, 1);
    for (let i = 0; i < clientes.length; i++) {
      if (clientes[i].livroAlugado === nomeExcluir) {
        clientes[i].livroAlugado = null;
      }
    }
    console.log("Livro excluído com sucesso.\n");
  } else {
    console.log("Livro não encontrado.\n");
  }
}

function VisualizarInformacoes() {
  console.log("\n=== Clientes cadastrados ===");
  if (clientes.length > 0) {
    for (let i = 0; i < clientes.length; i++) {
      let livro = clientes[i].livroAlugado
        ? clientes[i].livroAlugado
        : "Nenhum livro alugado";
      console.log(`- ${clientes[i].nome} (Livro: ${livro})`);
    }
  } else {
    console.log("Nenhum cliente cadastrado.");
  }

  console.log("\n=== Livros cadastrados ===");
  if (livros.length > 0) {
    for (let i = 0; i < livros.length; i++) {
      console.log(`- ${livros[i]}`);
    }
  } else {
    console.log("Nenhum livro cadastrado.");
  }
}

do {
  opcao = prompt(
    "\n===== MENU =====\n" +
      "1 - Cadastrar cliente\n" +
      "2 - Excluir cliente\n" +
      "3 - Cadastrar livro\n" +
      "4 - Excluir livro\n" +
      "5 - Visualizar informações\n" +
      "6 - Alugar livro para cliente\n" +
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
      CadastrarLivro();
      break;

    case "4":
      ExcluirLivro();
      break;

    case "5":
      VisualizarInformacoes();
      break;

    case "6":
      if (clientes.length === 0 || livros.length === 0) {
        console.log(
          "É necessário ter clientes e livros cadastrados para realizar o aluguel.\n"
        );
        break;
      }

      let nomeCliente = prompt("Digite o nome do cliente: ");
      let cliente = clientes.find((c) => c.nome === nomeCliente);

      if (!cliente) {
        console.log("Cliente não encontrado.\n");
        break;
      }

      console.log("\nLivros disponíveis:");
      for (let i = 0; i < livros.length; i++) {
        console.log(`${i + 1} - ${livros[i]}`);
      }

      let indice = parseInt(prompt("Digite o número do livro: "));
      if (indice > 0 && indice <= livros.length) {
        cliente.livroAlugado = livros[indice - 1];
        console.log("Livro alugado com sucesso!\n");
      } else {
        console.log("Opção de livro inválida.\n");
      }
      break;

    case "7":
      console.log("Saindo do sistema...");
      break;

    default:
      console.log("Opção inválida. Tente novamente.\n");
  }
} while (opcao !== "7");
