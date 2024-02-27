<!-- HEADER -->
<h1 align="center">
    <p>Cardápio / Menu</p> 
</h1>

<!-- INDEX -->
<h2>📇 Índice:</h2>

- [Sobre](#-sobre)
- [Ferramentas](#%EF%B8%8F-ferramentas)

<!-- INFO -->
<h2>📝 Sobre</h2>

> ### Status:
> Front-end: Concluído ✅<br/>
> Back-end: Futuramente será implementado uma API própria ⚠️

> ### Descrição:
> O "menu" é um projeto de desenvolvimento web desenvolvido principalmente em JavaScript, com o objetivo de ser um cardápio online e interativo. 
> O projeto conta desde um design responsivo e intuitivo em landing page, até com o envio dos pedidos e reservas através do Whatsapp API.

<!-- TOOLS -->
<h2>🛠️ Ferramentas</h2>

> ### Linguagens:
- HTML5 ([Docs](https://developer.mozilla.org/pt-BR/docs/Web/HTML))
- CSS3 ([Docs](https://developer.mozilla.org/en-US/docs/Web/CSS))
- JavaScript ([Docs](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript))

> ### Frameworks / Bibliotecas:
- Animate.css - v4.1.1 ([Docs](https://animate.style))
- Bootstrap - v4.6.2 ([Docs](https://getbootstrap.com/docs/4.6/getting-started/introduction/))
- Font Awesome - 5.15.4 ([Docs](https://fontawesome.com/docs))
- JQuery - v3.7.1 ([Docs](https://api.jquery.com))
- WOW.js - v1.1.2 ([Docs](https://wowjs.uk/docs))

> ### Outras ferramentas:
- Whatsapp.me ([Docs](https://faq.whatsapp.com/5913398998672934/))
<hr>

<!-- SETUP -->
<h2>🖥️ Configurando o Projeto</h2>

> Você irá precisar de algum gerenciador de pacotes para módulos que foram utilizados nesse projeto, eu utilizo o npm (sendo necessário o node.js), mas você pode utilizar o que for de sua preferência. <br/>
> Para a configuração dessa documentação, utilizarei o npm. Vale lembrar que já espero que tenha instalado e confgurado o node.js e o npm na sua máquina. <br/>

> ### Animate.css:
```bash
    # O animate foi utilizado para animações e suavizações de elementos do front end.
    $ npm install animate.css --save
```
- Importe o módulo no arquivo css principal: @import "../node_modules/animate.css/animate.css";

> ### Bootstrap:
```bash
    # O bootstrap faz parte de basicamente toda a estrutura css do projeto; o sistema provavellmente ficará "quebrado" sem ele.
    $ npm i bootstrap@4.6.2
```
- Importe o módulo no arquivo css principal: @import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

> ### Font Awesome:
```bash
    # Os ícones do projeto são todos dessa biblioteca.
    $ npm i @fortawesome/fontawesome-free@5.15.4
```
- Importe o módulo no arquivo css principal: @import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

> ### WOW.js:
```bash
    # Basicamente, permite que as animações do animate.css sejam "disparados" apenas quando visualizados no display.
    $ npm i wowjs@1.1.2
```
- Faça o link do módulo no arquivo html principal: <script language="JavaScript" src="node_modules/wowjs/dist/wow.min.js"></script>
- Vale lembrar que o wow.js não funciona com o parâmetro "defer"; nem mesmo se colocar o link no final do arquivo.

> ### Popper.js (opcional):
```bash
    # O popper.js é para posicionamento de elementos html. Ele faz parte do Bootstrap.
    $ npm i popper.js@1.16.1-lts
```
- Faça o link do módulo no arquivo html principal: <script language="JavaScript" src="node_modules/popper.js/dist/umd/popper.min.js" defer></script>
- O popper.js é OPCIONAL porque o Bootstrap já o inclui no projeto, mas caso seja necessário já fica a configuração.

> <br/>Os que não estiverem inclusos, já estão configurados na pasta do projeto como o Modernizr ou já estão integrados nas dependências de outros, como o JQuery. O JQuery é uma dependência para o Bootstrap.

<!-- LICENSE -->
<h2>🧾 Licença</h2>

> Este projeto está sobre a licença do MIT. Veja o arquivo <a href="">LICENCE</a> para mais informações.

<hr>

<!-- DONE BY -->
<p align="center">Feito por <strong>Alírio de Souza Rios</strong><br><br></p>
