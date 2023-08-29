## START APPLICATION

```
# Create .env based on .env-example
```

```
# Install
- npm install
- yarn
```

```
# Start
- npm run dev
- yarn dev
```

```
# Test
- npm run test
- yarn test
```

### Optional

```
# Up Mongodb and Mongo-Express UI with docker-compose
- docker compose up -d
```

## ENDPOINTS

### Owner

```
# Create owner
- POST /owner
- Body: { "name": "patrick" }
```

### Category

```
# Create category
- POST /category
- Body: {
    "title": "bolo",
    "description": "sabores de bolo",
    "owner": "64ed179f106fcfd31d46399a"
}
```

```
# Update category
- PATCH /category/:categoryId
- Body: {
    "title": "bolo de leite",
    "description": "sabores de bolo"
}
```

```
# Remove category
- DELETE /category/:categoryId
```

### Product

```
# Create product
- POST /product
- Body: {
    "title": "bolo de abacaxi",
    "description": "bolo de abacaxi com chantilly",
    "price": 85.50,
    "category": "64ed17af106fcfd31d46399d",
    "owner": "64ed179f106fcfd31d46399a"
}
```

```
# Assign product in category
- POST /product/productId/category/categoryId
```

```
# Update product
- PATCH /product/:productId
- Body: {
    "title": "bolo de abacaxi",
    "description": "bolo de abacaxi com chantilly",
    "price": 85.50,
    "category": "64ed17af106fcfd31d46399d",
    "owner": "64ed179f106fcfd31d46399a"
}
```

```
# Remove product
- DELETE /product/:productId
```

## TODO

### Owner

- [x] criar owner
- [x] buscar catalogo pelo owner id

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

- [x] Criar testes unitários
- [ ] Criar documentação com Swagger
- [x] Tratamento de erros
