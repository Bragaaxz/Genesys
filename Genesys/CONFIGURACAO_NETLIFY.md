# CONFIGURAÇÃO FINAL — GENESYS

## E-mail de destino

GeneSysEmpresaCT@gmail.com

## Como funciona

### No Live Server
O formulário continua funcionando pelo Live Server usando o envio externo configurado no projeto.

### No Netlify
O projeto também possui uma função própria:

`netlify/functions/send-email.js`

Ela envia as mensagens para:

`GeneSysEmpresaCT@gmail.com`

## Variáveis no Netlify

Em:

Site configuration → Environment variables

adicione:

RESEND_API_KEY = sua chave do Resend
CONTACT_EMAIL = GeneSysEmpresaCT@gmail.com
FROM_EMAIL = Genesys <onboarding@resend.dev>

## Importante

Nunca coloque RESEND_API_KEY dentro do JavaScript do navegador.

Para produção, é recomendado verificar seu domínio no Resend e usar um remetente do seu próprio domínio.

## Deploy

Publique a pasta do projeto no Netlify. O `netlify.toml` já informa que as funções estão em:

`netlify/functions`

Depois do deploy, o formulário poderá enviar para o e-mail configurado.

## Estrutura final

Genesys/
├── netlify.toml
├── .env.example
├── CONFIGURACAO_NETLIFY.md
├── netlify/
│   └── functions/
│       └── send-email.js
└── arquivos originais do projeto
