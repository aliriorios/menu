$(document).ready(function () {
    cardapio.eventos.init();
})

// VARIÁVEIS GLOBAIS ----------------------------------------------------------------
var cardapio = {};

var MEU_CARRINHO = [];
var MEU_ENDERECO = null;

var VALOR_CARRINHO = 0;
var VALOR_ENTREGA = 5;

var CELULAR_EMPRESA = '5574999551132';

// OBJETOS EVENTOS ----------------------------------------------------------------
cardapio.eventos = {
    init: () => {
        cardapio.metodos.obterItensCardapio();
        cardapio.metodos.carregarBotaoReserva();
    }
}

// OBJETOS MÉTODOS ----------------------------------------------------------------
// Uma ideia de como aplicar POO
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

                cardapio.metodos.mensagem('Item adicionado ao carrinho.', 'green');
                $("#qntd-" + id).text(0);

                cardapio.metodos.atualizarBadgeTotal();
            }
        }
    },

    // Atualizando a quantidade de produtos no carrinho
    atualizarBadgeTotal: () => {
        var total = 0;

        $.each(MEU_CARRINHO, (i, e) => {
            total += e.qntd;
        })

        if (total > 0) {
            $(".botao-carrinho").removeClass("hidden");
            $(".container-total-carrinho").removeClass("hidden");
            
        } else {
            $(".botao-carrinho").addClass("hidden");
            $(".container-total-carrinho").addClass("hidden");
        }

        $(".badge-total-carrinho").html(total);
    },

    abrirCarrinho: (abrir) => {
        if (abrir) {
            $("#modalCarrinho").removeClass("hidden");

            cardapio.metodos.carregarCarrinho();
            
        } else {
            $("#modalCarrinho").addClass("hidden");
        }
    },

    // Altera os textos e exibe os botões das etapas
    carregarEtapa: (etapa) => {
        if (etapa == 1) {
            $("#lblTituloEtapa").text('Seu carrinho:');

            $("#itensCarrinho").removeClass("hidden");
            $("#localEntrega").addClass("hidden");
            $("#resumoCarrinho").addClass("hidden");

            $(".etapa").removeClass("active");
            $(".etapa1").addClass("active");

            $("#btnEtapaPedido").removeClass("hidden");
            $("#btnEtapaEndereco").addClass("hidden");
            $("#btnEtapaResumo").addClass("hidden");
            $("#btnEtapaVoltar").addClass("hidden");
        } 
        
        if (etapa == 2) {
            $("#lblTituloEtapa").text('Endereço de entrega:');

            $("#itensCarrinho").addClass("hidden");
            $("#localEntrega").removeClass("hidden");
            $("#resumoCarrinho").addClass("hidden");

            $(".etapa").removeClass("active");
            $(".etapa1").addClass("active");
            $(".etapa2").addClass("active");

            $("#btnEtapaPedido").addClass("hidden");
            $("#btnEtapaEndereco").removeClass("hidden");
            $("#btnEtapaResumo").addClass("hidden");
            $("#btnEtapaVoltar").removeClass("hidden");
        }

        if (etapa == 3) {
            $("#lblTituloEtapa").text('Resumo do pedido:');

            $("#itensCarrinho").addClass("hidden");
            $("#localEntrega").addClass("hidden");
            $("#resumoCarrinho").removeClass("hidden");

            $(".etapa").removeClass("active");
            $(".etapa1").addClass("active");
            $(".etapa2").addClass("active");
            $(".etapa3").addClass("active");

            $("#btnEtapaPedido").addClass("hidden");
            $("#btnEtapaEndereco").addClass("hidden");
            $("#btnEtapaResumo").removeClass("hidden");
            $("#btnEtapaVoltar").removeClass("hidden");
        }
    },

    // Identifica a etapa para voltar
    voltarEtapa: () => {
        let etapa = $(".etapa.active").length; // Identificando quantas etapas estão ativas

        cardapio.metodos.carregarEtapa(etapa - 1); // Voltando para a anterior
    },

    // Carrega a lista de itens do carriniho
    carregarCarrinho: () => {
        cardapio.metodos.carregarEtapa(1);

        if (MEU_CARRINHO.length > 0) {
            $("#itensCarrinho").html('');
            
            $.each(MEU_CARRINHO, (i, e) => {
                let temp = cardapio.templates.itemCarrinho
                .replace(/\${img}/g, e.img)
                .replace(/\${name}/g, e.name)
                .replace(/\${price}/g, e.price.toFixed(2).replace('.', ','))
                .replace(/\${id}/g, e.id)
                .replace(/\${qntd}/g, e.qntd);
                
                $("#itensCarrinho").append(temp);

                // Último item do carrinho
                if ((i + 1) == MEU_CARRINHO.length) {
                    cardapio.metodos.carregarValores();
                }
            })

        } else {
            $("#itensCarrinho").html('<p class="carrinho-vazio"><i class="fa fa-shopping-bag"></i>Seu carrinho está vazio.</p>');
            cardapio.metodos.carregarValores();
        }
    },

    diminuirQuantidadeCarrinho: (id) => {
        let qntdAtual = parseInt($("#qntd-carrinho-" + id).text());

        if (qntdAtual > 1) {
            $("#qntd-carrinho-" + id).text(qntdAtual - 1);
            cardapio.metodos.atualizarCarrinho(id, qntdAtual - 1);

        } else {
            cardapio.metodos.removerItemCarrinho(id);
        }
    },

    aumentarQuantidadeCarrinho: (id) => {
        let qntdAtual = parseInt($("#qntd-carrinho-" + id).text());
        $("#qntd-carrinho-" + id).text(qntdAtual + 1);
        cardapio.metodos.atualizarCarrinho(id, qntdAtual + 1);
    },

    removerItemCarrinho: (id) => {
        MEU_CARRINHO = $.grep(MEU_CARRINHO, (e, i) => {return e.id != id});
        cardapio.metodos.carregarCarrinho();

        // Atualiza o badge do botão carrinho
        cardapio.metodos.atualizarBadgeTotal();
    },

    // Atualiza o carrinho com a quantidade atual (MEU_CARRINHO)
    atualizarCarrinho: (id, qntd) => {
        let objIndex = MEU_CARRINHO.findIndex((obj => obj.id == id));
        MEU_CARRINHO[objIndex].qntd = qntd;

        // Atualiza o badge do botão carrinho
        cardapio.metodos.atualizarBadgeTotal();

        // Atualiza os valores totais do carrinho
        cardapio.metodos.carregarValores();
    },

    carregarValores: () => {
        VALOR_CARRINHO = 0;

        // Zerando os valores
        $("#lblSubTotal").text('R$ 0,00');
        $("#lblValorEntrega").text('+ R$ 0,00');
        $("#lblValorTotal").text('R$ 0,00');

        $.each(MEU_CARRINHO, (i, e) => {
            VALOR_CARRINHO += parseFloat(e.price * e.qntd);

            if ((i + 1) == MEU_CARRINHO.length) {
                $("#lblSubTotal").text(`R$ ${VALOR_CARRINHO.toFixed(2).replace(".", ",")}`);
                $("#lblValorEntrega").text(`+ R$ ${VALOR_ENTREGA.toFixed(2).replace(".", ",")}`);
                $("#lblValorTotal").text(`R$ ${(VALOR_CARRINHO + VALOR_ENTREGA).toFixed(2).replace(".", ",")}`);
            }
        })
    },

    carregarEndereco: () => {
        if (MEU_CARRINHO.length <= 0) {
            cardapio.metodos.mensagem("Seu carrinho está vazio.")
            return;
            
        }

        cardapio.metodos.carregarEtapa(2);
    },

    // API ViaCEP
    buscarCep: () => {
        var cep = $("#txtCEP").val().trim().replace(/\D/g, '');
        /* 
        * Pegando o valor do cep digitado
        * trin -> Remove espaços vazios
        * replace(/\D/g, '') -> Remove tudo que não for numérico
        */

        if (cep != "") {
            var validacep = /^[0-9]{8}$/;
            /* 
            * Regex para validar a quantidade de caracteres
            * Expressão regular
            */

            // Validando a expressão
            if (validacep.test(cep)) {
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function(dados){
                    if (!("erro" in dados)) {
                        // Atualizando os campos dinamicamente com os valores retornados da API
                        $("#txtEndereco").val(dados.logradouro);
                        $("#txtBairro").val(dados.bairro);
                        $("#txtCidade").val(dados.localidade);
                        $("#ddlUF").val(dados.uf);

                        $("#txtNumero").focus();

                    } else {
                        cardapio.metodos.mensagem("CEP não encontrado. Preencha as informações manualmente.")
                        $("#txtEndereco").focus();
                    }
                });

            } else {
                cardapio.metodos.mensagem("Formato do CEP inválido.");
                $("#txtCEP").focus();
            }

        } else {
            cardapio.metodos.mensagem("Informe o CEP, por favor!");
            $("#txtCEP").focus();
            /* 
            * focus -> Foca o cursor no campo de CEP
            */
        }
    },

    resumoPedido: () => {
        let cep = $("#txtCEP").val().trim();
        let endereco = $("#txtEndereco").val().trim();
        let bairro = $("#txtBairro").val().trim();
        let cidade = $("#txtCidade").val().trim();
        let uf = $("#ddlUF").val().trim();
        let numero = $("#txtNumero").val().trim();
        let complemento = $("#txtComplemento").val().trim();

        if (cep.length <= 0) {
            cardapio.metodos.mensagem("Informe o CEP, por favor.");
            $("#txtCEP").focus();
            return;
        }

        if (endereco.length <= 0) {
            cardapio.metodos.mensagem("Informe o endereço, por favor.");
            $("#txtEndereco").focus();
            return;
        }

        if (bairro.length <= 0) {
            cardapio.metodos.mensagem("Informe o bairro, por favor.");
            $("#txtBairro").focus();
            return;
        }

        if (cidade.length <= 0) {
            cardapio.metodos.mensagem("Informe o cidade, por favor.");
            $("#txtCidade").focus();
            return;
        }

        if (uf.length == "-1") {
            cardapio.metodos.mensagem("Informe o estado, por favor.");
            $("#ddlUF").focus();
            return;
        }

        if (numero.length <= 0) {
            cardapio.metodos.mensagem("Informe o número, por favor.");
            $("#txtNumero").focus();
            return;
        }

        MEU_ENDERECO = {
            cep: cep,
            endereco: endereco,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            numero: numero,
            complemento: complemento
        }
        
        cardapio.metodos.carregarEtapa(3);
        cardapio.metodos.carregarResumo();
    },

    carregarResumo: () => {
        $("#listaItensResumo").html('');

        $.each(MEU_CARRINHO, (i, e) => {
            let temp = cardapio.templates.itemResumo
            .replace(/\${img}/g, e.img)
            .replace(/\${name}/g, e.name)
            .replace(/\${price}/g, e.price.toFixed(2).replace('.', ','))
            .replace(/\${qntd}/g, e.qntd);

            $("#listaItensResumo").append(temp);
        });

        $("#resumoEndereco").html(`${MEU_ENDERECO.endereco}, ${MEU_ENDERECO.numero}, ${MEU_ENDERECO.bairro}`);
        $("#cidadeEndereco").html(`${MEU_ENDERECO.cidade}-${MEU_ENDERECO.uf} / ${MEU_ENDERECO.cep} ${MEU_ENDERECO.complemento}`);

        cardapio.metodos.finalizarPedido();
    },

    // Atualiza o link do botão do whatsapp
    finalizarPedido: () => {
        if (MEU_CARRINHO.length > 0 && MEU_ENDERECO != null) {
            var texto = 'Olá, gostaria de fazer um pedido:';
            texto += `\n\n*Itens do pedido:*\n\${itens}`;
            texto += `\n*Endereço de entrega:*`;
            texto += `\n${MEU_ENDERECO.endereco}, ${MEU_ENDERECO.numero}, ${MEU_ENDERECO.bairro}`;
            texto += `\n${MEU_ENDERECO.cidade}-${MEU_ENDERECO.uf} / ${MEU_ENDERECO.cep} ${MEU_ENDERECO.complemento}`;
            texto += `\n\n*Total (com entrega): R$ ${(VALOR_CARRINHO + VALOR_ENTREGA).toFixed(2).replace('.', ',')}*`;

            var itens = '';

            $.each(MEU_CARRINHO, (i, e) => {
                itens += `*${e.qntd}x* ${e.name} ....... R$ ${e.price.toFixed(2).replace('.', ',')} \n`;

                if ((i + 1) == MEU_CARRINHO.length) {
                    texto = texto.replace(/\${itens}/g, itens);

                    // Converte o "texto" para URL
                    let encode = encodeURI(texto);

                    // Atualizando o "href" do botão de enviar
                    let URL = `https://wa.me/${CELULAR_EMPRESA}?text=${encode}`;
                    $("#btnEtapaResumo").attr('href', URL);
                }
            })
        }

    },

    carregarBotaoReserva: () => {
        var texto = 'Olá! Gostaria de fazer uma *reserva*.';

        let encode = encodeURI(texto);
        let URL = `https://wa.me/${CELULAR_EMPRESA}?text=${encode}`;;

        $("#btnReserva").attr('href', URL);

    },

    // Mensagem de notificação (padrão -> erro)
    mensagem: (texto, cor = 'red', tempo = 3000) => {
        let id = Math.floor(Date.now() + Math.random()).toString();

        let msg = `<div id="msg-${id}" class="animated fadeInDown toast ${cor}">${texto}</div>`

        $("#container-mensagens").append(msg);

        // Removendo a mensagem após o tempo passado
        setTimeout(() => {
            $("#msg-" + id).removeClass("fadeInDown");
            $("#msg-" + id).addClass("fadeOutUp");

            setTimeout(() => {
                $("#msg-" + id).remove();
            }, 800);
        }, tempo);
    }
}

