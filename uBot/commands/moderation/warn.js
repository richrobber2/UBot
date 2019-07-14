
const { Command } = require("discord.js-commando");
var Discord = require("discord.js");

class WarnCommand extends Command {
  constructor(client) {
    super (client, {
      name: "warn",
      aliases: [],
      group: "moderation",
      memberName: "warn",
      description: "Warn a person in the guild.",
      userPermissions: ["KICK_MEMBERS"],
      guildOnly: true,
      args: [{
        key: "member",
        label: "user",
        type: "member",
        prompt: "Who do you want me to warn?"
      },
      {
        key: "reason",
        type: "string",
        prompt: "Why do you want me to warn them?"
      }]
    });
  }
  async run(msg, { member, reason}) {
    if (member) {    
      if (member || reason) {
        let executo = msg.author.id;
        let execut = msg.guild.members.get(executo);
        let highrolea = execut.highestRole.position;
        let highrolem = member.highestRole.position;
        if (highrolea < highrolem) return msg.reply("You can't warn someone with a higher role than yours...");
        const warnembed = new Discord.RichEmbed()
          .setDescription("You have been warned!")
          .setThumbnail(member.avatarURL)
          .setColor("#15f153")
          .addField("Server you were warned in", msg.guild.name)
          .addField("Reason of warn", reason);
        await member.send(warnembed);
        msg.channel.send({embed: {
          color: 3447003,
          title: ":white_check_mark:",
          description: "User has been warned!",
          footer: "Command handled by UBot | Command initiated by ${msg.author}"
        }
      });
        const incidentschannel = msg.guild.channels.find(c => c.name === "ubot-logs");
        if (!incidentschannel) return msg.channel.send("Couldn't find ubot-logs channel.");
        if (incidentschannel) {
          const warnEmbed2 = new Discord.RichEmbed()
            .setDescription("A user has been warned")
            .setThumbnail(member.avatarURL)
            .setColor("#15f153")
            .addField("User who was warned", `${member} with ID: ${member.id}`)
            .addField("Warned by user", `${msg.author} with ID: ${msg.author.id}`)
            .addField("Time the user was warned at", msg.createdAt)
            .addField("Reason of warn", reason);
          incidentschannel.send(warnEmbed2);
        }
      }
    }
  }
}
module.exports = WarnCommand;