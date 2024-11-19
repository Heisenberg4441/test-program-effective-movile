import { sql } from "../config"
import { getProductData, time } from "../utils"

export const createNewOperationHistoryTable = async () => {
    const response = await sql`
    CREATE TABLE operation_history(
        shop_id INTEGER,
        plu INTEGER,
        date TEXT,
        action TEXT
    );
    `
    return response;
}

export const addOperation = async (body) => {
    const date = time();
    const response = await sql`
    INSERT INTO operation_history (
        shop_id,
        plu,
        date,
        action
    ) VALUES (
        ${body.shop_id},
        ${body.plu},
        ${date},
        ${body.action}
    )
    `
    return response;
}

export const getOperationsByFilter = async (values) => {
    let response;
    if (values.shop_id !== undefined) {
        response = await sql`
        SELECT *
        FROM operation_history
        WHERE 
            shop_id=${values.shop_id}`
    }
    if (values.plu !== undefined) {
        response = await sql`
        SELECT *
        FROM operation_history
        WHERE 
            plu=${values.plu}`
    }
    if (values.date !== undefined) {
        response = await sql`
        SELECT *
        FROM operation_history
        WHERE 
            date=${values.date}`
    }
    if (values.action !== undefined) {
        response = await sql`
        SELECT *
        FROM operation_history
        WHERE 
            action=${values.action}`
    }
    return response;
}

export const getAllOperations = async () => {
    const response = await sql`
    SELECT * FROM operation_history`
    return response;
}