# Ticket Bot
- Um bot de suporte feito usando threads para o Discord, 100% customizável, feito em JavaScript e inspirado no Rio Helper do servidor [Elixir Lab](https://discord.gg/elixirlab) e na [Loritta Helper](https://discord.gg/loritta).
- Bot feito para o servidor [__Gacha Community__](https://discord.gg/xVuWayRuqt).
# Instalação
- Clone o repositório do GitHub:
    `git clone https://github.com/andrelucaas/ticket-bot.git`
- Entre no diretório do bot:
    `cd ticket-bot`
- Instale o NodeJS:
### Windows:
- Basta executar o instalador disponível no site do node: https://nodejs.org/en/
### Linux: (Ubuntu)
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
    nvm install 16
    nvm use 16
- Instale o Yarn:
    `npm install yarn -g`
- Adicione seu bot no seu servidor com este link:
    `https://discordapp.com/api/oauth2/authorize?client_id=ID_DO_BOT&permissions=8395136994304&scope=bot%20applications.commands`
# Configurando o BOT
- Entre no diretório do bot:
    `cd ticket-bot`
- Abra o arquivo `config.example.json` e edite o seguinte:
```js
{
    "token": "TOKEN DO BOT AQUI", // Insira o TOKEN do seu bot
    "publicThreadDelete": true, // Se o bot deve deletar as mensagens de notificação que a thread foi criada em threads públicas
    "fecharTicket": "✅ Ticket fechado com sucesso, obrigado por entrar em contato.", // Mensagem exibida ao fechar um ticket
    "commandName": "fecharticket", // Nome do comando que o bot deve usar para fechar um ticket
    "ticket": {
        /* Configurações do botão de ticket */
        "enabled": "true", // Se você quer que o botão de abertura de ticket esteja ativo
        "label": "Abrir Ticket", // O texto que aparecerá no botão
        "style": "PRIMARY", // O estilo do botão, que no caso é as cores, consulte elas abaixo:
        /*
        = ESTILOS/CORES =
        PRIMARY: Azul
        SECONDARY: Cinza
        SUCCESS: Verde
        DANGER: Vermelho
        */
        "emoji": "➕", // O emoji que aparecerá no botão
        "reply": "📩  | {{userMention}} ticket criado! Envie todas as informações possíveis sobre seu caso e aguarde até que um {{supportRole}} responda.\nApós a sua questão ser sanada, você pode usar `/{{commandName}}` para encerrar o atendimento!", // A mensagem enviada na thread quando criada, você pode usar alguns parralex:
        /*
        = PARRALEX =
        {{userMention}}: Menciona o usuário que criou o ticket
        {{supportRole}}: Menciona o cargo de suporte
        */
        "threadType": "private" // O tipo de thread que o botão de ticket criará, pode ser `private` ou `public`, se seu servidor tiver nível 2 de impulsionamento, fortemente recomendo private.
    },
    "selectMenus": [
        /* Aqui são as opções de ticket que apareçeram ao clicar no select menu do botão de ticket */
        {
            "label": "Suporte", // O texto que aparecerá no select menu
            "description": "Peça ajuda sobre os mais variados assuntos do servidor com nossa equipe.", // A descrição que aparecerá no select menu
            "emoji": "💬", // O emoji que aparecerá no select menu
            "value": "support", // O valor, isso não importa muito par que o ticket funcione, pode por qualquer coisa.
            "response": "Se precisar de ajuda, crie um ticket abaixo e nós iremos te ajudar o mais rápido possível." // A mensagem ephemeral que aparecerá juntamente com o botão de ticket
        }
        /* Tem outros exemplos no config.example.json */
    ],
    "ticketEmbed": {
        /* Configurações do embed do ticket */
        "title": "Central de Ajuda | Nome do seu servidor",  // Aqui fica o título da embed.
        "description": "Nessa seção, você pode tirar suas dúvidas ou entrar em contato diretamente com a nossa equipe do Nome do seu servidor.", // Aqui fica a descrição da embed.
        "banner": "https://i.imgur.com/QbpUcOa.png", // Aqui fica a imagem que aparece na embed, você pode substituir.
        "footer": "Se não tiver uma categoria específica para seu problema, entre em contato com a nossa equipe com a categoria de Suporte.", // Aqui fica a mensagem que será exibida no footer da embed.
        "color": "BLUE", // A cor da embed, você pode por tanto um cor hexadecimal, ou uma cor em inglês.
        "credits": true, // Se você deseja dar créditos pra mim, se deixar ativado agradeço de coração, porém não é obrigado ❤️
        "footerIcon": {
            "enabled": true, // Se você deseja que o ícone do footer apareça, se deixar ativado = true e desativar = false.
            "url": "https://i.imgur.com/a6eY6fd.png" // O Link do ícone do footer
        }
    },
    "ticketChannel": "973592012680990800", // O Canal que será enviado o ticket
    "supportRole": "973591097613906071" // E por fim o cargo de suporte
}
```
- Renomeie o arquivo para `config.json` e salve
# Inciando o BOT
- Entre no diretório do bot:
    `cd ticket-bot`
- Instale as depêndencias:
    `yarn install`
- Abra o terminal e execute:
    `yarn start`
# 🐦 Github Status
<p align="center">
<a href="https://nodejs.org/en/download/"><img src="https://img.shields.io/badge/Node.JS-43853D.svg?style=for-the-badge&amp;logo=node.js&amp;logoColor=white" alt="Node Version"></a> <a href="https://github.com/andrelucaas/ThreadTickets/issues"><img src="https://img.shields.io/github/issues/andrelucaas/ThreadTickets?style=for-the-badge&amp;color=green" alt="Issues"></a> <a href="https://github.com/andrelucaas/ThreadTickets/pulls"><img src="https://img.shields.io/github/issues-pr/andrelucaas/ThreadTickets?style=for-the-badge&amp;color=green" alt=""></a>
<h2 id="-stargazers-">✨ Stargazers:</h2>
<p><a href="https://github.com/andrelucaas/ThreadTickets/stargazers"><img src="https://reporoster.com/stars/andrelucaas/ThreadTickets" alt="Stargazers"></a></p>
<h2 id="-forkers-">✨ Forkers:</h2>
<p><a href="https://github.com/andrelucaas/ThreadTickets/network/members"><img src="https://reporoster.com/forks/andrelucaas/ThreadTickets" alt="Forkers"></a></p>
</p>