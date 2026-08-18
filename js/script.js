/* =========================================================
   SERRALHERIA — SCRIPT.JS
   PARTE 3/5 — JAVASCRIPT

   Funções deste arquivo:
   1. Menu mobile
   2. Carrossel de fotos
   3. Formulário de orçamento
   4. Máscara de telefone
   5. WhatsApp
   6. Tema claro/escuro
   7. Tamanho da fonte
   8. Ano automático do rodapé
   ========================================================= */


/* =========================================================
   1. MENU MOBILE
   ========================================================= */

/*
   querySelector():
   Procura no HTML um elemento através de um seletor CSS.

   Aqui estamos procurando o botão do menu.
*/

const menuToggle = document.querySelector(".menu-toggle");


/*
   Procuramos a lista que contém os links
   do menu principal.
*/

const menu = document.querySelector("#menu-principal");


/*
   Verificamos se os elementos realmente existem
   antes de adicionar eventos.

   Isso evita erros caso o HTML seja alterado.
*/

if (menuToggle && menu) {

    /*
       addEventListener():
       Permite executar uma função quando
       determinado evento acontece.

       Neste caso:
       click = quando o usuário clicar.
    */

    menuToggle.addEventListener("click", function () {

        /*
           classList.toggle():

           Adiciona a classe se ela não existir.
           Remove a classe se ela já existir.

           O CSS possui:

           .menu.active

           que mostra o menu no celular.
        */

        menu.classList.toggle("active");


        /*
           aria-expanded:

           Atualizamos o atributo de acessibilidade
           para informar se o menu está aberto ou fechado.
        */

        const menuAberto =
            menu.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            menuAberto
        );

    });


    /*
       Fecha o menu quando o usuário clicar
       em algum link.
    */

    const menuLinks =
        menu.querySelectorAll("a");


    menuLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            menu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   2. CARROSSEL DE FOTOS
   ========================================================= */

/*
   Selecionamos o elemento que contém
   todas as imagens do carrossel.
*/

const carouselTrack =
    document.querySelector(".carousel-track");


/*
   Botão anterior.
*/

const previousButton =
    document.querySelector(".carousel-button.prev");


/*
   Botão próximo.
*/

const nextButton =
    document.querySelector(".carousel-button.next");


/*
   Verificamos se todos os elementos existem.
*/

if (
    carouselTrack &&
    previousButton &&
    nextButton
) {

    /*
       querySelectorAll():

       Seleciona todas as imagens
       existentes dentro do carrossel.
    */

    const carouselImages =
        carouselTrack.querySelectorAll("img");


    /*
       currentSlide:

       Guarda qual imagem está atualmente
       sendo exibida.

       Arrays começam na posição 0.

       Portanto:

       0 = primeira imagem
       1 = segunda imagem
       2 = terceira imagem
    */

    let currentSlide = 0;


    /*
       Função responsável por movimentar
       o carrossel.
    */

    function updateCarousel() {

        /*
           Calculamos o deslocamento.

           Cada imagem ocupa 100% da largura.

           Exemplo:

           slide 0 = 0%
           slide 1 = -100%
           slide 2 = -200%
        */

        const offset =
            currentSlide * 100;


        /*
           transform: translateX()
           movimenta horizontalmente o conteúdo.

           O CSS possui uma transition,
           criando um movimento suave.
        */

        carouselTrack.style.transform =
            `translateX(-${offset}%)`;

    }


    /*
       BOTÃO PRÓXIMO
    */

    nextButton.addEventListener(
        "click",
        function () {

            /*
               Incrementa o número do slide.

               ++ significa adicionar 1.
            */

            currentSlide++;


            /*
               Se chegarmos ao final,
               voltamos para a primeira imagem.
            */

            if (
                currentSlide >=
                carouselImages.length
            ) {

                currentSlide = 0;

            }


            updateCarousel();

        }
    );


    /*
       BOTÃO ANTERIOR
    */

    previousButton.addEventListener(
        "click",
        function () {

            /*
               Diminui o número do slide.
            */

            currentSlide--;


            /*
               Se estivermos antes da primeira imagem,
               voltamos para a última.
            */

            if (currentSlide < 0) {

                currentSlide =
                    carouselImages.length - 1;

            }


            updateCarousel();

        }
    );

}


/* =========================================================
   3. FORMULÁRIO DE ORÇAMENTO
   ========================================================= */

/*
   Selecionamos o formulário através do ID
   definido no HTML.
*/