// TEMPLATES ----------------------------------------------------------------
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
    `,

    itemCarrinho: `
        <div class="col-12 item-carrinho">
            <div class="img-produto">
                <img src="\${img}">
            </div>
            <div class="dados-produto">
                <p class="title-produto"><strong>\${name}</strong></p>
                <p class="price-produto"><strong>R$ \${price}</strong></p>
            </div>
            <div class="add-carrinho">
                <span class="btn-menos" onclick="cardapio.metodos.diminuirQuantidadeCarrinho('\${id}')"><i class="fas fa-minus"></i></span>
                <span class="add-numero-itens" id="qntd-carrinho-\${id}">\${qntd}</span>
                <span class="btn-mais" onclick="cardapio.metodos.aumentarQuantidadeCarrinho('\${id}')"><i class="fas fa-plus"></i></span>
                <span class="btn btn-remove" onclick="cardapio.metodos.removerItemCarrinho('\${id}')"><i class="fa fa-times"></i></span>
            </div>
        </div>
    `,

    itemResumo: `
        <div class="col-12 item-carrinho resumo">
            <div class="img-produto-resumo">
                <img src="\${img}" alt="">
            </div>

            <div class="dados-produto">
                <p class="title-produto-resumo">
                    <strong>\${name}</strong>
                </p>
                <p class="price-produto-resumo">
                    <strong>R$ \${price}</strong>
                </p>
            </div>

            <p class="quantidade-produto-resumo">
                x <strong>\${qntd}</strong>
            </p>
        </div>
    `
}