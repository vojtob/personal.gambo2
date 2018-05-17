var teams =
[
    {id:'1', name:'Humenskí draci', start: '8:00:00', category:'THE RUN MARATHON 12M - FULL'},
    {id:'2', name:'bogi ultra team', start: '8:00:00', category:'THE RUN MARATHON 12M - FULL'},
    {id:'3', name:'Accenture Hore Bež/z!', start: '8:00:00', category:'THE RUN MARATHON 12MIX - FULL'},
    {id:'4', name:'Active life – Visit Košice', start: '8:00:00', category:'THE RUN MARATHON 12MIX - FULL'},
    {id:'5', name:'Anjelský Beh Running Team', start: '8:00:00', category:'THE RUN MARATHON 12MIX - FULL'},
    {id:'6', name:'Behuni', start: '8:00:00', category:'THE RUN MARATHON 12MIX - FULL'},
    {id:'7', name:'Bánovskí behúni', start: '8:00:00', category:'THE RUN MARATHON 12MIX - FULL'},
    {id:'8', name:'DXC Dream Team', start: '8:00:00', category:'THE RUN MARATHON 12MIX - FULL'},
    {id:'9', name:'EUROCOM', start: '8:00:00', category:'THE RUN MARATHON 12MIX - FULL'},
    {id:'10', name:'Endurance Runners', start: '8:00:00', category:'THE RUN MARATHON 12MIX - FULL'},
    {id:'11', name:'MOLFIT RUNTEAM', start: '8:00:00', category:'THE RUN MARATHON 12MIX - FULL'},
    {id:'12', name:'NAY dvanástka', start: '8:00:00', category:'THE RUN MARATHON 12MIX - FULL'},
    {id:'13', name:'RTVS Running Team', start: '8:00:00', category:'THE RUN MARATHON 12MIX - FULL'},
    {id:'14', name:'Red Bull', start: '8:00:00', category:'THE RUN MARATHON 12MIX - FULL'},
    {id:'15', name:'Road Runners', start: '8:00:00', category:'THE RUN MARATHON 12MIX - FULL'},
    {id:'16', name:'Turbočimbur', start: '8:00:00', category:'THE RUN MARATHON 12MIX - FULL'},
    {id:'17', name:'Zvolen', start: '8:00:00', category:'THE RUN MARATHON 12MIX - FULL'},
    {id:'18', name:'innogy South East Europe', start: '8:00:00', category:'THE RUN MARATHON 12MIX - FULL'},
    {id:'19', name:'ŠBK VTJ Zvolen', start: '8:00:00', category:'THE RUN MARATHON 12MIX - FULL'},
    {id:'20', name:'ŠPORTKLUB Dobrá Niva', start: '8:00:00', category:'THE RUN MARATHON 12MIX - FULL'},
    {id:'21', name:'Behaj-Švihaj', start: '8:00:00', category:'THE RUN ULTRA 6MIX - FULL'},
    {id:'22', name:'EMBA a POMÔŽTE CHUDOBNÝM', start: '8:00:00', category:'THE RUN ULTRA 6MIX - FULL'},
    {id:'23', name:'ULTRA geeks and runners', start: '8:00:00', category:'THE RUN ULTRA 6MIX - FULL'},
    {id:'24', name:'Budmerice', start: '8:00:00', category:'THE RUN FREESTYLE 7-16MIX - FULL'},
    {id:'25', name:'Crossgym Unbroken Puchov', start: '8:00:00', category:'THE RUN FREESTYLE 7-16MIX - FULL'},
    {id:'26', name:'DANUBE RUNNERS', start: '8:00:00', category:'THE RUN FREESTYLE 7-16MIX - FULL'},
    {id:'27', name:'IA runners', start: '8:00:00', category:'THE RUN FREESTYLE 7-16MIX - FULL'},
    {id:'28', name:'Laco Maco drink tím', start: '8:00:00', category:'THE RUN FREESTYLE 7-16MIX - FULL'},
    {id:'29', name:'RETAIL TEAM', start: '8:00:00', category:'THE RUN FREESTYLE 7-16MIX - FULL'},
    {id:'30', name:'TEAM HERBALIFE', start: '8:00:00', category:'THE RUN FREESTYLE 7-16MIX - FULL'},
    {id:'31', name:'Utrhnuté vagóny', start: '8:00:00', category:'THE RUN FREESTYLE 7-16MIX - FULL'},
    {id:'32', name:'ČESKOSLOVENSKO', start: '8:00:00', category:'THE RUN FREESTYLE 7-16MIX - FULL'},
    {id:'33', name:'Prezit', start: '8:00:00', category:'THE RUN MARATHON 7M - EAST'},
    {id:'34', name:'Kamarádi', start: '8:00:00', category:'THE RUN FREESTYLE 5-14MIX - EAST'},
    {id:'35', name:'THE RUNning team Teplička nad Váhom', start: '8:00:00', category:'THE RUN FREESTYLE 5-14MIX - EAST'},
    {id:'36', name:'Vojaci OSSR', start: '8:00:00', category:'THE RUN MARATHON 5M - WEST'},
    {id:'37', name:'Gastro Bathory team', start: '8:00:00', category:'THE RUN FREESTYLE 5-10MIX - WEST'},
    {id:'38', name:'PEPCO Makači', start: '8:00:00', category:'THE RUN FREESTYLE 5-10MIX - WEST'}
    ];

