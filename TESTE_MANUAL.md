# Teste Manual

Use este checklist depois de rodar `npm install` e `npm run dev`.

## Simulação pública

- [ ] Abrir `/`.
- [ ] Clicar em `Testar demonstração`.
- [ ] Preencher o simulador.
- [ ] Confirmar que a tela de resultado aparece sem erro.

## Empresa cria novo bico

- [ ] Abrir `/empresa`.
- [ ] Clicar em `Novo bico`.
- [ ] Preencher os dados do bico.
- [ ] Publicar o bico.
- [ ] Confirmar que o novo bico aparece no painel da empresa.

## Prestador filtra e aceita bico

- [ ] Abrir `/prestador`.
- [ ] Abrir `/prestador/bicos`.
- [ ] Selecionar uma ou mais categorias por checkbox.
- [ ] Selecionar uma data no calendário.
- [ ] Ajustar a faixa de valor/hora pelo slider.
- [ ] Alterar a ordenação entre `Mais recentes`, `Mais próximos`, `Maior valor/hora` e `Data mais próxima`.
- [ ] Confirmar que a lista muda imediatamente após cada ajuste.
- [ ] Limpar filtros e confirmar que a lista volta ao estado padrão.
- [ ] Abrir detalhes de um bico disponível.
- [ ] Confirmar aceite no modal.
- [ ] Validar redirecionamento para check-in/check-out.

## Check-in, andamento e check-out

- [ ] Em `/prestador/bico/:id/checkin`, confirmar que o stepper aparece.
- [ ] Fazer check-in demo.
- [ ] Confirmar status `Em execução`.
- [ ] Fazer check-out demo.
- [ ] Confirmar status `Aguardando confirmação da empresa`.

## Empresa confirma pagamento demo

- [ ] Abrir `/empresa/bico/:id/acompanhar`.
- [ ] Confirmar conclusão do serviço.
- [ ] Ir para pagamento.
- [ ] Registrar pagamento simulado.
- [ ] Confirmar que o bico fica como `Pago demo`.

## Prestador vê carteira

- [ ] Abrir `/prestador/historico`.
- [ ] Validar saldo disponível.
- [ ] Validar lista de próximos recebíveis.
- [ ] Validar histórico de pagamentos.
- [ ] Clicar em `Sacar agora`.
- [ ] Confirmar que o saque simulado reduz o saldo disponível.

## Responsividade

- [ ] Testar em largura mobile.
- [ ] Confirmar bottom-nav do prestador: `Painel`, `Bicos`, `Histórico`, `Perfil`.
- [ ] Confirmar bottom-nav da empresa com atalhos da empresa.
- [ ] Confirmar bottom-nav admin enxuto.
- [ ] Validar que conteúdo não fica escondido atrás da barra inferior.

## Tema e acessibilidade

- [ ] Alternar tema claro/escuro no cabeçalho mobile.
- [ ] Alternar tema claro/escuro na sidebar desktop.
- [ ] Confirmar que cards, botões, filtros e bottom-nav mantêm contraste legível.
- [ ] Navegar pelos filtros usando teclado.
- [ ] Confirmar que o botão de tema tem nome acessível em leitor de tela.

## Migração GPT

- [ ] Em uma sessão limpa, criar manualmente chaves antigas `acceptedJobs` e `jobStatuses` no `localStorage`.
- [ ] Recarregar o app.
- [ ] Confirmar que os bicos migrados aparecem com prefixo `gpt-` no fluxo do prestador.
- [ ] Recarregar novamente e confirmar que os mesmos bicos não são duplicados.
