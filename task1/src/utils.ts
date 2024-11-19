import { sql } from "./config"

export const time = () => {
    const date = new Date();
    const day = date.getDate();
    let month = JSON.stringify(date.getMonth()+1);
    const year = date.getFullYear();
    if(month.length === 1) {
        month = `0${month}`;
    }
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const time = `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
    return time;
}

export const getProductData = async (plu: number) => {
    const response = await sql`
    SELECT * FROM products WHERE plu=${plu}`
    return response[0];
}