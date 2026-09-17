const RESEND_API_URL = "https://api.resend.com/emails";
const RECIPIENT_EMAIL = "GeneSysEmpresaCT@gmail.com";

function jsonResponse(statusCode, body) {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "POST, OPTIONS"
        },
        body: JSON.stringify(body)
    };
}

exports.handler = async event => {
    if (event.httpMethod === "OPTIONS") {
        return jsonResponse(204, {});
    }

    if (event.httpMethod !== "POST") {
        return jsonResponse(405, { error: "Método não permitido." });
    }

    if (!process.env.RESEND_API_KEY) {
        console.error("A variável RESEND_API_KEY não foi configurada no Netlify.");
        return jsonResponse(500, { error: "O serviço de e-mail ainda não está configurado." });
    }

    let data;

    try {
        data = JSON.parse(event.body || "{}");
    } catch {
        return jsonResponse(400, { error: "Dados inválidos." });
    }

    if (data.website) {
        return jsonResponse(200, { success: true });
    }

    const nome = String(data.nome || "").trim();
    const email = String(data.email || "").trim();
    const telefone = String(data.telefone || "").trim();
    const assunto = String(data.assunto || "").trim();
    const mensagem = String(data.mensagem || "").trim();

    if (!nome || !email || !telefone || !assunto || !mensagem) {
        return jsonResponse(400, { error: "Preencha todos os campos obrigatórios." });
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
        return jsonResponse(400, { error: "Informe um e-mail válido." });
    }

    const remetente = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const response = await fetch(RESEND_API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            from: remetente,
            to: [RECIPIENT_EMAIL],
            reply_to: email,
            subject: `[Site GeneSys] ${assunto}`,
            text: [
                `Nome: ${nome}`,
                `E-mail: ${email}`,
                `Telefone: ${telefone}`,
                `Assunto: ${assunto}`,
                "",
                mensagem
            ].join("\n")
        })
    });

    if (!response.ok) {
        const detalhe = await response.text();
        console.error("Erro retornado pelo Resend:", detalhe);
        return jsonResponse(502, { error: "Não foi possível enviar a mensagem agora." });
    }

    return jsonResponse(200, { success: true });
};
