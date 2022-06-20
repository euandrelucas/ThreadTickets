require('colors')
const { Client, MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require('discord.js')
const config = require('./Config/config.json')
const client = new Client({
  intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING']
})

client.db = new (require('./botDatabase'))('./Data/banco.json')

client.on('ready', async () => {
  console.log('[BOT] Estou pronto para ser usado!'.green)
  client.application.commands.create({
    name: config.commandName,
    description: 'Feche o ticket com esse comando.'
  })
  const lastMessage = await client.db.get('lastMessage')
  const channel = await client.channels.cache.get(config.ticketChannel)
  if (lastMessage) {
    const message = await channel.messages.fetch(lastMessage)
    const row = new MessageActionRow()
    const selectMenu = new MessageSelectMenu()
    selectMenu.setCustomId('tickets')
    selectMenu.setPlaceholder('Selecione uma opção...')
    const options = []
    config.selectMenus.forEach(menu => {
      options.push({
        label: menu.label,
        description: menu.description,
        value: menu.value,
        emoji: menu.emoji
      })
    })
    selectMenu.addOptions(options)
    row.addComponents(
      selectMenu
    )
    const embed = new MessageEmbed()
    embed.setTitle(config.ticketEmbed.title)
    embed.setDescription(config.ticketEmbed.description)
    embed.setColor(config.ticketEmbed.color)
    embed.setImage(config.ticketEmbed.banner)
    if (config.ticketEmbed.credits) {
      const botOwner = await client.users.fetch('717766639260532826')
      if (config.ticketEmbed.footerIcon.enabled) {
        embed.setFooter({
          text: `⤷ Bot Feito por: ${botOwner.tag} (${botOwner.id}) | ${config.ticketEmbed.footer}`,
          iconURL: config.ticketEmbed.footerIcon.url
        })
      } else {
        embed.setFooter({
          text: `⤷ Bot Feito por: ${botOwner.tag} (${botOwner.id}) | ${config.ticketEmbed.footer}`
        })
      }
    } else if (config.ticketEmbed.footerIcon.enabled) {
      embed.setFooter({
        text: config.ticketEmbed.footer,
        iconURL: config.ticketEmbed.footerIcon.url
      })
    } else {
      embed.setFooter({
        text: config.ticketEmbed.footer,
        iconURL: config.ticketEmbed.footerIcon.url
      })
    }
    await message.edit({
      embeds: [embed],
      components: [row]
    }).then(async (msg) => {
      await client.db.set('lastMessage', msg.id)
    })
  } else {
    const row = new MessageActionRow()
    const selectMenu = new MessageSelectMenu()
    selectMenu.setCustomId('tickets')
    selectMenu.setPlaceholder('Selecione uma opção...')
    const options = []
    config.selectMenus.forEach(menu => {
      options.push({
        label: menu.label,
        description: menu.description,
        value: menu.value,
        emoji: menu.emoji
      })
    })
    selectMenu.addOptions(options)
    row.addComponents(
      selectMenu
    )
    const embed = new MessageEmbed()
    embed.setTitle(config.ticketEmbed.title)
    embed.setDescription(config.ticketEmbed.description)
    embed.setColor(config.ticketEmbed.color)
    embed.setImage(config.ticketEmbed.banner)
    if (config.ticketEmbed.credits) {
      const botOwner = await client.users.fetch('717766639260532826')
      if (config.ticketEmbed.footerIcon.enabled) {
        embed.setFooter({
          text: `⤷ Bot Feito por: ${botOwner.tag} (${botOwner.id}) | ${config.ticketEmbed.footer}`,
          iconURL: config.ticketEmbed.footerIcon.url
        })
      } else {
        embed.setFooter({
          text: `⤷ Bot Feito por: ${botOwner.tag} (${botOwner.id}) | ${config.ticketEmbed.footer}`
        })
      }
    } else if (config.ticketEmbed.footerIcon.enabled) {
      embed.setFooter({
        text: config.ticketEmbed.footer,
        iconURL: config.ticketEmbed.footerIcon.url
      })
    } else {
      embed.setFooter({
        text: config.ticketEmbed.footer,
        iconURL: config.ticketEmbed.footerIcon.url
      })
    }
    await channel.send({
      embeds: [embed],
      components: [row]
    }).then(async (msg) => {
      await client.db.set('lastMessage', msg.id)
    })
  }
})

client.on('interactionCreate', async interaction => {
  if (interaction.isCommand()) {
    if (interaction.commandName === 'fecharticket') {
      interaction.channel.edit({
        archived: true,
        locked: true,
        invitable: false
      })
      interaction.reply({
        content: config.fecharTicket
      })
    }
  }
  if (interaction.isButton()) {
    if (config.ticket.threadType === 'private') {
      await interaction.channel.threads.create({
        name: `${interaction.customId.replace('create-', '')} ${interaction.user.username} (${interaction.user.id})`,
        autoArchiveDuration: 10080,
        type: 'GUILD_PRIVATE_THREAD',
        reason: `Criei um ticket para o usuário: ${interaction.user.tag} (${interaction.user.id})`
      }).then((ticket) => {
        ticket.send(config.ticket.reply.replace(/{{userMention}}/g, interaction.user).replace(/{{supportRole}}/g, `<@&${config.supportRole}>`).replace(/{{commandName}}/g, config.commandName))
      })
    } else {
      await interaction.channel.threads.create({
        name: `${interaction.customId.replace('create-', '')} ${interaction.user.username} (${interaction.user.id})`,
        autoArchiveDuration: 10080,
        reason: `Criei um ticket para o usuário: ${interaction.user.tag} (${interaction.user.id})`
      }).then((ticket) => {
        ticket.send(config.ticket.reply.replace(/{{userMention}}/g, interaction.user).replace(/{{supportRole}}/g, `<@&${config.supportRole}>`).replace(/{{commandName}}/g, config.commandName))
      })
    }
  }
  if (interaction.isSelectMenu()) {
    const value = config.selectMenus.find(menu => menu.value === interaction.values[0])
    if (config.ticket.enabled) {
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('create-' + value.emoji)
            .setLabel(config.ticket.label)
            .setEmoji(config.ticket.emoji)
            .setStyle(config.ticket.style)
        )
      await interaction.reply({
        content: value.response,
        ephemeral: true,
        components: [row]
      })
    }
  }
})

client.on('messageCreate', async message => {
  if (message.type !== 'THREAD_CREATED') return
  if (config.publicThreadDelete) {
    if (message.channel.id === config.ticketChannel) {
      message.delete()
    }
  }
})

client.login(config.token)