const budgetForm =
    document.querySelector("#budget-form");


/*
   Só executamos o código se o formulário existir.
*/

if (budgetForm) {


    /*
       submit:

       Evento acionado quando o formulário
       é enviado.
    */

    budgetForm.addEventListener(
        "submit",
        function (event) {

            /*
               preventDefault():

               Impede o comportamento padrão do formulário.

               Sem isso, o navegador poderia recarregar
               a página ao clicar em enviar.
            */

            event.preventDefault();


            /*
               Pegamos os valores digitados
               pelo usuário.
            */

            const name =
                document.querySelector("#name").value.trim();


            const phone =
                document.querySelector("#phone").value.trim();


            const service =
                document.querySelector("#service").value;


            const message =
                document.querySelector("#message").value.trim();


            /*
               Validação simples.

               Verificamos se os campos principais
               foram preenchidos.
            */

            if (
                !name ||
                !phone ||
                !service ||
                !message
            ) {

                alert(
                    "Por favor, preencha todos os campos."
                );

                return;

            }


            /*
               Criamos um objeto com os dados
               do formulário.

               Isso demonstra o uso de objetos
               em JavaScript.
            */

            const serviceNames = {

                portoes: "Portões",

                grades: "Grades",

                corrimaos: "Corrimãos",

                estrutura:
                    "Estruturas metálicas",

                "sob-medida":
                    "Projeto sob medida"

            };


            /*
               Transformamos o valor técnico
               selecionado pelo usuário no nome
               amigável do serviço.
            */

            const serviceName =
                serviceNames[service] || service;


            /*
               Número do WhatsApp da empresa.

               IMPORTANTE:

               SUBSTITUA pelo número REAL.

               Formato:

               55 + DDD + número

               Exemplo:

               5562999999999
            */

            const whatsappNumber =
                "5562996752372";


            /*
               Criamos a mensagem que será enviada
               para o WhatsApp.

               \n significa quebra de linha.
            */

            const whatsappMessage =
                `Olá! Gostaria de solicitar um orçamento.

Nome: ${name}

Telefone: ${phone}

Serviço: ${serviceName}

Descrição:
${message}`;


            /*
               encodeURIComponent():

               Converte caracteres especiais,
               espaços e acentos para um formato
               que pode ser utilizado em uma URL.
            */

            const encodedMessage =
                encodeURIComponent(
                    whatsappMessage
                );


            /*
               Criamos o endereço do WhatsApp.
            */

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


            /*
               window.open():

               Abre o WhatsApp em uma nova aba.
            */

            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


/* =========================================================
   4. MÁSCARA DE TELEFONE
   ========================================================= */

/*
   Selecionamos o campo de telefone.
*/

const phoneInput =
    document.querySelector("#phone");


if (phoneInput) {

    /*
       O evento input acontece toda vez
       que o usuário modifica o conteúdo
       do campo.
    */

    phoneInput.addEventListener(
        "input",
        function () {


            /*
               Retiramos tudo que não for número.

               \D significa:
               qualquer caractere que NÃO seja número.
            */

            let value =
                phoneInput.value.replace(/\D/g, "");


            /*
               Limitamos a quantidade de números.

               Telefone brasileiro com DDD:
               máximo de 11 dígitos.
            */

            value =
                value.substring(0, 11);


            /*
               Aplicamos a máscara.

               Exemplo:

               62999999999

               vira:

               (62) 99999-9999
            */

            if (value.length <= 2) {

                value =
                    value.replace(
                        /^(\d{0,2})/,
                        "($1"
                    );

            }
            else if (value.length <= 7) {

                value =
                    value.replace(
                        /^(\d{2})(\d{0,5})/,
                        "($1) $2"
                    );

            }
            else {

                value =
                    value.replace(
                        /^(\d{2})(\d{5})(\d{0,4})/,
                        "($1) $2-$3"
                    );

            }


            /*
               Atualizamos o valor exibido
               no campo.
            */

            phoneInput.value = value;

        }
    );

}


/* =========================================================
   5. TEMA CLARO / ESCURO
   ========================================================= */

/*
   Selecionamos os três botões de tema.
*/

const lightThemeButton =
    document.querySelector("#theme-light");


const darkThemeButton =
    document.querySelector("#theme-dark");


/*
   Função para ativar o tema claro.
*/

function activateLightTheme() {

    /*
       remove():

       Remove a classe dark-mode do body.
    */

    document.body.classList.remove(
        "dark-mode"
    );


    /*
       localStorage:

       Permite guardar uma informação
       no navegador.

       Assim o tema escolhido pode
       permanecer após atualizar a página.
    */

    localStorage.setItem(
        "theme",
        "light"
    );

}


/*
   Função para ativar o tema escuro.
*/

function activateDarkTheme() {

    /*
       Adicionamos a classe dark-mode.

       O CSS possui regras específicas
       para essa classe.
    */

    document.body.classList.add(
        "dark-mode"
    );


    /*
       Guardamos a preferência.
    */

    localStorage.setItem(
        "theme",
        "dark"
    );

}


/*
   Evento do botão de tema claro.
*/

if (lightThemeButton) {

    lightThemeButton.addEventListener(
        "click",
        activateLightTheme
    );

}


/*
   Evento do botão de tema escuro.
*/

if (darkThemeButton) {

    darkThemeButton.addEventListener(
        "click",
        activateDarkTheme
    );

}


/*
   Recuperamos o tema salvo anteriormente.
*/

const savedTheme =
    localStorage.getItem("theme");


/*
   Se o usuário já escolheu um tema,
   aplicamos automaticamente.
*/

if (savedTheme === "dark") {

    activateDarkTheme();

}
else {

    activateLightTheme();

}


/* =========================================================
   6. TAMANHO DA FONTE
   ========================================================= */

/*
   Selecionamos os três botões:
   - pequena
   - média
   - grande
*/

const smallFontButton =
    document.querySelector("#font-small");


const mediumFontButton =
    document.querySelector("#font-medium");


const largeFontButton =
    document.querySelector("#font-large");


/*
   Função responsável por alterar
   o tamanho da fonte.
*/

function changeFontSize(size) {

    /*
       Primeiro removemos todas as classes
       anteriores.
    */

    document.body.classList.remove(
        "font-small",
        "font-medium",
        "font-large"
    );


    /*
       Depois adicionamos somente
       a classe escolhida.
    */

    document.body.classList.add(
        `font-${size}`
    );


    /*
       Salvamos a escolha no navegador.
    */

    localStorage.setItem(
        "fontSize",
        size
    );

}


/*
   Botão de fonte pequena.
*/

if (smallFontButton) {

    smallFontButton.addEventListener(
        "click",
        function () {

            changeFontSize("small");

        }
    );

}


/*
   Botão de fonte média.
*/

if (mediumFontButton) {

    mediumFontButton.addEventListener(
        "click",
        function () {

            changeFontSize("medium");

        }
    );

}


/*
   Botão de fonte grande.
*/

if (largeFontButton) {

    largeFontButton.addEventListener(
        "click",
        function () {

            changeFontSize("large");

        }
    );

}


/*
   Recuperamos o tamanho salvo.
*/

const savedFontSize =
    localStorage.getItem("fontSize");


/*
   Se existir uma preferência,
   aplicamos.

   Caso contrário, usamos o tamanho médio.
*/

if (savedFontSize) {

    changeFontSize(savedFontSize);

}
else {

    changeFontSize("medium");

}


/* =========================================================
   7. ANO AUTOMÁTICO DO RODAPÉ
   ========================================================= */

/*
   Procuramos o parágrafo do rodapé.

   Como o HTML atual possui o ano escrito diretamente,
   esta parte pode ser utilizada posteriormente caso
   você queira transformar o ano em automático.
*/

const footerYear =
    document.querySelector(".footer-bottom p");


if (footerYear) {

    /*
       new Date().getFullYear():

       Pega automaticamente o ano atual
       do computador/navegador.
    */

    const currentYear =
        new Date().getFullYear();


    /*
       innerHTML:

       Permite alterar o conteúdo HTML
       existente dentro do elemento.
    */

    footerYear.innerHTML =
        `&copy; ${currentYear} Serralheria.
         Todos os direitos reservados.`;

}


/* =========================================================
   8. ACESSIBILIDADE — TECLADO
   ========================================================= */

/*
   Permite que o usuário utilize a tecla ESC
   para fechar o menu mobile.

   Isso melhora a experiência de acessibilidade.
*/

document.addEventListener(
    "keydown",
    function (event) {

        /*
           Verificamos se a tecla pressionada
           foi Escape.
        */

        if (event.key === "Escape") {

            if (menu) {

                menu.classList.remove("active");

            }


            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);


/* =========================================================
   FIM DO SCRIPT
   ========================================================= */