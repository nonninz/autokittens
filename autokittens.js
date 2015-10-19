// clone of /u/Quizer85's update found at http://pastebin.com/DeWPgtA3
function buildUI() {
  var tableContainer = document.createElement('div');
  tableContainer.id = 'timerTableContainer';
  tableContainer.style.width = '100%';
  tableContainer.style.height = '50px';
  tableContainer.style.bottom = '0px';
  tableContainer.style.position = 'absolute';
  tableContainer.innerHTML = '<table id="timerTable" style="width: 100%; table-layout: fixed;"></table>';
  document.body.appendChild(tableContainer);
  adjustColumns();
  adjustTimerBar();
  $(resetGameLogHeight);

  $('#headerLinks').append(' | <a onclick="rebuildOptionsUI();$(\'#autoOptions\').toggle();" href="#">AutoKittens</a> | <a onclick="rebuildCalculatorUI();$(\'#kittenCalcs\').toggle();" href="#">Calculators</a>');

  var uiContainer = document.createElement('div');
  uiContainer.className = 'help';
  uiContainer.id = 'autoOptions';
  uiContainer.style.display = 'none';
  uiContainer.style.overflowY = 'scroll';
  $('#gamePageContainer').append(uiContainer);

  var calcContainer = document.createElement('div');
  calcContainer.className = 'help';
  calcContainer.id = 'kittenCalcs';
  calcContainer.style.display = 'none';
  calcContainer.style.overflowY = 'scroll';
  $('#gamePageContainer').append(calcContainer);
}

function adjustColumns() {
  document.getElementById('midColumn').style.width = autoOptions.widenUI ? '1000px' : '';
  document.getElementById('leftColumn').style.maxWidth = autoOptions.widenUI ? '25%' : '';
}

function adjustTimerBar() {
  if (autoOptions.showTimerDisplays) {
    document.getElementById('timerTableContainer').style.display = '';
    document.getElementById('game').style.marginBottom = '50px';
    document.getElementById('footerLinks').style.marginBottom = '60px';
    document.body.style.backgroundPosition = 'center bottom 30px';
  } else {
    document.getElementById('timerTableContainer').style.display = 'none';
    document.getElementById('game').style.marginBottom = '';
    document.getElementById('footerLinks').style.marginBottom = '';
    document.body.style.backgroundPosition = '';
  }
}

function addCheckbox(container, prefix, optionName, caption) {
  addNamedCheckbox(container, prefix, optionName, optionName, caption);
}

function addTriggerCheckbox(container, prefix, optionName, caption, trigger)
{
  addTriggerNamedCheckbox(container, prefix, optionName, optionName, caption, trigger);
}

function addNamedCheckbox(container, prefix, optionName, controlName, caption) {
  addTriggerNamedCheckbox(container, prefix, optionName, controlName, caption, '');
}

function addTriggerNamedCheckbox(container, prefix, optionName, controlName, caption, trigger) {
  container.append('<label><input id="autoKittens_'+controlName+'" onclick="'+prefix+'.'+optionName+' = $(\'#autoKittens_'+controlName+'\')[0].checked;saveAutoOptions();'+trigger+'" type="checkbox">'+caption+'</label><br>');
}

function addHeading(container, title) {
  container.append('<h3>'+title+'</h3>')
}

function addOptionMenu(container, prefix, optionName, left_caption, options, right_caption) {
  addTriggerOptionMenu(container, prefix, optionName, left_caption, options, right_caption, '');
}

function addTriggerOptionMenu(container, prefix, optionName, left_caption, options, right_caption, trigger) {
  s = left_caption + ' <select id="autoKittens_'+optionName+'" onchange="'+prefix+'.'+optionName+' = $(\'#autoKittens_'+optionName+'\')[0].value;saveAutoOptions();'+trigger+'">';
  var arrayLength = options.length;
  for (var i = 0; i < arrayLength; i++) {
    s += '<option value='+options[i][1]+'>'+options[i][0]+'</option>'
  }
  s+='</select> '+right_caption+'<br>'
  container.append(s);
}

function addTriggerButton(container, caption, trigger) {
  container.append('<input type="button" value="'+caption+'"+ onclick="'+trigger+'"></input><br>');
}

function addIndent(container) {
  container.append('<span style="width:20px; display:inline-block;"></span>');
}

function addInputField(container, prefix, optionName, left_caption, right_caption) {
  container.append(left_caption + ' <input id="autoKittens_'+optionName+'" size="6" oninput="tryNumericSet('+prefix+', \''+optionName+'\', $(\'#autoKittens_'+optionName+'\')[0].value);saveAutoOptions();"> '+right_caption+'<br>');
}

function tryNumericParse(value) {
  newVal = parseFloat(value);
  if (!isNaN(newVal) && isFinite(newVal) && newVal > 0)
    return newVal;
  return 0;
}

function tryNumericSet(collection, attrName, value) {
  newVal = parseFloat(value);
  if (!isNaN(newVal) && isFinite(newVal) && newVal > 0)
    collection[attrName] = newVal;
}

function prepareContainer(id) {
  var result = $('#'+id);
  result.html('<a style="top: 10px; right: 45px; position: absolute;" onclick="$(\'#'+id+'\').hide();" href="#"><div style="position: fixed;">close</div></a>');
  return result
}

