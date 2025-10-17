
# Pokédex Mobile com React Native

![Demonstração da Pokédex](https://github.com/kyoulau/pokedex-app-native/blob/main/imagens/IMG_3529.png)
![Tela dito](https://github.com/kyoulau/pokedex-app-native/blob/main/imagens/IMG_3533.png)

## 📖 Sobre o Projeto

Este é um aplicativo de Pokédex móvel, desenvolvido com **React Native** e **Expo**, que consome dados da [PokéAPI](https://pokeapi.co/). O projeto foi criado para demonstrar habilidades em desenvolvimento mobile, incluindo navegação, gerenciamento de estado global, consumo de APIs e criação de interfaces de usuário dinâmicas.

O usuário pode explorar uma lista infinita de Pokémon, buscar por um específico, ver seus detalhes e criar uma lista pessoal de favoritos.

## ✨ Funcionalidades (Requisitos Funcionais)

  - **RF01 - Tela Principal (Pokédex):**

      - Exibe uma lista inicial de Pokémon em um layout de grade.
      - Cada card na grade mostra a imagem e o nome do Pokémon.
      - Implementa **scroll infinito**: ao chegar ao final da lista, mais Pokémon são carregados automaticamente.

  - **RF02 - Navegação para Detalhes:**

      - Ao tocar em um Pokémon, o usuário é levado para uma tela de detalhes.
      - A navegação entre telas é gerenciada pela biblioteca **React Navigation**.

  - **RF03 - Tela de Detalhes do Pokémon:**

      - Exibe informações detalhadas do Pokémon selecionado, como imagem em alta resolução, nome, número da Pokédex, tipos e habilidades.
      - Os dados são obtidos através de uma nova requisição à API, garantindo informações completas.

  - **RF04 - Gerenciamento de Estado (Favoritos) com Context API:**

      - Na tela de detalhes, um botão de estrela (★) permite ao usuário favoritar ou desfavoritar um Pokémon.
      - O estado dos favoritos é gerenciado globalmente com a **Context API** do React, garantindo que a lista seja consistente em todo o app.

  - **RF05 - Tela de Favoritos:**

      - Uma tela dedicada exibe todos os Pokémon que foram favoritados pelo usuário.
      - A lista é atualizada em tempo real conforme o usuário adiciona ou remove favoritos.

  - **RF06 - Funcionalidade de Busca:**

      - A tela principal possui um campo de busca para encontrar um Pokémon por nome ou número.
      - Ao realizar a busca, o usuário é levado diretamente para a tela de detalhes do Pokémon encontrado.
      - Inclui tratamento de erro para buscas inválidas (Pokémon não encontrado).

## 🛠️ Tecnologias Utilizadas

  - **[React Native](https://reactnative.dev/)**: Framework para desenvolvimento de aplicativos móveis multiplataforma.
  - **[Expo](https://expo.dev/)**: Plataforma e conjunto de ferramentas para facilitar o desenvolvimento e build de apps React Native.
  - **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática ao código, aumentando a robustez e a manutenibilidade.
  - **[React Navigation](https://reactnavigation.org/)**: Biblioteca para gerenciamento de navegação e rotas no aplicativo.
  - **[Context API](https://react.dev/reference/react/useContext)**: Ferramenta nativa do React para gerenciamento de estado global.
  - **[PokéAPI](https://pokeapi.co/)**: API RESTful gratuita utilizada como fonte de dados para todas as informações dos Pokémon.

## 🚀 Como Executar o Projeto

### Pré-requisitos

  - [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
  - [Git](https://git-scm.com/)
  - Gerenciador de pacotes [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
  - **Expo Go**: aplicativo para celular (Android/iOS) para visualizar o projeto em desenvolvimento.

### Passos para Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/pokedex-react-native.git
    cd pokedex-react-native
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npx expo start
    ```

4.  **Visualize no seu celular:**

      - Abra o aplicativo **Expo Go**.
      - Escaneie o QR Code que aparecerá no terminal.
      - O aplicativo será carregado e você poderá interagir com a Pokédex.

## 📁 Estrutura de Pastas

O projeto está organizado da seguinte forma para manter o código limpo e escalável:

```
pokedex-react-native/
├── src/
│   ├── components/       # Componentes reutilizáveis (ex: PokemonCard)
│   ├── contexts/         # Gerenciamento de estado global (ex: FavoritesContext)
│   ├── models/           # Definições de tipos e classes (ex: pokemon_model)
│   └── pages/            # Telas principais da aplicação
├── App.tsx               # Ponto de entrada e configuração do navegador
└── ...                   # Arquivos de configuração (package.json, babel.config.js, etc.)
```
