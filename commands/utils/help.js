'use strict';

const Command = require("../../structure/Command.js");

/*
  * Copyright 2020 © LordAlex2015
  * See LICENSE file
 */
class Help extends Command {
    constructor() {
        super({
            name: 'help',
            category: 'utils',
            description: 'This command is here to help you!',
            usage: 'help [commande]',
            example: ['help', 'help ping'],
            aliases: ['h', 'aide']
        });
    }

    /*
      * Copyright 2020 © LordAlex2015
      * See LICENSE file
     */
    async run(client, message, args) {
        if (!args[1]) {
            await message.channel.send({
                embed: {
                    color: client.maincolor,
                    title: `Commands of ${client.user.username}`,
                    thumbnail: {
                        url: 'https://i.ibb.co/8KYCKJd/info.png'
                    },
                    description: `Do !help [Command Name] for more informations!`,
                    fields: [
                        {
                            name: "❱ Informations",
                            value: client.commands.filter((command) => command.category === "utils").map((command) => `\`${command.name}\``).join(', '),
                            inline: true,
                        }
                    ],
                    footer: {
                        text: client.footer
                    },

                }
            })
        } else if (args[1]) {
            /*
              * Copyright 2020 © LordAlex2015
              * See LICENSE file
             */
            const command = client.commands.find(cmd => cmd.aliases.includes(args[1])) || client.commands.get(args[1]);
            if (!command) return message.channel.send(`This command is invalid`);
            let send = "";
            command.example.forEach(use => {
                send += '!' + use + '\n'
            })
            await message.channel.send({
                embed: {
                    color: client.maincolor,
                    author: {
                        name: `Help: Command ` + args[1],
                        icon_url: message.author.displayAvatarURL()
                    },
                    description: ` <> are required arguments\nAnd [] are optionnal arguments`,
                    footer: {
                        icon_url: client.user.displayAvatarURL(),
                        text: client.user.username
                    },
                    fields: [
                        {
                            name: "Description",
                            value: !command.description ? 'No description' : command.description,
                        },
                        {
                            name: "Usage",
                            value: !command.usage ? "No usage" : '!' + command.usage,
                        },
                        {
                            name: "Examples",
                            value: !command.example ? `No examples` : send,
                        },
                        {
                            name: "Rquired Permissions",
                            value: command.perms,
                        }]
                }
            })
        }
    }
}
/*
  * Copyright 2020 © LordAlex2015
  * See LICENSE file
 */

module.exports = new Help;