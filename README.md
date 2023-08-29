- POST /owner - create owner

## TODO

### Owner

- [x] criar owner
- [ ] buscar catalogo pelo owner id

### Product

- [x] criar produto
- [x] atualizar produto
- [x] excluir produto
- [x] associar produto a categoria(uma categoria por produto)

### Category

- [x] criar categoria
- [x] atualizar categoria
- [x] excluir categoria

## Database

### Owner

| Column Name | Type   |
| ----------- | ------ |
| id          | string |
| name        | string |

### Product

| Column Name | Type   |
| ----------- | ------ |
| id          | string |
| title       | string |
| category    | string |
| price       | number |
| description | string |
| owner       | string |

### Category

| Column Name | Type   |
| ----------- | ------ |
| id          | string |
| title       | string |
| description | string |
| owner       | string |

### Catalog

| Column Name | Type       |
| ----------- | ---------- |
| id          | string     |
| owner       | string     |
| categories  | [Category] |

### ADICIONAIS

- [ ] Criar testes unitários
- [ ] Criar documentação com Swagger
- [ ] Tratamento de erros
