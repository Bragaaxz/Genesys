# E-mail pelo Live Server

O formulário da GeneSys foi configurado para enviar via AJAX para `GeneSysEmpresaCT@gmail.com`, sem Netlify e sem backend local.

## Teste
1. Abra o projeto no VS Code.
2. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.
3. Preencha o formulário e envie.
4. Na primeira utilização, o serviço de formulário pode pedir uma confirmação enviada ao e-mail de destino. Faça essa confirmação uma vez.
5. Depois, os envios serão encaminhados para `GeneSysEmpresaCT@gmail.com`.

O campo de e-mail do visitante é enviado como Reply-To, facilitando responder diretamente ao remetente.

O Live Server apenas hospeda a página localmente; ele não possui um servidor de e-mail próprio. O encaminhamento é realizado pelo serviço de formulário via AJAX.
