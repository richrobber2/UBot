
const { Command } = require("discord.js-commando");

class PurgeCommand extends Command {
  constructor(client) {
    super (client, {
      name: "purge",
      aliases: ["msgclean"],
      group: "moderation",
      memberName: "purge",
      userPermissions: ["MANAGE_MESSAGES"],
      description: "purge messages",
      guildOnly: true
      
    });
  }
  async run(msg) { 
    const Discord = require("discord.js")
    const user = msg.mentions.users.first();
    // Parse Amount
    const amount = parseInt(msg.content.split(" ")[1]) ? parseInt(msg.content.split(" ")[1]) : parseInt(msg.content.split(" ")[2]);
    if (!amount) return msg.reply("Must specify an amount to delete!");
    if (!amount && !user) return msg.reply("Must specify a user and amount, or just an amount, of messages to purge!");
    // Fetch 100 messages (will be filtered and lowered up to max amount requested)
    msg.channel.fetchMessages({
      limit: amount,
    }).then((messages) => {
      if (user) {
        const filterBy = user ? user.id : msg.client.user.id;
        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
      }
      msg.channel.bulkDelete(messages).catch(error => console.log(error.stack));
      const incidentschannel = msg.guild.channels.find(c => c.name === "ubot-logs");
      if (!incidentschannel) return msg.channel.send("Couldn't find ubot-logs channel.");
      if (incidentschannel) {
        const purgeEmbed = new Discord.RichEmbed()
            .setDescription("A user has purged messages")
            .setThumbnail(msg.author.avatarURL)
            .setColor("#15f153")
            .addField("User", `${msg.author} with ID: ${msg.author.id}`)
            .addField("Amount", amount)
            .addField("Channel", msg.channel)
        incidentschannel.send(purgeEmbed);
      }
    });
  }
}
module.exports = PurgeCommand;


