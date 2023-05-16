const fs = require('fs');

const env = fs.readFileSync('.env.production');
const envLines = env.toString().split('\n');
const replacedEnvLines = envLines.map((line:string) => {
    if (line.startsWith('VITE_AXIOS_BASE_URL')) {
        const apiIp = process.env.API_IP || 'localhost';
        const apiPort = process.env.API_PORT || '3000';
        return `VITE_AXIOS_BASE_URL=http://${apiIp}:${apiPort}/`;
    }
    return line;
});

const replacedEnv = replacedEnvLines.join('\n');

fs.writeFileSync('.env.production', replacedEnv);