function rebuildOptionsUI() {
  var percentages = [["1%", 0.01],["5%", 0.05],["10%", 0.1],["25%", 0.25],["50%", 0.5],["75%", 0.75],["80%", 0.8],["90%", 0.9],["95%", 0.95], ["98%", 0.98], ["99%", 0.99], ["99.5%", 0.995], ["99.9%", 0.999], ["100%", 1]];
  var faithPercentages = [["0%", 0], ["0.1%", 0.001]].concat(percentages);
  var uiContainer = prepareContainer('autoOptions');
  addCheckbox(uiContainer, 'autoOptions', 'warnOnLeave', 'Warn before leaving the page');
  addTriggerCheckbox(uiContainer, 'autoOptions', 'widenUI', 'Make the game use more horizontal space (particularly useful for Grassy theme)', 'adjustColumns();');
  addCheckbox(uiContainer, 'autoOptions', 'autoStar', 'Automatically witness astronomical events');
  addCheckbox(uiContainer, 'autoOptions', 'autoCraft', 'Craft materials when storage is near limit');
  addCheckbox(uiContainer, 'autoOptions', 'autoHunt', 'Hunt when catpower is near limit');
  addCheckbox(uiContainer, 'autoOptions', 'autoPray', 'Praise the sun when faith is near limit');
  addIndent(uiContainer);addOptionMenu(uiContainer, 'autoOptions', 'prayLimit', 'Pray when faith is', faithPercentages, 'full');
  addCheckbox(uiContainer, 'autoOptions', 'autoTrade', 'Trade when gold is near limit');
  addTriggerOptionMenu(uiContainer, 'autoOptions', 'timeDisplay', 'Format for time displays', [["default", "standard"], ["short", "short"], ["seconds", "seconds"]], '', 'changeTimeFormat()');
  addCheckbox(uiContainer, 'autoOptions', 'autoFestival', 'Automatically try to hold festivals');

  addHeading(uiContainer, 'Auto-trading')
  races = [["No one", ""]];
  gamePage.diplomacy.races.forEach(function (r) {
    if (r.unlocked) {
      races.push([r.title || r.name, r.name]);
    }
  });
  addOptionMenu(uiContainer, 'autoOptions.tradeOptions', 'tradePartner', 'Trade with', races, 'by default');
  addCheckbox(uiContainer, 'autoOptions.tradeOptions', 'suppressTradeLog', 'Hide log messages when auto-trading');
  races[0][0] = "Default selection";
  addOptionMenu(uiContainer, 'autoOptions.tradeOptions', 'tradeLimit', 'Trade when gold is', percentages, 'full');
  addIndent(uiContainer);addInputField(uiContainer, 'autoOptions.tradeOptions', 'tradeCount', 'Send', 'caravans at a time');
  addCheckbox(uiContainer, 'autoOptions.tradeOptions', 'tradeSpring', 'Allow trading in spring');
  addIndent(uiContainer);addOptionMenu(uiContainer, 'autoOptions.tradeOptions', 'tradePartnerSpring', 'Trade with', races, ' in spring');
  addCheckbox(uiContainer, 'autoOptions.tradeOptions', 'tradeSummer', 'Allow trading in summer');
  addIndent(uiContainer);addOptionMenu(uiContainer, 'autoOptions.tradeOptions', 'tradePartnerSummer', 'Trade with', races, ' in summer');
  addCheckbox(uiContainer, 'autoOptions.tradeOptions', 'tradeAutumn', 'Allow trading in autumn');
  addIndent(uiContainer);addOptionMenu(uiContainer, 'autoOptions.tradeOptions', 'tradePartnerAutumn', 'Trade with', races, ' in autumn');
  addCheckbox(uiContainer, 'autoOptions.tradeOptions', 'tradeWinter', 'Allow trading in winter');
  addIndent(uiContainer);addOptionMenu(uiContainer, 'autoOptions.tradeOptions', 'tradePartnerWinter', 'Trade with', races, ' in winter');

  addHeading(uiContainer, 'Auto-crafting');
  addTriggerButton(uiContainer, 'Calculate craft amounts', 'calculateCraftAmounts()');
  addOptionMenu(uiContainer, 'autoOptions.craftOptions', 'craftLimit', 'Craft when storage is', percentages, 'full')
  addCheckbox(uiContainer, 'autoOptions.craftOptions', 'craftWood', 'Automatically convert catnip to wood');
  addIndent(uiContainer);addInputField(uiContainer, 'autoOptions.craftOptions', 'woodAmount', 'Craft', 'wood at a time');
  addCheckbox(uiContainer, 'autoOptions.craftOptions', 'craftBeam', 'Automatically convert wood to beams');
  addIndent(uiContainer);addInputField(uiContainer, 'autoOptions.craftOptions', 'beamAmount', 'Craft', 'beam(s) at a time');
  addCheckbox(uiContainer, 'autoOptions.craftOptions', 'craftSlab', 'Automatically convert minerals to slabs');
  addIndent(uiContainer);addInputField(uiContainer, 'autoOptions.craftOptions', 'slabAmount', 'Craft', 'slab(s) at a time');
  addCheckbox(uiContainer, 'autoOptions.craftOptions', 'craftSteel', 'Automatically convert coal to steel');
  addIndent(uiContainer);addInputField(uiContainer, 'autoOptions.craftOptions', 'steelAmount', 'Craft', 'steel at a time');
  addCheckbox(uiContainer, 'autoOptions.craftOptions', 'craftPlate', 'Automatically convert iron to plates');
  addIndent(uiContainer);addInputField(uiContainer, 'autoOptions.craftOptions', 'plateAmount', 'Craft', 'plate(s) at a time');
  addCheckbox(uiContainer, 'autoOptions.craftOptions', 'craftAlloy', 'Automatically convert titanium to alloy');
  addIndent(uiContainer);addInputField(uiContainer, 'autoOptions.craftOptions', 'alloyAmount', 'Craft', 'alloy at a time');
  addIndent(uiContainer);addInputField(uiContainer, 'autoOptions.craftOptions', 'alloySteelRatio', 'Keep', ' steel to alloy ratio');
  addCheckbox(uiContainer, 'autoOptions.craftOptions', 'craftEludium', 'Automatically convert unobtainium to eludium');
  addIndent(uiContainer);addInputField(uiContainer, 'autoOptions.craftOptions', 'eludiumAmount', 'Craft', 'eludium at a time');
  addCheckbox(uiContainer, 'autoOptions.craftOptions', 'craftKerosene', 'Automatically convert oil to kerosene');
  addIndent(uiContainer);addInputField(uiContainer, 'autoOptions.craftOptions', 'keroseneAmount', 'Craft', 'kerosene at a time');

  addHeading(uiContainer, 'Fur product crafting');
  addTriggerOptionMenu(uiContainer, 'autoOptions.furOptions', 'parchmentMode', 'Auto-craft parchment', [['never', 0], ['all, before hunting', 1], ['on full culture storage', 2], ['both', 3]], '', 'changeFurCrafts()');
  addIndent(uiContainer);addInputField(uiContainer, 'autoOptions.craftOptions', 'parchmentAmount', 'When storage full, craft', 'parchment at a time');
  addTriggerOptionMenu(uiContainer, 'autoOptions.furOptions', 'manuscriptMode', 'Auto-craft manuscripts', [['never', 0], ['all, before hunting', 1], ['on full culture storage', 2], ['both', 3]], '', 'changeFurCrafts()');
  addIndent(uiContainer);addInputField(uiContainer, 'autoOptions.craftOptions', 'manuscriptAmount', 'When storage full, craft', 'manuscript(s) at a time');
  addIndent(uiContainer);addCheckbox(uiContainer, 'autoOptions.craftOptions', 'festivalBuffer', 'When crafting from full storage, preserve enough parchment to hold a festival');
  addTriggerOptionMenu(uiContainer, 'autoOptions.furOptions', 'compendiumMode', 'Auto-craft compendiums', [['never', 0], ['all, before hunting', 1], ['on full science storage', 2], ['both', 3]], '', 'changeFurCrafts()');
  addIndent(uiContainer);addInputField(uiContainer, 'autoOptions.craftOptions', 'compediumAmount', 'When storage full, craft', 'compendium(s) at a time');
  addTriggerOptionMenu(uiContainer, 'autoOptions.furOptions', 'blueprintMode', 'Auto-craft blueprints', [['never', 0], ['all, before hunting', 1], ['on full science storage', 2], ['both', 3]], '', 'changeFurCrafts()');
  addIndent(uiContainer);addInputField(uiContainer, 'autoOptions.craftOptions', 'blueprintAmount', 'When storage full, craft', 'blueprints(s) at a time');
  addCheckbox(uiContainer, 'autoOptions.craftOptions', 'blueprintPriority', 'When crafting both from full storage, check blueprints before compendiums');

  addHeading(uiContainer, 'Auto-hunting');
  addOptionMenu(uiContainer, 'autoOptions.huntOptions', 'huntLimit', 'Hunt when catpower is', percentages, 'full')
  addCheckbox(uiContainer, 'autoOptions.huntOptions', 'suppressHuntLog', 'Hide log messages when auto-hunting (includes hunt-triggered crafts)');
  addCheckbox(uiContainer, 'autoOptions.huntOptions', 'singleHunts', 'Only send one hunt at a time');
  addCheckbox(uiContainer, 'autoOptions.huntOptions', 'huntEarly', 'Hunt as soon as the maximum number of hunts is reached (relative to the limit)');

  addHeading(uiContainer, 'Timer displays');
  addTriggerCheckbox(uiContainer, 'autoOptions', 'showTimerDisplays', 'Show timer displays below', 'adjustTimerBar()');
  uiContainer.append('Note: Ordering by time may cause elements near cap to frequently switch places.<br>')
  addOptionMenu(uiContainer, 'autoOptions', 'displayOrder', 'Order time displays by', [['default order', 'standard'], ['shortest first', 'short'], ['longest first', 'long']], '');
  gamePage.resPool.resources.forEach(function (r) {
    if (typeof autoOptions.displayOptions[r.name] !== 'undefined') {
      addNamedCheckbox(uiContainer, 'autoOptions.displayOptions', r.name, 'show' + r.name, 'Show ' + (r.title || r.name));
    }
  });

  addHeading(uiContainer, 'Reset options');
  uiContainer.append('<a onclick="autoOptions = defaultOptions;saveAutoOptions();updateOptionsUI();" href="#">Reset options</a>');

  updateOptionsUI();
}

