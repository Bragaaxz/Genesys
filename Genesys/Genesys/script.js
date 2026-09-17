/* =========================================
   CARROSSEL DA HOME
========================================= */

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;


function nextSlide() {

    if (!slides.length) {
        return;
    }

    slides[currentSlide].classList.remove("active");

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    slides[currentSlide].classList.add("active");

}


if (slides.length > 1) {

    setInterval(nextSlide, 3500);

}



/* =========================================
   SCROLL / ARRASTE DA EQUIPE
========================================= */

const teamCarousel =
    document.querySelector(".team-carousel");


const teamTrack =
    document.querySelector(".team-track");


if (teamCarousel && teamTrack) {

    let isDragging = false;

    let startX = 0;

    let startScrollLeft = 0;

    let moved = false;


    teamCarousel.addEventListener(
        "mousedown",
        event => {

            isDragging = true;

            moved = false;

            startX = event.pageX;

            startScrollLeft =
                teamCarousel.scrollLeft;

            teamCarousel.classList.add(
                "is-dragging"
            );

        }
    );


    teamCarousel.addEventListener(
        "mousemove",
        event => {

            if (!isDragging) {
                return;
            }


            const distancia =
                event.pageX - startX;


            if (Math.abs(distancia) > 5) {

                moved = true;

            }


            event.preventDefault();


            teamCarousel.scrollLeft =
                startScrollLeft - distancia;

        }
    );


    function pararArraste() {

        isDragging = false;

        teamCarousel.classList.remove(
            "is-dragging"
        );

    }


    teamCarousel.addEventListener(
        "mouseup",
        pararArraste
    );


    teamCarousel.addEventListener(
        "mouseleave",
        pararArraste
    );


    teamCarousel.addEventListener(
        "dragstart",
        event => {

            event.preventDefault();

        }
    );


    teamCarousel.addEventListener(
        "wheel",
        event => {

            if (
                Math.abs(event.deltaY) >
                Math.abs(event.deltaX)
            ) {

                if (
                    teamCarousel.scrollWidth >
                    teamCarousel.clientWidth
                ) {

                    teamCarousel.scrollLeft +=
                        event.deltaY;

                    event.preventDefault();

                }

            }

        },
        {
            passive: false
        }
    );

}



/* =========================================
   MENU ATIVO
========================================= */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".nav-item");


function updateActiveMenu() {

    let current = "";

    const scrollPosition =
        window.scrollY;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 220;


        const sectionBottom =
            sectionTop + section.offsetHeight;


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveMenu
);


updateActiveMenu();



/* =========================================
   REVEAL
========================================= */

const reveals =
    document.querySelectorAll(".reveal");


