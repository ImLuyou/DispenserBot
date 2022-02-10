const { Client, Intents, Discord } = require('discord.js');

const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_PRESENCES, 
    Intents.FLAGS.GUILD_MEMBERS 
  ] 
});

require('dotenv').config({path:'./.env'});

const prefix = `$`;

process.setMaxListeners(0);

client.on("guildMemberUpdate", (oldMember, newMember) => {
  let channel = client.channels.cache.get('936185869390446602');
  let isPatron = null;

  if (newMember.roles.cache.has('937986739300089897') || newMember.roles.cache.has('937993971832086598')) {
    isPatron = true;
  } else if (
    (oldMember.roles.cache.has('937986739300089897') || newMember.roles.cache.has('937993971832086598')) 
    &&
    !(newMember.roles.cache.has('937986739300089897') || newMember.roles.cache.has('937993971832086598'))
  ) {
    isPatron = false;
  }

  if (isPatron !== null) {
    channel.send(
      (isPatron ? 
        `say §LTenemos un nuevo §9§L[Patron/a] §f§Lmandando en el server` :
        `say §fUn §9[Patron/a] §fa dejado su poder`
      )
    );
  }
});

client.on("messageCreate", async function (messageCreate) {
  let message = messageCreate;

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  
  // get channel id and command out of message
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  switch(command) {
    case 'test':
      message.reply({
        content: '¿Qué quieres puto?, Deja dormir :A'
      });
    break;

    case 'twitch-sync':
      //let list = client.guilds.fetch('492483232244170753');
      let server = message.guild.id;
      let countSubs = 0;

      // 
      let guild = client.guilds.cache.get('492483232244170753');
      let TrackTSubRole = guild.roles.cache.get('938718772594880513');
      let TwitchRole = guild.roles.cache.get('940489231539777607');

      guild.members.cache.forEach((member) => {
        if (!message.member.roles.cache.has('940489231539777607')) {
          try {
            member.roles.remove(TwitchRole);
          } catch(e) {}
        }
      });

      // Getting user by role TwitchSub role
      let list = guild.roles.cache.get('940489231539777607').members.map(m => m);

      list.forEach((user, index) => {
        countSubs++;
        user.roles.add(TrackTSubRole);
      });

      message.reply(`Pude contar: ${countSubs} subscriptores`);
      
    break;

    default:
      message.reply('No conozco ese comando');
    break;
  }
});

client.login(process.env.BOT_TOKEN);