function changeFurCrafts() {
  var crafts = [["parchmentMode", "craftParchment"], ["manuscriptMode", "craftManuscript"], ["compendiumMode", "craftCompendium"], ["blueprintMode", "craftBlueprint"]];
  for (var i = 0; i < crafts.length; i++) {
    autoOptions.huntOptions[crafts[i][1]] = autoOptions.furOptions[crafts[i][0]] & 1 ? true : false;
    autoOptions.craftOptions[crafts[i][1]] = autoOptions.furOptions[crafts[i][0]] & 2 ? true : false;
  }
  saveAutoOptions();
}

function saveAutoOptions() {
  LCstorage["kittensgame.autoOptions"] = JSON.stringify(autoOptions);
}

function changeTimeFormat() {
  var formats = {
    standard: defaultTimeFormat,
    short: shortTimeFormat,
    seconds: rawSecondsFormat
  };
  gamePage.toDisplaySeconds = formats[autoOptions.timeDisplay];
}

var defaultTimeFormat = gamePage.toDisplaySeconds;

function shortTimeFormat(secondsRaw) {
	    var sec_num = parseInt(secondsRaw, 10); // don't forget the second param
	    var hours   = Math.floor(sec_num / 3600);
	    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	    var seconds = sec_num - (hours * 3600) - (minutes * 60);

	    var timeFormated = "";
	    if ( hours ) {  timeFormated = hours + ":" }
	    timeFormated += (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds + "";

	    return timeFormated;
}

function rawSecondsFormat(secondsRaw) {
  return parseInt(secondsRaw, 10)+"s";
}

var defaultOptions = {
  warnOnLeave: true,
  autoStar: true,
  autoCraft: false,
  autoHunt: false,
  autoPray: false,
  autoTrade: false,
  autoFestival: false,
  craftOptions: {
    craftLimit: 0.99,
    craftWood: false,
    woodAmount: 10,
    craftBeam: false,
    beamAmount: 1,
    craftSlab: false,
    slabAmount: 1,
    craftSteel: false,
    steelAmount: 1,
    craftPlate: false,
    plateAmount: 1,
    craftAlloy: false,
    alloyAmount: 1,
    alloySteelRatio: 1,
    craftEludium: false,
    eludiumAmount: 1,
	craftKerosene: false,
	keroseneAmount: 1,
    festivalBuffer: false,
    craftParchment: false,
    parchmentAmount: 1,
    craftManuscript: false,
    manuscriptAmount: 1,
    craftCompendium: false,
    compediumAmount: 1,
    craftBlueprint: false,
    blueprintAmount: 1,
    blueprintPriority: false
  },
  furOptions: {
    parchmentMode: 0,
    manuscriptMode: 0,
    compendiumMode: 0,
    blueprintMode: 0
  },
  huntOptions: {
    huntLimit: 0.99,
    suppressHuntLog: false,
    huntEarly: true,
    singleHunts: false,
    craftParchment: false,
    craftManuscript: false,
    craftCompendium: false,
    craftBlueprint: false
  },
  prayLimit: 0.99,
  widenUI: false,
  displayOptions: {
  },
  displayOrder: "standard",
  timeDisplay: "standard",
  tradeOptions : {
    tradeCount: 1,
    tradeLimit: 0.99,
    suppressTradeLog: false,
    tradePartner: "",
    tradeSpring: false,
    tradePartnerSpring: "",
    tradeSummer: false,
    tradePartnerSummer: "",
    tradeAutumn: false,
    tradePartnerAutumn: "",
    tradeWinter: false,
    tradePartnerWinter: ""
  },
  showTimerDisplays: true
}

autoOptions = defaultOptions
if (LCstorage["kittensgame.autoOptions"]) {
  copyObject(JSON.parse(LCstorage["kittensgame.autoOptions"]), autoOptions);
}

function copyObject(source, target)
{
  for (var attrname in source) {
    if (typeof source[attrname] === "object") {
      if (typeof target[attrname] === "undefined") {
        target[attrname] = {};
      }
      copyObject(source[attrname], target[attrname]);
    } else {
      if (attrname == 'supressHuntLog') //Fixing a typo
        target['suppressHuntLog'] = source[attrname]
      else
        target[attrname] = source[attrname];
    }
  }
}

function updateOptionsUI() {
  var crafts = [["manuscriptMode", "craftManuscript"], ["compendiumMode", "craftCompendium"], ["blueprintMode", "craftBlueprint"]];
  for (var i = 0; i < crafts.length; i++) {
    autoOptions.furOptions[crafts[i][0]] = 1 * autoOptions.huntOptions[crafts[i][1]]  + 2 * autoOptions.craftOptions[crafts[i][1]];
  }

  traverseObject(autoOptions);
  changeTimeFormat();
}

function traverseObject(obj) {
  for (o in obj) {
    if (o === "displayOptions") {
      handleDisplayOptions(obj[o])
    }
    else if (typeof obj[o] === "object") {
      traverseObject(obj[o])
    }
    else if (typeof obj[o] === "boolean") {
      elms = $("#autoKittens_"+o);
      if (elms && elms[0]) {
        elms[0].checked = obj[o];
      }
    }
    else {
      elms = $("#autoKittens_"+o);
      if (elms && elms[0]) {
        elms[0].value = obj[o];
      }
    }
  }
}

function handleDisplayOptions(obj) {
  for (o in obj) {
    $("#autoKittens_show"+o)[0].checked = obj[o];
  }
}

function formatTableRow(name, title, value) {
  if (typeof autoOptions.displayOptions[name] === 'undefined') {
    autoOptions.displayOptions[name] = true;
  }
  if (autoOptions.displayOptions[name]) {
    return '<td style="text-align:center">'+title+'<br>'+value+'</td>';
  }
  return '';
}

fillTable = function () {
  var contents = '<tr>';
  var tickRate = 5;
  var resources = []
  gamePage.resPool.resources.forEach(function (r) {
    var res = {};
    res.name = r.name, res.title = r.title || r.name;
    res.perTickUI = r.perTickUI;
    res.value = r.value;
    res.maxValue = r.maxValue;
    if (r.perTickUI !== 0) {
      if (r.maxValue > 0) {
        if (r.value <= 0) {
          res.time = 0;
        } else if (r.value >= r.maxValue) {
          res.time = 0;
        } else if (r.perTickUI > 0) {
          res.time = (r.maxValue - r.value)/(r.perTickUI * tickRate);
        } else if (r.perTickUI < 0) {
          res.time = -r.value/(r.perTickUI * tickRate);
        }
      }
      else if (r.value > 0 && r.perTickUI < 0) {
        res.time = -r.value/(r.perTickUI * tickRate);
      };
    }
    resources.push(res)
  });
  if (autoOptions.displayOrder == "short") {
    resources.sort(function(a, b){return a.time-b.time});
  } else if (autoOptions.displayOrder == "long") {
    resources.sort(function(a, b){return b.time-a.time});
  }
  for (var i = 0; i < resources.length; i++) {
    r = resources[i];
    var name = r.name, title = r.title;
    if (r.perTickUI !== 0) {
      if (r.maxValue > 0) {
        if (r.value <= 0) {
          contents += formatTableRow(name, title, 'Empty');
        } else if (r.value >= r.maxValue) {
          contents += formatTableRow(name, title, 'Full');
        } else if (r.perTickUI > 0) {
          contents += formatTableRow(name, title, "Full: "+gamePage.toDisplaySeconds((r.maxValue - r.value)/(r.perTickUI * tickRate)));
        } else if (r.perTickUI < 0) {
          contents += formatTableRow(name, title, "Left: "+gamePage.toDisplaySeconds(-r.value/(r.perTickUI * tickRate)));
        }
      }
      else if (r.value > 0 && r.perTickUI < 0) {
        contents += formatTableRow(name, title, "Left: "+gamePage.toDisplaySeconds(-r.value/(r.perTickUI * tickRate)));
      };
    }

  }
  contents += '</tr>';
  document.getElementById('timerTable').innerHTML = contents;
}

processAutoKittens = function() {
  starClick();
  autoHunt();
  autoCraft();
  autoTrade();
  autoPray();
  autoFestival();
  fillTable();
  updateCalculators();
}

var gameTickFunc = gamePage.tick;
if (gamePage.worker)
{
  gamePage.tick = function() {
    dojo.hitch(gamePage, gameTickFunc)();
    processAutoKittens();
  }
}
else {
  autoKittensTimer = setInterval(processAutoKittens, 200);
}

if (!document.getElementById('timerTable')) {
  buildUI();
}

var checkInterval = 200;

// Based on http://www.reddit.com/r/kittensgame/comments/2eqlt5/a_few_kittens_game_scripts_ive_put_together/
starClick = function () {
  if (autoOptions.autoStar) {
    $("#gameLog").find("input").click();
  }
}

autoHunt = function () {
  if (!autoOptions.autoHunt)
    return;
  var msgFunc = gamePage.msg;
  if (autoOptions.huntOptions.suppressHuntLog) {
    gamePage.msg = function() {};
  }
  var catpower = gamePage.resPool.get('manpower');
  var leftBeforeCap = (1 - autoOptions.huntOptions.huntLimit) * catpower.maxValue
  if (catpower.value / catpower.maxValue >= autoOptions.huntOptions.huntLimit || (autoOptions.huntOptions.huntEarly && catpower.value >= (catpower.maxValue - leftBeforeCap) - ((catpower.maxValue - leftBeforeCap) % 100))) {
    if (autoOptions.huntOptions.craftParchment && gamePage.workshop.getCraft('parchment').unlocked)  { gamePage.craftAll('parchment');  }
    if (autoOptions.huntOptions.craftManuscript && gamePage.workshop.getCraft('manuscript').unlocked)  { gamePage.craftAll('manuscript');  }
    if (autoOptions.huntOptions.craftCompendium && gamePage.workshop.getCraft('compedium').unlocked)  { gamePage.craftAll('compedium');  }
    if (autoOptions.huntOptions.craftBlueprint && gamePage.workshop.getCraft('blueprint').unlocked)  { gamePage.craftAll('blueprint');  }
    if (autoOptions.huntOptions.singleHunts) {
      var origTab = gamePage.activeTabId;
      if (!(gamePage.villageTab.huntBtn && gamePage.villageTab.huntBtn.onClick))
      {
        gamePage.activeTabId = gamePage.villageTab.tabId; gamePage.render();
      }
      gamePage.villageTab.huntBtn.onClick();
      if (origTab != gamePage.activeTabId) {
        gamePage.activeTabId = origTab; gamePage.render();
      }
    } else {
      gamePage.village.huntAll();
    }
  }
  if (autoOptions.huntOptions.suppressHuntLog) {
    gamePage.msg = msgFunc;
  }
}

tryCraft = function(craftName, amount) {
  craft = gamePage.workshop.getCraft(craftName);
  prices = craft.prices;
  for (var i = 0; i < prices.length; i++) {
    res = gamePage.resPool.get(prices[i].name);
    if (res.value < prices[i].val * amount)
      return
  }
  gamePage.craft(craftName, amount);
}

calculateCraftAmounts = function() {
  var resources = ["wood", "beam", "slab", "steel", "plate", "alloy", "eludium", "kerosene", "parchment", "manuscript", "blueprint", "compedium"]
  for (var i = 0; i < resources.length; i++) {
    var craft = gamePage.workshop.getCraft(resources[i]);
    var prices = craft.prices;
    var amount = 1;
    for (var j = 0; j < prices.length; j++) {
      var res = gamePage.resPool.get(prices[j].name);
      var checkVal = Math.min(res.perTickUI, res.maxValue != 0 ? res.maxValue : res.perTickUI);
      if (checkVal > prices[j].val) amount = Math.max(amount, Math.floor(checkVal/prices[j].val))
    }
    autoOptions.craftOptions[resources[i]+'Amount'] = amount
  }
  saveAutoOptions();
  updateOptionsUI();
}

autoCraft = function () {
  if (!autoOptions.autoCraft)
    return;
  var resources = [
    ["catnip",      "wood" , "craftWood", true],
    ["wood",        "beam" , "craftBeam", gamePage.science.get('construction').researched],
    ["minerals",    "slab" , "craftSlab", gamePage.science.get('construction').researched],
    ["coal",        "steel", "craftSteel", gamePage.science.get('construction').researched],
    ["iron",        "plate", "craftPlate", gamePage.science.get('construction').researched],
    ["titanium",    "alloy", "craftAlloy", gamePage.science.get('construction').researched && (gamePage.resPool.get('steel').value > (gamePage.resPool.get('alloy').value * autoOptions.craftOptions.alloySteelRatio))],
    ["unobtainium", "eludium", "craftEludium", gamePage.science.get('construction').researched],
    ["oil", "kerosene", "craftKerosene", gamePage.science.get('construction').researched],
    ["culture", "parchment", "craftParchment", gamePage.science.get('construction').researched],
    ["culture", "manuscript", "craftManuscript", gamePage.science.get('construction').researched && (!autoOptions.craftOptions.festivalBuffer || gamePage.resPool.get('parchment').value > 2500 + 25 * autoOptions.craftOptions.manuscriptAmount)],
    ["science", "blueprint", "craftBlueprint", gamePage.science.get('construction').researched && autoOptions.craftOptions.blueprintPriority],
    ["science", "compedium", "craftCompendium", gamePage.science.get('construction').researched],
    ["science", "blueprint", "craftBlueprint", gamePage.science.get('construction').researched && !autoOptions.craftOptions.blueprintPriority]
  ];
  for (var i = 0; i < resources.length; i++) {
    var curRes = gamePage.resPool.get(resources[i][0]);
    if (curRes.maxValue == 0)
      continue;
    if (resources[i][3] && autoOptions.craftOptions[resources[i][2]] && curRes.value / curRes.maxValue >= autoOptions.craftOptions.craftLimit && gamePage.workshop.getCraft(resources[i][1]).unlocked) {
      tryCraft(resources[i][1], autoOptions.craftOptions[resources[i][1]+'Amount']);
    }
  }
}

window.onbeforeunload = function(){
  if (autoOptions.warnOnLeave)
    return 'Are you sure you want to leave?';
};

autoPray = function () {
  if (!autoOptions.autoPray)
    return;
  var faith = gamePage.resPool.get('faith');

  if (faith.value / faith.maxValue >= autoOptions.prayLimit && faith.value > 0.01) {
    gamePage.religion.praise();
  }
}

autoTrade = function () {
  if (!autoOptions.autoTrade || autoOptions.tradeOptions.tradePartner === "") {
    return;
  }
  var race;
  var season = ["Spring", "Summer", "Autumn", "Winter"][gamePage.calendar.season];
  if (autoOptions.tradeOptions['tradePartner' + season] !== "") {
    race = gamePage.diplomacy.get(autoOptions.tradeOptions['tradePartner' + season]);
    if (!race.unlocked) {
      autoOptions.tradeOptions['tradePartner' + season] = "";
    }
  } else {
    race = gamePage.diplomacy.get(autoOptions.tradeOptions.tradePartner);
    if (!race.unlocked) {
      autoOptions.tradeOptions.tradePartner = "";
    }
  }
  if (!race.unlocked) {
    saveAutoOptions();
    return;
  }
  var gold = gamePage.resPool.get('gold');
  var catpower = gamePage.resPool.get("manpower");
  if (gamePage.resPool.get(race.buys[0].name).value < race.buys[0].val || catpower.value < 50 || gold.value / gold.maxValue < autoOptions.tradeOptions.tradeLimit) {
    return;
  }

  // Preserve enough catpower to hold a festival if requested
  if (autoOptions.craftOptions.festivalBuffer && gamePage.calendar.festivalDays == 0 && autoOptions.autoFestival && catpower.value < 1500 + (autoOptions.tradeOptions.tradeCount * 50)) {
    return;
  }

  var msgFunc = gamePage.msg;
  if (autoOptions.tradeOptions.suppressTradeLog) {
    gamePage.msg = function() {};
  }

  if (autoOptions.tradeOptions['trade' + season]) {
    var origTab = gamePage.activeTabId;
    if (gamePage.diplomacyTab.racePanels.length == 0) {
      gamePage.activeTabId = 'Trade'; gamePage.render();
    }
    for (var i = 0; i < gamePage.diplomacyTab.racePanels.length; i++) {
      if (gamePage.diplomacyTab.racePanels[i].name == race.title) {
        if (!gamePage.diplomacyTab.racePanels[i].tradeBtn.enabled) {
          gamePage.activeTabId = 'Trade'; gamePage.render();
        }
        if (autoOptions.tradeOptions.tradeCount <= 1)
          gamePage.diplomacyTab.racePanels[i].tradeBtn.onClick();
        else
          gamePage.diplomacyTab.racePanels[i].tradeBtn.tradeMultiple(autoOptions.tradeOptions.tradeCount);
        break;
      }
    }
    if (gamePage.activeTabId != origTab) {
      gamePage.activeTabId = origTab; gamePage.render();
    }
  }
  if (autoOptions.tradeOptions.suppressTradeLog) {
    gamePage.msg = msgFunc;
  }
}

autoFestival = function () {
  if (gamePage.calendar.festivalDays || !autoOptions.autoFestival || !gamePage.science.get('drama').researched)
    return;

  var origTab = gamePage.activeTabId;
  if (!(gamePage.villageTab.festivalBtn && gamePage.villageTab.festivalBtn.onClick && gamePage.villageTab.festivalBtn.visible))
  {
    gamePage.activeTabId = gamePage.villageTab.tabId; gamePage.render();
  }
  if (gamePage.villageTab.festivalBtn.hasResources()) {
    gamePage.villageTab.festivalBtn.onClick();
  }
  if (origTab != gamePage.activeTabId) {
    gamePage.activeTabId = origTab; gamePage.render();
  }
}

var calculators=[];

// Calculator UI
//
function addCalculator(container, id, title, contents, calc_func, sub_id, sub_title) {
  if (sub_id) {
    container.append('<h3 onclick="$(\'#'+id+'_container\').toggle();">'+title+' (click to show/hide)</h3>');
    if (calc_func) {
      calculators.push([[id, sub_id], calc_func]);
    }
    container.append('<div id="'+id+'_container" style="display:none">'+contents+'<div id="'+id+'"></div><h4 onclick="$(\'#'+sub_id+'\').toggle();">'+sub_title+' (click to show/hide)</h4><div id="'+sub_id+'" style="display:none"></div></div>');
  } else {
    container.append('<h3 onclick="$(\'#'+id+'\').toggle();">'+title+' (click to show/hide)</h3>');
    if (calc_func) {
      calculators.push([[id], calc_func]);
    }
    container.append('<div id="'+id+'" style="display:none">'+contents+'</div>');
  }
}

function updateCalculators() {
  for (var i in calculators) {
    var c = calculators[i];
    var contents = [].concat(c[1]());
    for (var j in c[0]) {
      $('#'+c[0][j]).html(contents[j])
    }
  }
}

function rebuildCalculatorUI() {
  var calcContainer = prepareContainer('kittenCalcs');
  calculators = [];
  addCalculator(calcContainer, 'unicornCalc', 'Unicorn structures', '<h5>(<a href="https://www.reddit.com/r/kittensgame/comments/2iungv/turning_the_sacrificing_of_unicorns_into_an_exact/" target="_blank">Based on spreadsheet by /u/yatima2975</a>)</h5>', calculateUnicornBuild, 'unicornDetails', 'Calculation details');
  addCalculator(calcContainer, 'buildingCalc', 'Building price calculator', buildingCalculator());
  addCalculator(calcContainer, 'mintCalc', 'Mint efficiency calculator', '', mintCalculator);
  calculateBuildingPrice();
}

// Unicorn calculator

function getZiggurats() {
  return gamePage.bld.get('ziggurat').val;
}

function calculateUnicornBuild() {
  if (gamePage.bld.get('unicornPasture').val == 0)
    return 'You need at least one Unicorn Pasture to use this. Send off some hunters!';
  var ziggurats = getZiggurats();
  if (ziggurats == 0)
    return 'You need at least one Ziggurat to use this.';

  var startUps = calculateEffectiveUps();

  var details = '';

  var result = 'Base unicorn production per second: ' + gamePage.getDisplayValue(calculateBaseUps());
  result += '<br>Rift production per second (amortized): ' + gamePage.getDisplayValue(calculateRiftUps());
  result += '<br>Current effective unicorn production per second: ' + gamePage.getDisplayValue(startUps);

  var buildings = ['Unicorn Pasture', 'Unicorn Tomb', 'Ivory Tower', 'Ivory Citadel', 'Sky Palace', 'Unicorn Utopia'];
  var tears = getTearPrices();
  var ivory = getIvoryPrices();
  var increases = [0, 0, 0, 0, 0, 0];
  var best = 0, secondBest = 0;
  for (var i = 0; i < 6; i++) {
    extras = [0, 0, 0, 0, 0, 0];
    extras[i] = 1;
    increases[i] = calculateEffectiveUps(extras) - startUps;
    if (tears[best] / increases[best] > tears[i] / increases[i]) {
      secondBest = best;
      best = i;
    }
    if (tears[secondBest] / increases[secondBest] > tears[i] / increases[i] && i != best || secondBest == best) {
      secondBest = i;
    }
    details += 'Unicorn/s increase with 1 more ' + buildings[i] + ': ' + gamePage.getDisplayValue(increases[i]);
    if (i != 0) {
      details += '<br>Total unicorns needed: ' + gamePage.getDisplayValueExt(Math.ceil(tears[i] / ziggurats) * 2500);
      details += ' (' + gamePage.getDisplayValueExt(tears[i]) +' tears, ' + Math.ceil(tears[i] / ziggurats) + ' sacrifice(s))';
      details += '<br>'+checkUnicornReserves(tears[i], false, startUps, ivory[i])
    } else {
      details += '<br>Total unicorns needed: ' + gamePage.getDisplayValueExt(tears[i] / ziggurats * 2500);
      details += '<br>'+checkUnicornReserves(tears[i] / ziggurats * 2500, true, startUps, ivory[i])
    }
    details += '<br>Tears for 1 extra unicorn/s: ' + gamePage.getDisplayValueExt(tears[i] / increases[i]) + '<br><br>';
  }

  result += '<br><br>Best purchase is '+buildings[best]+', by a factor of ' + gamePage.getDisplayValue((tears[secondBest] / increases[secondBest]) / (tears[best] / increases[best]));
  if (best != 0) {
    result += '<br>'+checkUnicornReserves(tears[best], false, startUps, ivory[best])
  } else {
    result += '<br>'+checkUnicornReserves(tears[best] / ziggurats * 2500, true, startUps, ivory[best])
  }

  return [result, details];
}

function checkUnicornReserves(resNumber, isPasture, currUps, ivoryNeeded) {
  var unicornsLeft = 0;
  if (!isPasture) {
    var tearsLeft = resNumber - gamePage.resPool.get('tears').value;
    unicornsLeft = 2500 * Math.ceil(tearsLeft / getZiggurats());
  } else {
    unicornsLeft = resNumber;
  }
  unicornsLeft = unicornsLeft - gamePage.resPool.get('unicorns').value;
  var ivoryLeft = ivoryNeeded - gamePage.resPool.get('ivory').value;
  if (unicornsLeft > 0) {
    return "You need "+gamePage.getDisplayValueExt(unicornsLeft)+" more unicorns to build this (approximately "+gamePage.toDisplaySeconds(unicornsLeft/currUps)+").";
  } if (ivoryLeft > 0){
    return "You have enough unicorns, but need more ivory to build this.";
  } else {
    return "You have enough resources to build this now.";
  }
}

function getTearPrices() {
  var result = [0, 0, 0, 0, 0, 0];
  var buildings = [gamePage.bld.get('unicornPasture'), gamePage.religion.getZU('unicornTomb'), gamePage.religion.getZU('ivoryTower'), gamePage.religion.getZU('ivoryCitadel'), gamePage.religion.getZU('skyPalace'), gamePage.religion.getZU('unicornUtopia')]
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < buildings[i].prices.length; j++) {
      if (buildings[i].prices[j].name == 'unicorns') {
        result[i] = calcPrice(buildings[i].prices[j].val, gamePage.bld.getPriceRatio(buildings[i].name), buildings[i].val) / 2500 * getZiggurats();
      } else if (buildings[i].prices[j].name == 'tears') {
        result[i] = calcPrice(buildings[i].prices[j].val, buildings[i].priceRatio, buildings[i].val);
      }
    }
  }
  return result;
}

