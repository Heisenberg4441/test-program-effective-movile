export type product = {
    plu: number,
    product_name: string,
    quantity_of_products_in_shop: number,
    quantity_of_products_in_cart: number,
    shop_id: number,
}

export type editQuantityValues = {
    plu: number,
    changeValue?: number,
    changeShopValue?: number,
    changeCartValue?: number,
    delete: [
        boolean,
        boolean
    ]
}