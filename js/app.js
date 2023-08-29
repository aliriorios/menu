$(document).ready(function () {
    cardapio.eventos.init();
})

var cardapio = {};

var MEU_CARRINHO = [];

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
            .replace(/\${price}/g, e.price.toFixed(2).replace('.', ','))
            .replace(/\${id}/g, e.id);

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
    },

    diminuirQuantidade: (id) => {
        let qntdAtual = parseInt($("#qntd-" + id).text());

        if (qntdAtual > 0) {
            $("#qntd-" + id).text(qntdAtual - 1);
        }
    },

    aumentarQuantidade: (id) => {
        let qntdAtual = parseInt($("#qntd-" + id).text());

        $("#qntd-" + id).text(qntdAtual + 1);
    },

    // Adicionar itens ao carrinho
    adicionarAoCarrinho: (id) => {
        let qntdAtual = parseInt($("#qntd-" + id).text());

        if (qntdAtual > 0) {
            // Obter a categoria ativia
            var categoria = $(".container-menu a.active").attr("id").split('menu-')[1];

            //  Obter a lista de itens
            let filtro = MENU[categoria];

            // Do filtro, pegando apenas o item que está chamando o método
            let item = $.grep(filtro, (e, i) => {return e.id == id}); // For each do JQuery que retorna um objeto

            if (item.length > 0) {
                // Validando se já existe o item no carrinho
                let existe = $.grep(MEU_CARRINHO, (elem, index) => {return elem.id == id})

                // Caso já exista no carrinho, só altera a quantidade
                if (existe.length > 0) {
                    let objIndex = MEU_CARRINHO.findIndex((obj) => {return obj.id == id});
                    MEU_CARRINHO[objIndex].qntd += qntdAtual;

                } else {
                    item[0].qntd = qntdAtual;
                    MEU_CARRINHO.push(item[0]);
                }

                alert("Item adicionado ao carrinho.");
                $("#qntd-" + id).text(0);
            }
        }
    },
}

cardapio.templates = {
    item: `
        <div class="col-3 mb-5">
            <div class="card card-item" id="\${id}">
                <div class="img-produto">
                <img src="\${img}" alt="">
                    <p class="title-produto text-center mt-4"><strong>\${name}</strong></p>
                    <p class="price-produto text-center"><strong>R$ \${price}</strong></p>
                    <div class="add-carrinho">
                        <span class="btn-menos" onclick="cardapio.metodos.diminuirQuantidade('\${id}')"><i class="fas fa-minus"></i></span>
                        <span class="add-numero-itens" id="qntd-\${id}">0</span>
                        <span class="btn-mais" onclick="cardapio.metodos.aumentarQuantidade('\${id}')"><i class="fas fa-plus"></i></span>
                        <span class="btn btn-add" onclick="cardapio.metodos.adicionarAoCarrinho('\${id}')"><i class="fa fa-shopping-bag"></i></span>
                    </div>
                </div>
            </div>
        </div>
    `
}