function getIvoryPrices() {
  var result = [0, 0, 0, 0, 0, 0];
  var buildings = [gamePage.bld.get('unicornPasture'), gamePage.religion.getZU('unicornTomb'), gamePage.religion.getZU('ivoryTower'), gamePage.religion.getZU('ivoryCitadel'), gamePage.religion.getZU('skyPalace'), gamePage.religion.getZU('unicornUtopia')]
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < buildings[i].prices.length; j++) {
      if (buildings[i].prices[j].name == 'ivory') {
        result[i] = calcPrice(buildings[i].prices[j].val, buildings[i].priceRatio, buildings[i].val);
      }
    }
  }
  return result;
}

function calcPrice(base, ratio, num) {
  for (i = 0; i < num; i++) {
    base *= ratio;
  }
  return base;
}

function calculateBaseUps(extras) {
  extras = extras || [];

  var pastures = gamePage.bld.get('unicornPasture').val + (extras[0] || 0);
  var baseUps = pastures * gamePage.bld.get('unicornPasture').effects['unicornsPerTickBase'] * gamePage.rate;

  var tombs = gamePage.religion.getZU('unicornTomb').val + (extras[1] || 0);
  var towers = gamePage.religion.getZU('ivoryTower').val + (extras[2] || 0);
  var citadels = gamePage.religion.getZU('ivoryCitadel').val + (extras[3] || 0);
  var palaces = gamePage.religion.getZU('skyPalace').val + (extras[4] || 0);
  var utopias = gamePage.religion.getZU('unicornUtopia').val + (extras[5] || 0);
  var tombEffect = gamePage.religion.getZU('unicornTomb').effects['unicornsRatio'];
  var towerEffect = gamePage.religion.getZU('ivoryTower').effects['unicornsRatio'];
  var citadelEffect = gamePage.religion.getZU('ivoryCitadel').effects['unicornsRatio'];
  var palaceEffect = gamePage.religion.getZU('skyPalace').effects['unicornsRatio'];
  var utopiaEffect = gamePage.religion.getZU('unicornUtopia').effects['unicornsRatio'];
  var bldEffect = 1 + tombEffect * tombs + towerEffect * towers + citadelEffect * citadels + palaceEffect * palaces + utopiaEffect * utopias;

  var faithEffect = 1;
  if (gamePage.religion.getRU("solarRevolution").researched){
    faithEffect += gamePage.religion.getProductionBonus() / 100;
  }

  var paragonRatio = gamePage.resPool.get("paragon").value * 0.01;
	paragonRatio = 1 + gamePage.bld.getHyperbolicEffect(paragonRatio, 2);

  return baseUps * bldEffect * faithEffect * paragonRatio;
}

