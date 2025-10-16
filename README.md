## 🚀 Como executar
1. Clone o repositório
2. `npm install`
3. `npx playwright install`
4. `npx playwright test`

## 📋 Cenários de teste
- ✅ Login com credenciais válidas
- ✅ Validação de detalhes do produto (nome, preço, descrição)
- ✅ Adição ao carrinho
- ✅ Fluxo completo de checkout
- ✅ Validação de resumo do pedido

## 🧪 Execução
- Todos os testes: `npx playwright test`
- Com UI: `npx playwright test --ui`
- Relatório: `npx playwright show-report`

## 💡 Suposições
- Como o site não tem funcionalidade de "pesquisa", foi validada a navegação e listagem de produtos
- Utilizados os atributos `data-test` quando disponíveis para maior estabilidade