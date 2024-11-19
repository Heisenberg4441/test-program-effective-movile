import * as postgres from 'postgres'

export const config = {
    DB_USERNAME: 'postgres',
    DB_PASSWORD: '2808',
    DB_IP: 'localhost',
    DB_PORT: '5432',
    DB_NAME: 'server'
}

export const sql = postgres(`postgres://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_IP}:${config.DB_PORT}/${config.DB_NAME}`);