function calculateRiftUps(extras) {
  extras = extras || [];
  var unicornChanceRatio = 1;
  if (gamePage.prestige.getPerk("unicornmancy").researched){
		unicornChanceRatio = 1.1;
	}
  return Math.min(500, 0.25 * unicornChanceRatio * (gamePage.religion.getZU('ivoryTower').val + (extras[2] || 0))) * gamePage.calendar.dayPerTick * gamePage.rate;
}

function calculateEffectiveUps(extras) {
  return calculateBaseUps(extras) + calculateRiftUps(extras);
}

// Building price calculator

function getBldLabel(a) {
  return typeof a.label !== 'undefined' ? a.label : a.stages[a.stage || 0].label
}

function bldLabelCmp(a, b) {
  var aLabel = typeof a.label !== 'undefined' ? a.label : a.stages[a.stage || 0].label
  var bLabel = typeof b.label !== 'undefined' ? b.label : b.stages[b.stage || 0].label
  return aLabel.localeCompare(bLabel);
}

function buildingCalculator() {
  var result = '';

  result += '<select id="buildingPriceSelector" onchange="calculateBuildingPrice()">';
  result += '<optgroup label="Buildings">';
  var buildings = gamePage.bld.buildingsData.slice(0);
  buildings.sort(bldLabelCmp);
  for (var i = 0; i < buildings.length; i++) {
    if (buildings[i].unlocked) {
      result += '<option value="bld_'+buildings[i].name+'">'+getBldLabel(buildings[i])+'</option>';
    }
  }
  if (gamePage.religionTab.visible) {
    result += '</optgroup><optgroup label="Religion">';
    var religion = gamePage.religion.religionUpgrades.slice(0);
    religion.sort(function(a, b){return a.label.localeCompare(b.label)});
    for (var i = 0; i < religion.length; i++) {
      if (gamePage.religion.faith >= religion[i].faith && religion[i].upgradable) {
        result += '<option value="RU_'+religion[i].name+'">'+religion[i].label+'</option>';
      }
    }
  }
  if (gamePage.bld.get('ziggurat').val>0) {
    result += '</optgroup><optgroup label="Ziggurats">';
    var religion = gamePage.religion.zigguratUpgrades.slice(0);
    religion.sort(function(a, b){return a.label.localeCompare(b.label)});
    for (var i = 0; i < religion.length; i++) {
      result += '<option value="ZU_'+religion[i].name+'">'+religion[i].label+'</option>';
    }
  }
  if (gamePage.spaceTab.visible) {
    result += '</optgroup><optgroup label="Space">';
    var space = gamePage.space.programs.slice(0);
    space.sort(function(a, b){return a.title.localeCompare(b.title)});
    for (var i = 0; i < space.length; i++) {
      if (space[i].unlocked && space[i].upgradable) {
        result += '<option value="space_'+space[i].name+'">'+space[i].title+'</option>';
      }
    }
  }
  result += '</optgroup></select><br><label>Target number of buildings: <input id="buildingPriceNumber" oninput="calculateBuildingPrice();"></label>';

  result += '<div id="buildingPriceHolder"></div>'
  return result;
}

