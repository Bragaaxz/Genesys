const response = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  },
  body: JSON.stringify(body)
});

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return response(204, {});

  if (event.httpMethod !== "POST") {
    return response(405, { error: "Método não permitido." });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    return response(500, {
      error: "Configure RESEND_API_KEY e CONTACT_EMAIL no Netlify."
    });
  }

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return response(400, { error: "Dados inválidos." });
  }

  const nome = String(data.nome || "").trim();
  const email = String(data.email || "").trim();
  const telefone = String(data.telefone || "").trim();
  const assunto = String(data.assunto || "").trim();
  const mensagem = String(data.mensagem || "").trim();

  if (!nome || !email || !assunto || !mensagem) {
    return response(400, { error: "Preencha os campos obrigatórios." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return response(400, { error: "E-mail inválido." });
  }

  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL || "Genesys <onboarding@resend.dev>",
        to: [process.env.CONTACT_EMAIL],
        reply_to: email,
        subject: `Contato pelo site: ${assunto}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6">
            <h2>Nova mensagem pelo site Genesys</h2>
            <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
            <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
            <p><strong>Telefone:</strong> ${escapeHtml(telefone || "Não informado")}</p>
            <p><strong>Assunto:</strong> ${escapeHtml(assunto)}</p>
            <hr>
            <p><strong>Mensagem:</strong></p>
            <p style="white-space:pre-wrap">${escapeHtml(mensagem)}</p>
          </div>
        `
      })
    });

    const resultData = await result.json().catch(() => ({}));

    if (!result.ok) {
      console.error(resultData);
      return response(502, { error: "Falha ao enviar o e-mail." });
    }

    return response(200, {
      success: true,
      message: "Mensagem enviada com sucesso!"
    });
  } catch (error) {
    console.error(error);
    return response(500, { error: "Erro no serviço de e-mail." });
  }
};
