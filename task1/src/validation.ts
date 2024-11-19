import { z } from "zod"

const productSchema = z.object({
    plu: z.number().optional(),
    product_name: z.string().optional(),
    quantity_of_products_in_shop: z.number().optional(),
    quantity_of_products_in_cart: z.number().optional(),
    shop_id: z.number().optional()
})

const editQuantityValuesSchema = z.object({
    plu: z.number(),
    changeValue: z.number().optional(),
    changeShopValue: z.number().optional(),
    changeCartValue: z.number().optional(),
    delete: z.union([
        z.tuple([z.boolean()]), // Один элемент
        z.tuple([z.boolean(), z.boolean().optional()]), // Два элемента
    ]),
});

export const validateProduct = (product: unknown) => {
    try {
        productSchema.parse(product);
        return true;
    } catch (e) {
        return false;
    }

}

export const validateQuantityChanging = (editQuantityValues: unknown) => {
    try {
        console.log(editQuantityValuesSchema.parse(editQuantityValues));
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }

}