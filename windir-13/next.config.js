/** @type {import('next').NextConfig} */

const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');

const nextConfig = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) 
        return {
            env : {
                mongodb_username: 'trettifjerde',
                mongodb_password: 'jesuslovesmongoDB34',
                mongodb_clustername: 'cluster1',
                NEXTAUTH_SECRET: 'meowmeowmeow34',
                NEXTAUTH_URL: 'http://localhost:3000/'

            }
        }
    else 
        return {
            env: {
                mongodb_username: 'trettifjerde',
                mongodb_password: 'jesuslovesmongoDB34',
                mongodb_clustername: 'cluster1',
                NEXTAUTH_SECRET: 'meowmeowmeowmeow34',
                NEXTAUTH_URL: 'http://localhost:3000/'
            }
        }
}

module.exports = nextConfig
