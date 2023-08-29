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
    obterItensCardapio: (categoria = 'burgers', verMais = false) => {
        var filtro = MENU[categoria];

        if (!verMais) {
            $("#itensMenu").html('');
            $("#btnVerMais").removeClass('hidden');
        } 
        
        $.each(filtro, (i, e) => { // O 'i' é o índice de itens
            let temp = cardapio.templates.item
            .replace(/\${img}/g, e.img)
            .replace(/\${name}/g, e.name)
            .replace(/\${price}/g, e.price.toFixed(2).replace('.', ','));

            // Botão ver mais foi acionado
            if (verMais && i >= 8 && i <= 12) {
                $("#itensMenu").append(temp);
            }
            
            // Paginação inicial
            if (!verMais && i < 8) {
                $("#itensMenu").append(temp);
            }
        })

        // Removendo o ativo do botão
        $(".container-menu a").removeClass("active");

        // Adicionando para a atual
        $("#menu-" + categoria).addClass("active");
    },

    verMais: () => {
        var ativo = $(".container-menu a.active").attr("id").split('menu-')[1]; // Pegando qual categoria está ativada [menu-][burgers]
        cardapio.metodos.obterItensCardapio(ativo, true);

        $("#btnVerMais").addClass("hidden");
    }
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