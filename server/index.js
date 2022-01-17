const app = require('./app');
const server = require('http').Server(app);

async function init(){
    await server.listen(app.get('port'), ()=> {
        console.log(`http://localhost:${app.get('port')}`);
    })
}

init();