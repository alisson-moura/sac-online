# SAC Online - SaaS Multi-Tenant

SAC Online é um sistema SaaS multi-tenant de atendimento ao cliente que permite a criação e gestão de organizações, membros, formulários de pesquisa de satisfação e ocorrências. Este documento fornece uma visão detalhada das funcionalidades do sistema, os requisitos para cada uma e as permissões de cada papel.

## Funcionalidades

### Autenticação
- [x] Criar uma conta com e-mail e senha
   - [x] Adicionar automaticamente um cliente como membro de uma organização ao se cadastrar, se o domínio de seu e-mail corresponder ao domínio da organização e se a organização tiver configurado a opção de adicionar membros por domínio.
- [x] Realizar login com senha
- [x] Recuperar senha

### Convites de Membros
- [ ] Convidar membros para a organização via e-mail, especificando a função (role)
- [ ] Cancelar um convite

### Organizações
- [x] Criar uma organização
- [x] Ver detalhes da organização
- [x] Atualizar detalhes da organização
- [x] Ativar/desativar a organização
- [x] Transferir organização

### Gestão de Membros
- [ ] Alterar a função (role) de um membro (somente gestor)
- [ ] Ativar/desativar um membro (somente gestor)
- [ ] Listar membros da organização
- [ ] Atualizar informações de um membro (gestor pode atualizar qualquer membro, membros podem atualizar apenas suas próprias informações)

### Formulários de Pesquisa de Satisfação (CRUD)
- [x] Criar formulários de pesquisa de satisfação
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
| Criar conta                           | ✅    | ✅     | ✅         | ✅      |
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