var legs = [
    {id:'1', from:'Košice - ul. Hlavná', to: 'Družstevná pri Hornáde', distance: '10741,26', up: '163,072', down: '150,558'},
    {id:'2', from:'Družstevná pri Hornáde', to: 'Veľká Lodina', distance: '14601,54', up: '278,46', down: '245,044'},
    {id:'3', from:'Veľká Lodina', to: 'Ružín - priehrada', distance: '8664,46', up: '213,3', down: '145,41'},
    {id:'4', from:'Ružín - priehrada', to: 'Margecany', distance: '11473,9', up: '536,08', down: '524,48'},
    {id:'5', from:'Margecany', to: 'Kluknava', distance: '9471,86', up: '211,08', down: '187,66'},
    {id:'6', from:'Kluknava', to: 'Spišské Vlachy', distance: '12798,23', up: '216,06', down: '186,47'},
    {id:'7', from:'Spišské Vlachy', to: 'Spišské Podhradie', distance: '7173,27', up: '87,63', down: '44,86'},
    {id:'8', from:'Spišské Podhradie', to: 'Levoča', distance: '14859,14', up: '361,94', down: '214,3'},
    {id:'9', from:'Levoča', to: 'Vlkovce', distance: '10015,29', up: '415,89', down: '160,37'},
    {id:'10', from:'Vlkovce', to: 'Levkovce', distance: '6749,48', up: '125,9', down: '182,57'},
    {id:'11', from:'Levkovce', to: 'Veľká Lomnica', distance: '8931,75', up: '123,27', down: '248,54'},
    {id:'12', from:'Veľká Lomnica', to: 'Tatranská Lomnica', distance: '8762,93', up: '207,84', down: '11,28'},
    {id:'13', from:'Tatranská Lomnica', to: 'Tatranská Polianka', distance: '10182,87', up: '278,7', down: '136,17'},
    {id:'14', from:'Tatranská Polianka', to: 'Štrbské Pleso', distance: '10274,46', up: '400,35', down: '129,24'},
    {id:'15', from:'Štrbské Pleso', to: 'Podbanské ', distance: '11280,33', up: '151,1', down: '315,59'},
    {id:'16', from:'Podbanské ', to: 'Pribylina', distance: '13393,99', up: '53,48', down: '373,71'},
    {id:'17', from:'Pribylina', to: 'Jamník', distance: '10321,56', up: '67,29', down: '154,06'},
    {id:'18', from:'Jamník', to: 'Liptovský Mikuláš', distance: '8929,51', up: '45,62', down: '167,86'},
    {id:'19', from:'Liptovský Mikuláš', to: 'Liptovská Sielnica', distance: '10552,24', up: '135,32', down: '123,7'},
    {id:'20', from:'Liptovská Sielnica', to: 'Huty', distance: '8674,2', up: '381,29', down: '195,46'},
    {id:'21', from:'Huty', to: 'Chlebnice', distance: '9002,75', up: '251,33', down: '437,53'},
    {id:'22', from:'Chlebnice', to: 'Oravský Podzámok', distance: '12015,05', up: '115,34', down: '193,4'},
    {id:'23', from:'Oravský Podzámok', to: 'Dolný Kubín - Záskalie', distance: '10441', up: '217,52', down: '245,21'},
    {id:'24', from:'Dolný Kubín - Záskalie', to: 'Párnica', distance: '10221,06', up: '31,65', down: '30,94'},
    {id:'25', from:'Párnica', to: 'Zázrivá', distance: '10756,52', up: '404,593', down: '283,201'},
    {id:'26', from:'Zázrivá', to: 'Terchová', distance: '10474,9', up: '195,628', down: '298,3'},
    {id:'27', from:'Terchová', to: 'Krasňany', distance: '11608,88', up: '106,13', down: '229,55'},
    {id:'28', from:'Krasňany', to: 'Teplička nad Váhom', distance: '6946,04', up: '76,51', down: '102,14'},
    {id:'29', from:'Teplička nad Váhom', to: 'Turie', distance: '12143', up: '114,61', down: '59,48'},
    {id:'30', from:'Turie', to: 'Kľače', distance: '10687,47', up: '254,59', down: '218,6'},
    {id:'31', from:'Kľače', to: 'Fačkov', distance: '12302,03', up: '161,45', down: '62,83'},
    {id:'32', from:'Fačkov', to: 'Čičmany - centrum', distance: '9964,4', up: '359,72', down: '248,86'},
    {id:'33', from:'Čičmany - centrum', to: 'Košecké Rovné', distance: '11363,55', up: '310,49', down: '434'},
    {id:'34', from:'Košecké Rovné', to: 'Košeca', distance: '14361,32', up: '185,29', down: '458,26'},
    {id:'35', from:'Košeca', to: 'Príles - hrádza', distance: '12638,55', up: '81,97', down: '107,97'},
    {id:'36', from:'Príles - hrádza', to: 'Trenčín - hrádza', distance: '12597,81', up: '107,28', down: '125,02'},
    {id:'37', from:'Trenčín - hrádza', to: 'Biskupický kanál', distance: '11430,52', up: '62,08', down: '74,89'},
    {id:'38', from:'Biskupický kanál', to: 'Nové Mesto nad Váhom', distance: '10876,67', up: '37,26', down: '46,72'},
    {id:'39', from:'Nové Mesto nad Váhom', to: 'Častkovce', distance: '9689,78', up: '109,35', down: '111,92'},
    {id:'40', from:'Častkovce', to: 'Vrbové', distance: '11615,21', up: '92,85', down: '94,05'},
    {id:'41', from:'Vrbové', to: 'Dechtice', distance: '13154,7', up: '219,28', down: '217,5'},
    {id:'42', from:'Dechtice', to: 'Boleráz - priehrada', distance: '12688,33', up: '200,35', down: '195,51'},
    {id:'43', from:'Boleráz - priehrada', to: 'Doľany', distance: '12896,2', up: '229,67', down: '169,51'},
    {id:'44', from:'Doľany', to: 'Modra - Tri kríže', distance: '12598,25', up: '156,58', down: '196,41'},
    {id:'45', from:'Modra - Tri kríže', to: 'Slovenský Grob', distance: '12305,53', up: '91,16', down: '163,6'},
    {id:'46', from:'Slovenský Grob', to: 'Ivánka pri Dunaji - Mohyla M.R.Štefánika', distance: '11617,15', up: '16,82', down: '19,55'},
    {id:'47', from:'Ivánka pri Dunaji - Mohyla M.R.Štefánika', to: 'Bratislava - hrádza (Bufet Šimani)', distance: '9542,58', up: '70,9', down: '68,88'},
    {id:'48', from:'Bratislava - hrádza (Bufet Šimani)', to: 'Bratislava - Hviezdoslavovo námestie', distance: '6258,43', up: '0,98', down: '0'}
];
    

function getTeamCount(teamID) {
    return teams.length;
}

function getTeam(teamID) {
    // console.log("getTeam " + teamID);
    return teams[parseInt(teamID)-1];
}

function getLeg(legID) {
    // console.log("getLeg " + legID);
    // console.log(legs[parseInt(legID)-1]);
    return legs[parseInt(legID)-1];
}
    
exports.getTeam = getTeam;
exports.getLeg = getLeg;
exports.getTeamCount = getTeamCount;
