const rpc = require('./js/libs/discord-rpc')

const clientId = '1072330351940218960';
const scopes = ['rpc', 'rpc.api', 'messages.read'];

const clientDiscord = new rpc.Client({ transport: 'ipc' });



// Log in to RPC with client id
clientDiscord.login({ clientId, scopes });
clientDiscord.intialTimeStamp = Date.now()
clientDiscord.on('ready', () => {
    console.log('Logged in as', clientDiscord.application.name);
    console.log('Authed for user', clientDiscord.user.username);
  
    clientDiscord.selectVoiceChannel('81384788862181376');
  });

let _rei_Scene_Base_create = Scene_Base.prototype.create
//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Base.prototype.create = function () {
    _rei_Scene_Base_create.call(this, ...arguments);
    this.callDiscordRPC();
}

//-----------------------------------------------------------------------------
// Function : create
//-----------------------------------------------------------------------------
Scene_Base.prototype.callDiscordRPC = function () {
    if (this instanceof Scene_Main_Menu) {
        clientDiscord.setActivity({
            details: `Kamigami: Spirits of the Nature`,
            state: 'In Main Menu',
            startTimestamp: clientDiscord.intialTimeStamp,
            largeImageKey: 'logodiscord',
            smallImageKey: 'icon',
            instance: false,
          });
    } else if (this instanceof Scene_Kamigami_Duel) {
        clientDiscord.setActivity({
            details: `Kamigami: Spirits of the Nature`,
            state: 'Dueling!',
            startTimestamp: clientDiscord.intialTimeStamp,
            largeImageKey: 'logodiscord',
            smallImageKey: 'icon',
            instance: false,
          });     
    } else if (this instanceof Scene_Kamigami_Booster) {
        clientDiscord.setActivity({
            details: `Kamigami: Spirits of the Nature`,
            state: 'Opening Boosters!',
            startTimestamp: clientDiscord.intialTimeStamp,
            largeImageKey: 'logodiscord',
            smallImageKey: 'icon',
            instance: false,
          });     
    } else if (this instanceof Scene_Kamigami_Duel_Online) {
        clientDiscord.setActivity({
            details: `Kamigami: Spirits of the Nature`,
            state: 'Dueling Online!',
            startTimestamp: clientDiscord.intialTimeStamp,
            largeImageKey: 'logodiscord',
            smallImageKey: 'icon',
            instance: false,
          });     
    } else if (this instanceof Scene_Ignis_Shop) {
        clientDiscord.setActivity({
            details: `Kamigami: Spirits of the Nature`,
            state: 'Buying New Cards',
            startTimestamp: clientDiscord.intialTimeStamp,
            largeImageKey: 'logodiscord',
            smallImageKey: 'icon',
            instance: false,
          });     
    } else if (this instanceof Scene_Map) {
        clientDiscord.setActivity({
            details: `Kamigami: Spirits of the Nature`,
            state: 'Playing Story Mode',
            startTimestamp: clientDiscord.intialTimeStamp,
            largeImageKey: 'logodiscord',
            smallImageKey: 'icon',
            instance: false,
          });     
    }


    
}
