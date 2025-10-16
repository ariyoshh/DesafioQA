## 🧩 Explicação da Arquitetura

### Page Object Model (POM)
O projeto segue rigorosamente o padrão POM, onde cada página da aplicação é representada por uma classe:

- **LoginPage**: Gerencia autenticação com métodos `goto()` e `login()`
- **ProductsPage**: Controla listagem de produtos com métodos para seleção e validação
- **ProductDetailPage**: Valida informações detalhadas (nome, preço, descrição)
- **CartPage**: Gerencia o carrinho de compras
- **CheckoutPage**: Processa finalização da compra

### Estrutura de Testes
Cada arquivo `.spec.js` representa um fluxo específico:
- `login.spec.js`: Valida autenticação bem-sucedida
- `products.spec.js`: Verifica listagem e detalhes de produtos
- `cart.spec.js`: Testa adição e gestão do carrinho
- `checkout.spec.js`: Valida fluxo completo de compra

### Decisões Técnicas
1. **Seletores descritivos**: Usamos seletores CSS estáveis e semânticos
2. **Validações robustas**: Combinamos expectativas do Playwright com verificações customizadas
3. **Dados de teste**: Credenciais e produtos são centralizados para facil manutenção
4. **Cross-browser**: Configurado para rodar em Chromium, Firefox e WebKit