function updateReveals() {

    reveals.forEach(item => {

        const top =
            item.getBoundingClientRect().top;


        if (
            top <
            window.innerHeight - 100
        ) {

            item.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateReveals
);


updateReveals();



/* =========================================
   MODAL - QUERO MAIS INFORMAÇÕES
========================================= */

const btnQueroInformacoes =
    document.getElementById(
        "btnQueroInformacoes"
    );


const modalInformacoes =
    document.getElementById(
        "modalInformacoes"
    );


const btnFecharInformacoes =
    document.getElementById(
        "btnFecharInformacoes"
    );


const btnInformacoesContato =
    document.getElementById(
        "btnInformacoesContato"
    );



function abrirModalInformacoes() {

    if (!modalInformacoes) {
        return;
    }


    modalInformacoes.classList.add(
        "ativa"
    );


    document.body.classList.add(
        "modal-open"
    );


    const caixa =
        modalInformacoes.querySelector(
            ".informacoes-box"
        );


    if (caixa) {

        caixa.scrollTop = 0;

    }

}


function fecharModalInformacoes() {

    if (!modalInformacoes) {
        return;
    }


    modalInformacoes.classList.remove(
        "ativa"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


if (btnQueroInformacoes) {

    btnQueroInformacoes.addEventListener(
        "click",
        event => {

            event.preventDefault();

            abrirModalInformacoes();

        }
    );

}


if (btnFecharInformacoes) {

    btnFecharInformacoes.addEventListener(
        "click",
        fecharModalInformacoes
    );

}


if (modalInformacoes) {

    modalInformacoes.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                modalInformacoes
            ) {

                fecharModalInformacoes();

            }

        }
    );

}



/* =========================================
   BOTÃO DO MODAL -> CONTATO
========================================= */

if (btnInformacoesContato) {

    btnInformacoesContato.addEventListener(
        "click",
        () => {

            fecharModalInformacoes();


            setTimeout(() => {

                const contato =
                    document.getElementById(
                        "contato"
                    );


                if (contato) {

                    contato.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }, 250);

        }
    );

}



/* =========================================
   MODAL DE CONFIRMAÇÃO
========================================= */

const modalConfirmacao =
    document.getElementById(
        "modalConfirmacao"
    );


const btnFecharConfirmacao =
    document.getElementById(
        "btnFecharConfirmacao"
    );


function abrirModalConfirmacao() {

    if (!modalConfirmacao) {
        return;
    }


    modalConfirmacao.classList.add(
        "ativa"
    );


    document.body.classList.add(
        "modal-open"
    );

}


function fecharModalConfirmacao() {

    if (!modalConfirmacao) {
        return;
    }


    modalConfirmacao.classList.remove(
        "ativa"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


if (btnFecharConfirmacao) {

    btnFecharConfirmacao.addEventListener(
        "click",
        fecharModalConfirmacao
    );

}


if (modalConfirmacao) {

    modalConfirmacao.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                modalConfirmacao
            ) {

                fecharModalConfirmacao();

            }

        }
    );

}



/* =========================================
   FORMULÁRIO
========================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


const nomeInput =
    document.getElementById(
        "nome"
    );


const emailInput =
    document.getElementById(
        "email"
    );


const telefoneInput =
    document.getElementById(
        "telefone"
    );


const assuntoInput =
    document.getElementById(
        "assunto"
    );


const mensagemInput =
    document.getElementById(
        "mensagem"
    );


const btnEnviarMensagem =
    document.getElementById(
        "btnEnviarMensagem"
    );



/* =========================================
   MOSTRAR ERRO
========================================= */

function mostrarErro(
    input,
    mensagem
) {

    if (!input) {
        return false;
    }


    input.classList.add(
        "input-error"
    );


    const grupo =
        input.closest(
            ".form-group"
        );


    if (grupo) {

        const erro =
            grupo.querySelector(
                ".form-error"
            );


        if (erro) {

            erro.textContent =
                mensagem;

        }

    }


    return false;

}



/* =========================================
   LIMPAR ERRO
========================================= */

function limparErro(input) {

    if (!input) {
        return;
    }


    input.classList.remove(
        "input-error"
    );


    const grupo =
        input.closest(
            ".form-group"
        );


    if (grupo) {

        const erro =
            grupo.querySelector(
                ".form-error"
            );


        if (erro) {

            erro.textContent = "";

        }

    }

}


function limparTodosErros() {

    if (!contactForm) {
        return;
    }


    const inputs =
        contactForm.querySelectorAll(
            "input, textarea"
        );


    inputs.forEach(
        limparErro
    );

}



/* =========================================
   VALIDAÇÃO DE EMAIL
========================================= */

function emailValido(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}



/* =========================================
   TELEFONE
========================================= */

function apenasNumeros(valor) {

    return valor.replace(
        /\D/g,
        ""
    );

}


function formatarTelefone(valor) {

    let numero =
        apenasNumeros(valor);


    if (numero.length > 11) {

        numero =
            numero.substring(
                0,
                11
            );

    }


    if (numero.length <= 2) {

        return numero;

    }


    if (numero.length <= 7) {

        return (
            "(" +
            numero.substring(0, 2) +
            ") " +
            numero.substring(2)
        );

    }


    return (
        "(" +
        numero.substring(0, 2) +
        ") " +
        numero.substring(2, 7) +
        "-" +
        numero.substring(7)
    );

}



/* =========================================
   INPUT DO TELEFONE
========================================= */

if (telefoneInput) {

    telefoneInput.addEventListener(
        "input",
        event => {

            event.target.value =
                formatarTelefone(
                    event.target.value
                );


            limparErro(
                telefoneInput
            );

        }
    );


    telefoneInput.addEventListener(
        "keydown",
        event => {

            const teclasPermitidas = [
                "Backspace",
                "Delete",
                "ArrowLeft",
                "ArrowRight",
                "Tab",
                "Home",
                "End"
            ];


            if (
                teclasPermitidas.includes(
                    event.key
                )
            ) {

                return;

            }


            if (
                !/^\d$/.test(
                    event.key
                )
            ) {

                event.preventDefault();

            }

        }
    );

}



/* =========================================
   LIMPAR ERRO AO DIGITAR
========================================= */

[
    nomeInput,
    emailInput,
    telefoneInput,
    assuntoInput,
    mensagemInput

].forEach(input => {

    if (!input) {
        return;
    }


    input.addEventListener(
        "input",
        () => {

            limparErro(input);

        }
    );

});



/* =========================================
   ENTER -> PRÓXIMO CAMPO
========================================= */

const camposFormulario = [

    nomeInput,
    emailInput,
    telefoneInput,
    assuntoInput,
    mensagemInput

].filter(Boolean);


camposFormulario.forEach(
    (campo, index) => {

        campo.addEventListener(
            "keydown",
            event => {

                if (
                    event.key !==
                    "Enter"
                ) {

                    return;

                }


                if (
                    campo.tagName.toLowerCase() ===
                    "textarea"
                ) {

                    if (!event.shiftKey) {

                        event.preventDefault();

                        const proximo =
                            camposFormulario[
                                index + 1
                            ];


                        if (proximo) {

                            proximo.focus();

                        } else if (
                            btnEnviarMensagem
                        ) {

                            btnEnviarMensagem.focus();

                        }

                    }

                    return;

                }


                event.preventDefault();


                const proximo =
                    camposFormulario[
                        index + 1
                    ];


                if (proximo) {

                    proximo.focus();

                } else if (
                    btnEnviarMensagem
                ) {

                    btnEnviarMensagem.focus();

                }

            }
        );

    }
);



/* =========================================
   VALIDAÇÃO DO FORMULÁRIO
========================================= */

function validarFormulario() {

    let valido = true;


    limparTodosErros();


    if (
        !nomeInput.value.trim()
    ) {

        mostrarErro(
            nomeInput,
            "Digite seu nome."
        );

        valido = false;

    } else if (
        nomeInput.value.trim().length < 2
    ) {

        mostrarErro(
            nomeInput,
            "Digite seu nome completo."
        );

        valido = false;

    }


    const email =
        emailInput.value.trim();


    if (!email) {

        mostrarErro(
            emailInput,
            "Digite seu e-mail."
        );

        valido = false;

    } else if (
        !emailValido(email)
    ) {

        mostrarErro(
            emailInput,
            "Digite um e-mail válido com @."
        );

        valido = false;

    }


    const telefone =
        apenasNumeros(
            telefoneInput.value
        );


    if (!telefone) {

        mostrarErro(
            telefoneInput,
            "Digite seu telefone."
        );

        valido = false;

    } else if (
        telefone.length < 10
    ) {

        mostrarErro(
            telefoneInput,
            "Digite um telefone válido."
        );

        valido = false;

    }


    if (
        !assuntoInput.value.trim()
    ) {

        mostrarErro(
            assuntoInput,
            "Digite o assunto."
        );

        valido = false;

    }


    if (
        !mensagemInput.value.trim()
    ) {

        mostrarErro(
            mensagemInput,
            "Digite sua mensagem."
        );

        valido = false;

    } else if (
        mensagemInput.value.trim().length < 10
    ) {

        mostrarErro(
            mensagemInput,
            "Escreva uma mensagem um pouco mais detalhada."
        );

        valido = false;

    }


    return valido;

}



/* =========================================
   ENVIO DO FORMULÁRIO
========================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const formularioValido =
                validarFormulario();


            if (!formularioValido) {

                const primeiroErro =
                    contactForm.querySelector(
                        ".input-error"
                    );


                if (primeiroErro) {

                    primeiroErro.focus();

                }


                return;

            }


            if (btnEnviarMensagem) {

                btnEnviarMensagem.disabled =
                    true;


                const texto =
                    btnEnviarMensagem.querySelector(
                        ".button-text"
                    );


                const loading =
                    btnEnviarMensagem.querySelector(
                        ".button-loading"
                    );


                if (texto) {

                    texto.style.display =
                        "none";

                }


                if (loading) {

                    loading.style.display =
                        "inline-flex";

                    loading.style.alignItems =
                        "center";

                    loading.style.justifyContent =
                        "center";

                    loading.style.gap =
                        "8px";

                }

            }


            try {

                const resposta =
                    await fetch(
                        "https://formsubmit.co/ajax/GeneSysEmpresaCT@gmail.com",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json",
                                "Accept":
                                    "application/json"
                            },
                            body: JSON.stringify({
                                nome: nomeInput.value.trim(),
                                email: emailInput.value.trim(),
                                telefone: telefoneInput.value.trim(),
                                assunto: assuntoInput.value.trim(),
                                mensagem: mensagemInput.value.trim(),
                                _subject: "Novo contato pelo site GeneSys",
                                _template: "table",
                                _captcha: "true"
                            })
                        }
                    );


                const resultado =
                    await resposta.json();


                if (!resposta.ok || !resultado.success) {

                    throw new Error(
                        "Não foi possível enviar a mensagem."
                    );

                }


                if (btnEnviarMensagem) {

                    btnEnviarMensagem.disabled =
                        false;


                    const texto =
                        btnEnviarMensagem.querySelector(
                            ".button-text"
                        );


                    const loading =
                        btnEnviarMensagem.querySelector(
                            ".button-loading"
                        );


                    if (texto) {

                        texto.style.display =
                            "inline";

                    }


                    if (loading) {

                        loading.style.display =
                            "none";

                    }

                }


                contactForm.reset();


                abrirModalConfirmacao();

            } catch (erro) {

                console.error(
                    "Erro ao enviar formulário:",
                    erro
                );


                if (btnEnviarMensagem) {

                    btnEnviarMensagem.disabled =
                        false;


                    const texto =
                        btnEnviarMensagem.querySelector(
                            ".button-text"
                        );


                    const loading =
                        btnEnviarMensagem.querySelector(
                            ".button-loading"
                        );


                    if (texto) {

                        texto.style.display =
                            "inline";

                    }


                    if (loading) {

                        loading.style.display =
                            "none";

                    }

                }


                alert(
                    "Não foi possível enviar sua mensagem. Tente novamente."
                );

            }

        }
    );

}



/* =========================================
   ESC FECHA QUALQUER MODAL
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


        if (
            modalInformacoes &&
            modalInformacoes.classList.contains(
                "ativa"
            )
        ) {

            fecharModalInformacoes();

            return;

        }


        if (
            modalConfirmacao &&
            modalConfirmacao.classList.contains(
                "ativa"
            )
        ) {

            fecharModalConfirmacao();

        }

    }
);