function calculateBuildingPrice() {
  var priceContainer = document.getElementById('buildingPriceHolder');
  var bldName = $('#buildingPriceSelector')[0].value.split('_');
  var bld;
  var priceRatio = 1;
  switch (bldName[0]) {
    case 'bld':
      bld = gamePage.bld.get(bldName[1]);
      priceRatio = gamePage.bld.getPriceRatio(bldName[1]);
      break;
    case 'RU':
      bld = gamePage.religion.getRU(bldName[1]);
      priceRatio = bld.priceRatio;
      break;
    case 'ZU':
      bld = gamePage.religion.getZU(bldName[1]);
      priceRatio = bld.priceRatio;
      break;
    case 'space':
      bld = gamePage.space.getProgram(bldName[1]);
      priceRatio = bld.priceRatio;
      break;
  }
  var prices;
  if(typeof bld.stages !== 'undefined')
    prices = bld.stages[bld.stage || 0].prices;
  else
    prices = bld.prices
  var number = Math.floor(tryNumericParse($('#buildingPriceNumber')[0].value));
  var maxNum = Infinity;
  for (var i = 0; i < prices.length; i++) {
    var resLimit = bld.val;
    var res = gamePage.resPool.get(prices[i].name);
    if ((res.maxValue || 0) == 0)
      continue;
    if (bldName[0] == 'space' && (prices[i].name == "oil" || prices[i].name == "rocket")) {
      var reductionRatio = 0;
      if (prices[i].name == "oil")
				reductionRatio = gamePage.bld.getHyperbolicEffect(gamePage.space.getEffect("oilReductionRatio"), 0.75);
      if (res.maxValue > prices[i].val * (1 - reductionRatio))
        resLimit = maxNum;
      else
        resLimit = 0;
    } else for (var j = bld.val; ; j++) {
      if (calcPrice(prices[i].val, priceRatio, j) > res.maxValue) {
        resLimit = j;
        break;
      }
    }
    if (resLimit < maxNum)
      maxNum = resLimit;
  }

  var result = '';
  if (maxNum != Infinity)
    result += 'With your current resource caps, you can build up to '+maxNum+' of this building ('+(maxNum-bld.val)+' more than you currently have).<br>';
  if (number > 0) {
    result += 'Price for '+(bld.label || bld.title || bld.stages[bld.stage || 0].label)+' #'+number+' will be:<br>';
    for (var i = 0; i < prices.length; i++) {
      var finalPrice;
      if (bldName[0] == 'space' && (prices[i].name == "oil" || prices[i].name == "rocket"))
      {
        var reductionRatio = 0;
        if (prices[i].name == "oil")
          reductionRatio = gamePage.bld.getHyperbolicEffect(gamePage.space.getEffect("oilReductionRatio"), 0.75);
        finalPrice = prices[i].val * (1-reductionRatio);
      }
      else
        finalPrice = calcPrice(prices[i].val, priceRatio, number - 1);
      var res = gamePage.resPool.get(prices[i].name);
      result += (res.title || res.name) + ': ' + gamePage.getDisplayValueExt(finalPrice) + '<br>';
    }

    if (bld.val < number) {
      result += '<br>Cumulative resources required to reach this:<br>';
      for (var i = 0; i < prices.length; i++) {
        var price = 0;
        if (bldName[0] == 'space' && (prices[i].name == "oil" || prices[i].name == "rocket")) {
          var reductionRatio = 0;
          if (prices[i].name == "oil")
            reductionRatio = gamePage.bld.getHyperbolicEffect(gamePage.space.getEffect("oilReductionRatio"), 0.75);
          price = prices[i].val  * (1-reductionRatio) * (number - bld.val);
        }
        else for (var j = bld.val; j < number; j++) {
          price += calcPrice(prices[i].val, priceRatio, j);
        }
        var res = gamePage.resPool.get(prices[i].name);
        result += (res.title || res.name) + ': ' + gamePage.getDisplayValueExt(price) + '<br>';
      }
    }
  }

  priceContainer.innerHTML = result;
}

