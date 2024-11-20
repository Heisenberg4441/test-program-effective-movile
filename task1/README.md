# Задание 1.
## Инструкция по запуску:
- npm install
- npm start
### Для общения с сервером используется Postman

# Проверка работоспособности
## Перед началом работы у вас должен быть сервер PostgreSQL и созданная база данных,  все параметры для подключения к нему находятся в /src/config.ts

После проверки всех данных создайте новые таблицы.
Для этого отправьте:
- POST запрос на адрес http://localhost:3000/shop/createNewProductTable
- POST запрос на адрес http://localhost:3000/history/createNewOperationHistoryTable


# Сервис 1
## Создание/изменение/получение продуктов из PostgreSQL:
Для того, чтобы создать/изменить/получить какой либо продукт из таблицы надо:
#### Создать продукт
- POST запрос на адрес http://localhost:3000/shop/createNewProduct с телом:
```
{
    "plu": number,
    "product_name": string,
    "quantity_of_products_in_shop": number,
    "quantity_of_products_in_cart": number,
    "shop_id": number
}
```
#### Изменить остаток
##### Изменение остатка в магазине
- POST запрос на адрес http://localhost:3000/shop/editQuantityInShop с телом: 
```
{
    "plu": number,
    "changeValue": number,
    "delete": [
        boolean
    ]
}
```
##### Изменение остатка в магазине
- POST запрос на адрес http://localhost:3000/shop/editQuantityInCart с телом: 
```
{
    "plu": number,
    "changeValue": number,
    "delete": [
        boolean
    ]
}
```

##### Изменить общий остаток(И в магазине, и в корзине)
- POST запрос на адрес http://localhost:3000/shop/editQuantity с телом: 
```
{
    "plu": number,
    "changeCartValue": number,
    "changeShopValue": number,
    "delete": [
        boolean, boolean
    ]
}
```

#### Получить остаток по фильтру(Должен быть хотя бы один параметр)
- GET запрос на адрес http://localhost:3000/shop/getQuantityByFilter с телом:
```
{
    "plu"?: number,
    "quantity_of_products_in_shop"?: number,
    "quantity_of_products_in_cart"?: number,
    "shop_id"?: number
}
```

#### Получить продукты по фильтру(Должен быть хотя бы один параметр)
- GET запрос на адрес http://localhost:3000/shop/getProductsByFilter с телом: 
```
{
    "plu"?: number,
    "product_name"?: string
}
```

# Сервис 2

#### Получение всех операций
- GET запрос на адрес http://localhost:3000/history/getAllOperations

#### Получение операций по фильтру(Должен присутствовать хотя бы один параметр)
- GET запрос на адрес http://localhost:3000/history/getOperationsByFilter с телом:
```
{
    "shop_id?": number,
    "plu"?: number,
    "date"?: string,
    "action"?: string
}
```