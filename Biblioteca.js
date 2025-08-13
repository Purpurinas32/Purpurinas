const prompt = require("prompt-sync")();
let clientes = [];
let livros = [];

let senhaCorreta = "LivrosTopzera";
let tentativas = 0;
let acessoPermitido = false;

// Autenticação
while (tentativas < 3) {
  let senhaDigitada = prompt("Digite a senha para acessar: ");
  if (senhaDigitada === senhaCorreta) {
    console.log("Senha correta! Aproveite nosso catálogo.");
    acessoPermitido = true;
    break;
  } else {
    tentativas++;
    console.log(`Senha incorreta. Tentativas restantes: ${3 - tentativas}`);
  }
}

if (!acessoPermitido) {
  console.log("Acesso NÃO autorizado.");
  process.exit();
}

// Funções
function CadastrarCliente() {
  let nomeCliente = prompt("Digite o nome do cliente: ").trim();
  if (!nomeCliente) {
    console.log("Nome inválido.\n");
    return;
  }
  if (
    clientes.some((c) => c.nome.toLowerCase() === nomeCliente.toLowerCase())
  ) {
    console.log("Cliente já cadastrado.\n");
    return;
  }
  clientes.push({ nome: nomeCliente, livroAlugado: null });
  console.log("Cliente cadastrado com sucesso!\n");
}

function ExcluirCliente() {
  let nomeExcluir = prompt("Digite o nome do cliente para excluir: ")
    .trim()
    .toLowerCase();
  let index = clientes.findIndex((c) => c.nome.toLowerCase() === nomeExcluir);
  if (index !== -1) {
    clientes.splice(index, 1);
    console.log("Cliente excluído com sucesso.\n");
  } else {
    console.log("Cliente não encontrado.\n");
  }
}

function CadastrarLivro() {
  let nomeLivro = prompt("Digite o nome do livro: ").trim();
  if (!nomeLivro) {
    console.log("Nome inválido.\n");
    return;
  }
  if (livros.some((l) => l.toLowerCase() === nomeLivro.toLowerCase())) {
    console.log("Livro já cadastrado.\n");
    return;
  }
  livros.push(nomeLivro);
  console.log("Livro cadastrado com sucesso!\n");
}

function ExcluirLivro() {
  let nomeExcluir = prompt("Digite o nome do livro para excluir: ")
    .trim()
    .toLowerCase();
  let index = livros.findIndex((l) => l.toLowerCase() === nomeExcluir);
  if (index !== -1) {
    let livroRemovido = livros[index];
    livros.splice(index, 1);
    clientes.forEach((c) => {
      if (
        c.livroAlugado &&
        c.livroAlugado.toLowerCase() === livroRemovido.toLowerCase()
      ) {
        c.livroAlugado = null;
      }
    });
    console.log("Livro excluído com sucesso.\n");
  } else {
    console.log("Livro não encontrado.\n");
  }
}

function VisualizarInformacoes() {
  console.log("\n=== Clientes cadastrados ===");
  if (clientes.length > 0) {
    clientes.forEach((c) => {
      let livro = c.livroAlugado || "Nenhum livro alugado";
      console.log(`- ${c.nome} (Livro: ${livro})`);
    });
  } else {
    console.log("Nenhum cliente cadastrado.");
  }

  console.log("\n=== Livros cadastrados ===");
  if (livros.length > 0) {
    livros.forEach((l) => console.log(`- ${l}`));
  } else {
    console.log("Nenhum livro cadastrado.");
  }
}

function DevolverLivro() {
  let nomeCliente = prompt("Digite o nome do cliente: ").trim().toLowerCase();
  let cliente = clientes.find((c) => c.nome.toLowerCase() === nomeCliente);

  if (!cliente) {
    console.log("Cliente não encontrado.\n");
    return;
  }
  if (!cliente.livroAlugado) {
    console.log("O cliente não possui livro alugado.\n");
    return;
  }
  cliente.livroAlugado = null;
  console.log("Livro devolvido com sucesso!\n");
}

// Menu
let opcao;
do {
  opcao = prompt(
    "\n===== MENU =====\n" +
      "1 - Cadastrar cliente\n" +
      "2 - Excluir cliente\n" +
      "3 - Cadastrar livro\n" +
      "4 - Excluir livro\n" +
      "5 - Visualizar informações\n" +
      "6 - Alugar livro para cliente\n" +
      "7 - Devolver livro\n" +
      "8 - Sair\n" +
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

      let nomeCliente = prompt("Digite o nome do cliente: ")
        .trim()
        .toLowerCase();
      let cliente = clientes.find((c) => c.nome.toLowerCase() === nomeCliente);

      if (!cliente) {
        console.log("Cliente não encontrado.\n");
        break;
      }
      if (cliente.livroAlugado) {
        console.log("Este cliente já possui um livro alugado.\n");
        break;
      }

      console.log("\nLivros disponíveis:");
      let livrosDisponiveis = livros.filter(
        (l) =>
          !clientes.some(
            (c) =>
              c.livroAlugado && c.livroAlugado.toLowerCase() === l.toLowerCase()
          )
      );

      if (livrosDisponiveis.length === 0) {
        console.log("Nenhum livro disponível para aluguel.\n");
        break;
      }

      livrosDisponiveis.forEach((l, i) => {
        console.log(`${i + 1} - ${l}`);
      });

      let indice = parseInt(prompt("Digite o número do livro: "));
      if (indice > 0 && indice <= livrosDisponiveis.length) {
        cliente.livroAlugado = livrosDisponiveis[indice - 1];
        console.log("Livro alugado com sucesso!\n");
      } else {
        console.log("Opção de livro inválida.\n");
      }
      break;

    case "7":
      DevolverLivro();
      break;

    case "8":
      console.log("Saindo do sistema...");
      break;

    default:
      console.log("Opção inválida. Tente novamente.\n");
  }
} while (opcao !== "8");
