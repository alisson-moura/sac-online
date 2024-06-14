# SAC Online - SaaS Multi-Tenant

SAC Online é um sistema SaaS multi-tenant de atendimento ao cliente que permite a criação e gestão de organizações, membros, formulários de pesquisa de satisfação e ocorrências. Este documento fornece uma visão detalhada das funcionalidades do sistema, os requisitos para cada uma e as permissões de cada papel.

## Funcionalidades

### Autenticação
- [ ] Criar uma conta com e-mail e senha
- [ ] Realizar login
- [ ] Recuperar senha

### Convites de Membros
- [ ] Convidar membros para a organização via e-mail, especificando a função (role)
- [ ] Cancelar um convite

### Organizações
- [ ] Criar uma organização ao criar uma conta (usuário será o gestor)
- [ ] Ver detalhes da organização
- [ ] Atualizar detalhes da organização
- [ ] Ativar/desativar a organização

### Gestão de Membros
- [ ] Alterar a função (role) de um membro (somente gestor)
- [ ] Ativar/desativar um membro (somente gestor)
- [ ] Listar membros da organização
- [ ] Atualizar informações de um membro (gestor pode atualizar qualquer membro, membros podem atualizar apenas suas próprias informações)

### Formulários de Pesquisa de Satisfação (CRUD)
- [ ] Criar formulários de pesquisa de satisfação
- [ ] Ler formulários de pesquisa de satisfação
- [ ] Atualizar formulários de pesquisa de satisfação
- [ ] Deletar formulários de pesquisa de satisfação

### Ocorrências
- [ ] Cliente pode abrir ocorrências
- [ ] Cliente pode responder e finalizar suas próprias ocorrências
- [ ] Assistente pode responder e finalizar ocorrências

## Roles

- **Admin**
- **Gestor**
- **Assistente**
- **Cliente**

## Tabela de Permissões

|                                       | Admin | Gestor | Assistente | Cliente |
| ------------------------------------- | ----- | ------ | ---------- | ------- |
| Criar conta                           | ✅    | ✅     | ✅         | ❌      |
| Realizar login                        | ✅    | ✅     | ✅         | ✅      |
| Recuperar senha                       | ✅    | ✅     | ✅         | ✅      |
| Convidar membros                      | ✅    | ✅     | ❌         | ❌      |
| Cancelar convite                      | ✅    | ✅     | ❌         | ❌      |
| Criar organização                     | ✅    | ✅     | ❌         | ❌      |
| Ver organização                       | ✅    | ✅     | ✅         | ❌      |
| Atualizar organização                 | ✅    | ✅     | ❌         | ❌      |
| Ativar/desativar organização          | ✅    | ✅     | ❌         | ❌      |
| Alterar função de membro              | ✅    | ✅     | ❌         | ❌      |
| Ativar/desativar membro               | ✅    | ✅     | ❌         | ❌      |
| Listar membros                        | ✅    | ✅     | ✅         | ❌      |
| Atualizar informações de membros      | ✅    | ✅     | ⚠️         | ⚠️      |
| Criar formulários                     | ✅    | ✅     | ❌         | ❌      |
| Ler formulários                       | ✅    | ✅     | ✅         | ❌      |
| Atualizar formulários                 | ✅    | ✅     | ❌         | ❌      |
| Deletar formulários                   | ✅    | ✅     | ❌         | ❌      |
| Abrir ocorrências                     | ❌    | ❌     | ❌         | ✅      |
| Responder ocorrências                 | ✅    | ✅     | ✅         | ✅      |
| Finalizar ocorrências                 | ✅    | ✅     | ✅         | ✅      |

> ✅ = permitido
> ❌ = não permitido
> ⚠️ = permitido com condições

### Condições

- Administradores e gestores podem atualizar informações de qualquer membro; assistentes e clientes podem atualizar apenas suas próprias informações.

## Requisitos Técnicos

- Node.js
- MongoDB (ou outro banco de dados de sua escolha)
- Cliente de e-mail para envio de convites

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/sac-online.git
