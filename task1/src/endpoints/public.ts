import { server } from "..";
import { createNewOperationHistoryTable, getAllOperations, getOperationsByFilter } from "../services/operationHistory,";
import { createNewProduct, createProductsNewTable, editQuantity, editQuantityInCart, editQuantityInShop, getAllProducts, getProductsByFilter, getQuantity } from "../services/shop";
import { validateProduct, validateQuantityChanging } from "../validation";

//Добавить новый продукт
server.post('/shop/createNewProduct', async (req, res) => {
    if(!validateProduct(req.body)){
        res.send(`Data is not valid!`);
        return res;
    }
    res.send(await createNewProduct(req.body)) ;
    return res;
})

//Получить все товары
server.get('/shop/getAllProducts', async (req, res) => {
    res.send(await getAllProducts());
    return res;
})
//Изменить остаток товаров в магазине
server.post('/shop/editQuantityInShop', async (req, res) => {
    if(!validateQuantityChanging(req.body)){
        res.send(`Data is not valid!`);
        return res;
    }
    res.send(await editQuantityInShop(req.body));
    return res;
})

//Изменить остаток товаров в корзине
server.post('/shop/editQuantityInCart', async (req, res) => {
    if(!validateQuantityChanging(req.body)){
        res.send(`Data is not valid!`);
        return res;
    }
    res.send(await editQuantityInCart(req.body));
    return res;
})

//Изменить остаток
server.post('/shop/editQuantity', async (req, res) => {
    if(!validateQuantityChanging(req.body)){
        res.send(`Data is not valid!`);
        return res;
    }
    res.send(await editQuantity(req.body));
    return res;
})

//Получение остатка по фильтрам
server.get('/shop/getQuantityByFilter', async (req, res) => {
    if(!validateProduct(req.body)){
        res.send(`Data is not valid!`);
        return res;
    }
    res.send(await getQuantity(req.body));
    return res;
})

//Получить продукт по фильтру
server.get('/shop/getProductsByFilter', async (req, res) => {
    if(!validateProduct(req.body)){
        res.send(`Data is not valid!`);
        return res;
    }
    res.send(await getProductsByFilter(req.body));
    return res;
})

//Создать таблицу с продуктами
server.post('/shop/createProductsNewTable', async (req, res) => {
    res.send(await createProductsNewTable());
    return res;
})


//Сервис логирования операций(Не требует валидации, так все действия происходят с уже валидными данными)


//Получение всех операций
server.get('/history/getAllOperations', async (req, res) => {
    res.send(await getAllOperations());
    return res;
})

//Получение операций по фильтрам
server.get('/history/getOperationsByFilter', async (req, res) => {
    res.send(await getOperationsByFilter(req.body));
    return res;
})

//Создание новой таблицы логирования операций
server.post("/history/createNewOperationHistoryTable", async (req, res) => {
    res.send(await createNewOperationHistoryTable());
    return res;
})