// Mint/hunter efficiency calculator

function mintCalculator() {
  var hunterRatio = gamePage.workshop.getEffect("hunterRatio");
  var expectedFurs = 32.5 * (hunterRatio + 1);
  var expectedIvory = 20 * (hunterRatio + 1);
  if (2 * hunterRatio < 55) {
    expectedIvory *= 1 - (55 - 2 * hunterRatio) / 100;
  }

  var catpower = gamePage.resPool.get("manpower");
  var catpowerRate = catpower.perTickUI * 5;
  var huntTime = 100/catpowerRate;
  var huntTimeWithMint = 100/(catpowerRate-3.75);
  var fpsNormal = expectedFurs/huntTime;
  var ipsNormal = expectedIvory/huntTime;
  var fpsWithMint = expectedFurs/huntTimeWithMint;
  var ipsWithMint = expectedIvory/huntTimeWithMint;

	var cpratio = (catpower.maxValue * gamePage.bld.get("mint").effects["mintEffect"]) / 100;

	var fpsFromMint = cpratio * 1.25 * 5;
	var ipsFromMint = cpratio * 0.3 * 5;

  var mintsRunning = gamePage.bld.get('mint').on;
  fpsNormal += fpsFromMint * mintsRunning;
  ipsNormal += ipsFromMint * mintsRunning;
  fpsWithMint += fpsFromMint * mintsRunning;
  ipsWithMint += ipsFromMint * mintsRunning;

  var result = "";

  result += "Average furs per hunt: " + gamePage.getDisplayValue(expectedFurs);
  result += "<br>Average ivory per hunt: " + gamePage.getDisplayValue(expectedIvory);
  result += "<br>Average time between hunts: " + gamePage.getDisplayValue(huntTime);
  result += "<br>Approximate furs per second: " + gamePage.getDisplayValue(fpsNormal);
  result += "<br>Approximate ivory per second: " + gamePage.getDisplayValue(ipsNormal);
  result += "<br><br>With extra mint running:<br>Approximate furs per second: " + gamePage.getDisplayValue(fpsWithMint + fpsFromMint);
  result += "<br>Approximate ivory per second: " + gamePage.getDisplayValue(ipsWithMint + ipsFromMint);
  result += "<br><br>Profit from extra mint:<br>Furs per second: " + gamePage.getDisplayValue(fpsFromMint + fpsWithMint - fpsNormal);
  result += "<br>Ivory per second: " + gamePage.getDisplayValue(ipsFromMint + ipsWithMint - ipsNormal);
  return result;
}

// vim:expandtab
