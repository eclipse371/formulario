import express from 'express';
const app = express();
const porta = 4000;
const host = '0.0.0.0';
var clientes = [];
app.use(express.urlencoded({ extended: true }));

function cadastroCliente(req, resp){
resp.send(`
    <html>
    <head>
    <title>Cadastro de alunos</title>
    </head>
    <body>
     <h2>Cadastro Cliente</h2>
        <form action="/cadastrar" method="POST">
            <label for="nome">Nome</label>
            <input type="text" id="nome" name="nome">
             <br>
            <label for="sobrenome">Sobrenome</label>
            <input type="text" id="sobrenome" name="sobrenome">
             <br>

            <label for="email">E-mail</label>
            <input type="text" id="email" name="email">
            <br>
            <label for="cidade">Cidade</label>
            <input type="text" id=cidade" name="cidade" >
            <br>
            <button type="submit">Cadastrar</button>
        </form>
        <style>
         label{
         display: block;
         }


        </style>
    </body>
    </html>
    `);
}
function cadastrar(req, resp){

    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const email = req.body.email;
    const cidade = req.body.cidade;
   
    const cli = {nome, sobrenome, email, cidade};
    clientes.push(cli);
    resp.write(`
        <html>
  <head>
    <title>Cadastro de alunos</title>
  </head>
  <body>
    <h2>Cadastro de alunos</h2>
   `);
 
    for (var i = 0; i < clientes.length; i++) {
      resp.write( `
          <ul>
            <li>
              <strong>Nome:</strong> ${clientes[i].nome} <br>
              <strong>Sobrenome:</strong> ${clientes[i].sobrenome} <br>
              <strong>Email:</strong> ${clientes[i].email}<br>
              <strong>Email:</strong> ${clientes[i].cidade}
            </li>
          </ul>
        `);
      }

    resp.write(`
         <form action="/cadastrarCliente" method="get">
      <button type="submit">Continuar Cadastrando</button>
    </form>
        
  </body>
</html>
    `);

    resp.end();
    
}
app.get('/cadastrarCliente', cadastroCliente);
app.post('/cadastrar', cadastrar);
app.listen(porta, host, () =>{
    console.log(`Servidor iniciado e em execução no endereço http:// ${host}:${porta} `);
});