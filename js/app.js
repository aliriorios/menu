$(document).ready(function () {
    cardapio.eventos.init();
})

var cardapio = {};

cardapio.eventos = {
    init: () => {
        cardapio.metodos.obterItensCardapio();
    }
}

cardapio.metodos = {
    // Obtendo os itens do cardápio
    obterItensCardapio: (categoria = 'burgers') => {
        var filtro = MENU[categoria];

        $("#itensMenu").html('');

        $.each(filtro, (i, e) => {
            let temp = cardapio.templates.item
            .replace(/\${img}/g, e.img)
            .replace(/\${name}/g, e.name)
            .replace(/\${price}/g, e.price.toFixed(2).replace('.', ','));
            $("#itensMenu").append(temp);
        })

        // Removendo o ativo do botão
        $(".container-menu a").removeClass("active");

        // Adicionando para a atual
        $("#simsd-" + categoria).addClass("active");
    }, 
}

cardapio.templates = {
    item: `
        <div class="col-3 mb-5">
            <div class="card card-item">
                <div class="img-produto">
                <img src="\${img}" alt="">
                    <p class="title-produto text-center mt-4"><strong>\${name}</strong></p>
                    <p class="price-produto text-center"><strong>R$ \${price}</strong></p>
                    <div class="add-carrinho">
                        <span class="btn-menos"><i class="fas fa-minus"></i></span>
                        <span class="add-numero-itens">0</span>
                        <span class="btn-mais"><i class="fas fa-plus"></i></span>
                        <span class="btn btn-add"><i class="fa fa-shopping-bag"></i></span>
                    </div>
                </div>
            </div>
        </div>
    `
}