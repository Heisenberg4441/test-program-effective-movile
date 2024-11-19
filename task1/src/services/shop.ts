import * as postgres from 'postgres'
import { editQuantityValues, product } from '../types'
import { sql } from '../config'
import { addOperation } from './operationHistory,'
import { getProductData } from '../utils'

//Создание нового товара
export const createNewProduct = async (values: product) => {

    const body = {
        shop_id: values.shop_id,
        plu: values.plu,
        action: `Добавлен новый продукт: plu товара: ${values.plu}, название товара: ${values.product_name}`
    }
    await addOperation(body)

    return await sql`
    INSERT INTO products (
        plu,
	    product_name,
	    quantity_of_products_in_shop,
	    quantity_of_products_in_cart,
	    shop_id
    )  VALUES (
        ${values.plu},
        ${values.product_name},
        ${values.quantity_of_products_in_shop},
        ${values.quantity_of_products_in_cart},
        ${values.shop_id});`
}

//Получение всех товаров
export const getAllProducts = async () => {
    return await sql`
    SELECT * FROM products`
}

//Изменение остатка товара в магазине
export const editQuantityInShop = async (values: editQuantityValues) => {
    try {
        const body_values = await getProductData(values.plu);
        const product_name = body_values.product_name;
        const shop_id = body_values.shop_id;
        const body = {
            shop_id: shop_id,
            plu: values.plu,
            action: `Изменен остаток товара в магазине; название товара: ${product_name}; plu товара: ${values.plu}; ${values.delete[0] === true ? `удалено` : `прибавлено`} ${values.changeValue}`
        }
        await addOperation(body);

        const response = await sql`
            UPDATE products
            SET quantity_of_products_in_shop = quantity_of_products_in_shop
            ${values.delete[0] === true ? sql`-` : sql`+`} ${values.changeValue}
            WHERE plu=${values.plu}`
        return `Quantity edited!\n${response}`;
    } catch (e) {
        return `Product not found!\n${e}`;
    }

}

//Изменение остатка товара в корзине
export const editQuantityInCart = async (values: editQuantityValues) => {
    try {
        const body_values = await getProductData(values.plu);
        const product_name = body_values.product_name;
        const shop_id = body_values.shop_id;
        const body = {
            shop_id: shop_id,
            plu: values.plu,
            action: `Изменен остаток товара в корзине; название товара: ${product_name}; plu товара: ${values.plu}; ${values.delete[0] === true ? `удалено` : `прибавлено`} ${values.changeValue}`
        }
        await addOperation(body);
        const response = await sql`
            UPDATE products
            SET quantity_of_products_in_cart = quantity_of_products_in_cart 
            ${values.delete[0] === true ? sql`-` : sql`+`} ${values.changeValue}
            WHERE plu=${values.plu}`
        return `Quantity edited!\n${response}`
    } catch (e) {
        return `Product not found!\n${e}`;;
    }

}

//Изменение остатка
export const editQuantity = async (values: editQuantityValues) => {
    try {
        const body_values = await getProductData(values.plu)
        const product_name = body_values.product_name
        const shop_id = body_values.shop_id
        console.log(values.delete[0])
        const body = {
            shop_id: shop_id,
            plu: values.plu,
            action: `Изменен общий остаток товара; название товара: ${product_name}; plu товара: ${values.plu}; Магазин - ${values.delete[1] === true ? `удалено` : `прибавлено`} ${values.changeShopValue}; Корзина - ${values.delete[0] === true ? `удалено` : `прибавлено`} ${values.changeCartValue}`
        }
        console.log(body)
        await addOperation(body)
        const response = await sql`
            UPDATE products
            SET 
                quantity_of_products_in_cart = quantity_of_products_in_cart 
                ${values.delete[0] === true ? sql`-` : sql`+`} ${values.changeCartValue},
                quantity_of_products_in_shop = quantity_of_products_in_shop 
                ${values.delete[1] === true ? sql`-` : sql`+`} ${values.changeShopValue}
            WHERE plu=${values.plu}`
        return `Quantity edited!\n${response}`
    } catch (e) {
        return `Product not found!\n${e}`;
    }

}

//Получение остатка по фильтрам(plu, QoP_in_shop, QoP_in_cart, shop_id)
export const getQuantity = async (values: product) => {
    try {
        let response;
        if (values.plu !== undefined) {
            response = await sql`
                SELECT 
                    plu, 
                    product_name,
                    quantity_of_products_in_shop,
                    quantity_of_products_in_cart,
                    shop_id
                FROM products
                WHERE 
                    plu=${values.plu}`
        }
        if (values.quantity_of_products_in_shop !== undefined) {
            response = await sql`
                SELECT 
                    plu, 
                    product_name,
                    quantity_of_products_in_shop,
                    quantity_of_products_in_cart,
                    shop_id
                FROM products
                WHERE 
                    quantity_of_products_in_shop=${values.quantity_of_products_in_shop}`
        }
        if (values.quantity_of_products_in_cart !== undefined) {
            response = await sql`
                SELECT 
                    plu, 
                    product_name,
                    quantity_of_products_in_shop,
                    quantity_of_products_in_cart,
                    shop_id
                FROM products
                WHERE 
                    quantity_of_products_in_cart=${values.quantity_of_products_in_cart}`
        }
        if (values.shop_id !== undefined) {
            response = await sql`
                SELECT
                    plu, 
                    product_name,
                    quantity_of_products_in_shop,
                    quantity_of_products_in_cart,
                    shop_id
                FROM products
                WHERE 
                    shop_id=${values.shop_id}`
        }
        console.log(response[0])
        const body_data = response[0]
        let products = ``
        let plus = ``
        response.forEach((e) => {
            products = products + `${e.product_name}, `
            plus = plus + `${e.plu}, `
        });
        const body = {
            shop_id: body_data.shop_id,
            plu: body_data.plu,
            action: `Получение остатка по фильтру; получен продукт(ы): ${products}plu товара(ов): ${plus}`
        }
        console.log(body)
        addOperation(body)
        response = {
            quantity_of_products_in_shop: body_data.quantity_of_products_in_shop,
            quantity_of_products_in_cart: body_data.quantity_of_products_in_cart,
        }
        return response;
    } catch (e) {
        return `Product not found!\n${e}`
    }
}

//Получить продукт по фильтру(plu и product_name)
export const getProductsByFilter = async (values: product) => {
    try {
        let response
        if (values.plu !== undefined) {
            response = await sql`
        SELECT *
        FROM products
        WHERE 
            plu=${values.plu}`
        }
        if (values.product_name !== undefined) {
            response = await sql`
        SELECT *
        FROM products
        WHERE 
            product_name=${values.product_name}`
        }
        const body_data = response[0]
        const body = {
            shop_id: body_data.shop_id,
            plu: body_data.plu,
            action: `Получение товар по фильтру; получен продукт: ${body_data.product_name}, plu товара: ${body_data.plu}`
        }
        addOperation(body);
        return response;
    } catch (e) {
        return `Product not found!\n${e}`
    }
}

//Создание таблицы
export const createProductsNewTable = async () => {
    try {
        const response = await sql`
    CREATE TABLE products(
	    plu INTEGER,
	    product_name TEXT,
	    quantity_of_products_in_shop INTEGER,
	    quantity_of_products_in_cart INTEGER,
	    shop_id INTEGER
    );
    `
        return `Table created! ${response}`
    } catch (e) {
        return `${e}`
    }

}