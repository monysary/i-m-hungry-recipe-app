/** @type {import('next').NextConfig} */
require("dotenv").config()
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
    API_ENDPOINT: process.env.API_ENDPOINT,
    API_MODEL: process.env.API_MODEL,
    API_ROLE: process.env.API_ROLE,
    API_PROMPT: process.env.API_PROMPT,
  },
}

module.exports = nextConfig
