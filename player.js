'use strict';

var Player = function Player() {
    this.inventory = [];
    for (var i = 0; i < MAXINVEN; i++) {
      this.inventory[i] = null;
    }

    this.knownPotions = [];
    this.knownScrolls = [];
    this.knownSpells = [];

    this.x = 0;
    this.y = 0;
    this.level = null;
    this.char = `▓`;

    this.STRENGTH = 12;
    this.INTELLIGENCE = 12;
    this.WISDOM = 12;
    this.CONSTITUTION = 12;
    this.DEXTERITY = 12;
    this.CHARISMA = 12;
    this.HPMAX = 10;
    this.HP = 10;
    this.GOLD = 0;
    this.EXPERIENCE = 0;
    this.LEVEL = 1;
    this.REGEN = 1;
    this.WCLASS = 0;
    this.AC = 0;
    this.BANKACCOUNT = 0;
    this.SPELLMAX = 1;
    this.SPELLS = 1;
    this.ENERGY = 0;
    this.ECOUNTER = 96;
    this.MOREDEFENSES = 0;
    this.WEAR = null;
    this.PROTECTIONTIME = 0;
    this.WIELD = null;
    // AMULET =           // UNUSED
    this.REGENCOUNTER = 16;
    this.MOREDAM = 0;
    this.DEXCOUNT = 0;
    this.STRCOUNT = 0;
    this.BLINDCOUNT = 0;
    this.CONFUSE = 0;
    this.ALTPRO = 0;
    this.HERO = 0;
    this.CHARMCOUNT = 0;
    this.INVISIBILITY = 0;
    this.CANCELLATION = 0;
    this.HASTESELF = 0;
    // EYEOFLARN =        // UNUSED
    this.AGGRAVATE = 0;
    this.GLOBE = 0;
    this.TELEFLAG = 0;
    this.SLAYING = 0;
    this.NEGATESPIRIT = 0;
    this.SCAREMONST = 0;
    this.AWARENESS = 0;
    this.HOLDMONST = 0;
    this.TIMESTOP = 0;
    this.HASTEMONST = 0;
    this.CUBEofUNDEAD = 0;
    this.GIANTSTR = 0;
    this.FIRERESISTANCE = 0;
    this.BESSMANN = 0;
    this.NOTHEFT = 0;
    // this.HARDGAME = 0; moved to state.js
    // CPUTIME =
    // BYTESIN =
    // BYTESOUT =
    this.MOVESMADE = 0;
    this.MONSTKILLED = 0;
    this.SPELLSCAST = 0;
    // LANCEDEATH = null; // NOT USING
    this.SPIRITPRO = 0;
    this.UNDEADPRO = 0;
    this.SHIELD = null;
    this.STEALTH = 0;
    this.ITCHING = 0;
    this.LAUGHING = 0; // UNUSED
    this.DRAINSTRENGTH = 0; // UNUSED
    this.CLUMSINESS = 0;
    this.INFEEBLEMENT = 0; // UNUSED
    this.HALFDAM = 0;
    this.SEEINVISIBLE = 0;
    // FILLROOM =
    // RANDOMWALK =
    // SPHCAST =    /* nz if an active sphere of annihilation */
    this.WTW = 0;
    /* walk through walls */
    this.STREXTRA = 0;
    /* character strength due to objects or enchantments */
    // TMP =        /* misc scratch space */
    this.LIFEPROT = 0;
    /* life protection counter */

    this.getChar = function() {
      if (amiga_mode)
        return `${DIV_START}player${DIV_END}`;
      else
        return this.char;
    };

    /*
        losehp(x)
        losemhp(x)

        subroutine to remove hit points from the player
        warning -- will kill player if hp goes to zero
     */
    this.losehp = function(damage) {
      if (damage <= 0) return;
      changedHP = millis();
      debug(`losehp: ${lastmonst}:${damage}`);
      this.HP -= damage;
      if (this.HP <= 0) {
        beep();
        //nap(3000);
        died(lastnum, true); /* slain by something */
      }
    };

    this.losemhp = function(x) {
      if (x <= 0) return;
      changedHP = millis();
      changedHPMax = millis();
      this.HP = Math.max(1, this.HP - x);
      this.HPMAX = Math.max(1, this.HPMAX - x);
    };

    /*
        raisehp(x)
        raisemhp(x)

        subroutine to gain maximum hit points
     */
    this.raisehp = function(x) {
      if (x <= 0) return;
      changedHP = millis();
      this.HP = Math.min(this.HP + x, this.HPMAX);
    };

    this.raisemhp = function(x) {
      if (x <= 0) return;
      changedHP = millis();
      changedHPMax = millis();
      this.HP += x;
      this.HPMAX += x;
    };


    /*
        raisemspells(x)

        subroutine to gain maximum spells
    */
    this.raisemspells = function(x) {
      if (x <= 0) return;
      changedSpells = millis();
      changedSpellsMax = millis();
      this.SPELLMAX += x;
      player.SPELLS += x;
    };


    /*
        losemspells(x)

        subroutine to lose maximum spells
    */
    this.losemspells = function(x) {
      if (x <= 0) return;
      changedSpells = millis();
      changedSpellsMax = millis();
      player.SPELLMAX = Math.max(1, player.SPELLMAX - x);
      player.SPELLS = Math.max(1, player.SPELLS - x);
    };


    /*
        raiselevel()

        subroutine to raise the player one level
        uses the SKILL[] array to find level boundarys
        uses c[EXPERIENCE]  c[LEVEL]
     */
    this.raiselevel = function() {
      if (player.LEVEL < MAXPLEVEL) {
        changedLevel = millis();
        player.raiseexperience(SKILL[player.LEVEL] - player.EXPERIENCE);
      }
    };


    /*
        loselevel()

        subroutine to lower the players character level by one
     */
    this.loselevel = function() {
      if (player.LEVEL > 1) {
        changedLevel = millis();
        player.loseexperience((player.EXPERIENCE - SKILL[player.LEVEL - 1] + 1));
      }
    };


    /*
        raiseexperience(x)
        subroutine to increase experience points
     */
    this.raiseexperience = function(x) {
      changedExp = millis();
      var oldLevel = player.LEVEL;
      player.EXPERIENCE += x;
      while (player.EXPERIENCE >= SKILL[player.LEVEL] && (player.LEVEL < MAXPLEVEL)) {
        var tmp = (player.CONSTITUTION - getDifficulty()) >> 1;
        player.LEVEL++;
        player.raisemhp((rnd(3) + rnd((tmp > 0) ? tmp : 1)));
        player.raisemspells(rund(3));
        if (player.LEVEL < 7 - getDifficulty()) {
          player.raisemhp((player.CONSTITUTION >> 2));
        }
      }
      if (player.LEVEL != oldLevel) {
        beep();
        changedLevel = millis();
        updateLog(`Welcome to level ` + player.LEVEL); /* if we changed levels */
      }
    };


    /*
        loseexperience(x)

        subroutine to lose experience points
     */
    this.loseexperience = function(x) {
      changedExp = millis();
      var oldLevel = player.LEVEL;
      player.EXPERIENCE = Math.max(0, player.EXPERIENCE - x);
      while (player.EXPERIENCE < SKILL[player.LEVEL - 1]) {
        if (--player.LEVEL <= 1) {
          player.LEVEL = 1; /*  down one level      */
        }
        var tmp = (player.CONSTITUTION - getDifficulty()) >> 1; /* lose hpoints */
        player.losemhp(rnd((tmp > 0) ? tmp : 1)); /* lose hpoints */
        if (player.LEVEL < 7 - getDifficulty()) {
          player.losemhp((player.CONSTITUTION >> 2));
        }
        player.losemspells(rund(3)); /*  lose spells     */
      }
      if (oldLevel != player.LEVEL) {
        cursors();
        beep();
        changedLevel = millis();
        updateLog(`  You went down to level ${player.LEVEL}!`);
      }
    };


    /*
        function to change character levels as needed when taking/dropping an object
        that affects these characteristics
     */
    this.adjustcvalues = function(item, pickup) {
      var oldDex = player.DEXTERITY;
      var oldStr = player.STREXTRA;
      var oldInt = player.INTELLIGENCE;

      if (item.matches(ODEXRING))
        player.setDexterity(player.DEXTERITY + (pickup ? item.arg + 1 : (item.arg + 1) * -1));
      if (item.matches(OSTRRING))
        player.setStrExtra(player.STREXTRA + (pickup ? item.arg + 1 : (item.arg + 1) * -1));
      if (item.matches(OCLEVERRING))
        player.setIntelligence(player.INTELLIGENCE + (pickup ? item.arg + 1 : (item.arg + 1) * -1));
      if (item.matches(OHAMMER)) {
        player.setDexterity(player.DEXTERITY + (pickup ? 10 : -10));
        player.setStrExtra(player.STREXTRA + (pickup ? 10 : -10));
        player.setIntelligence(player.INTELLIGENCE + (pickup ? -10 : 10));
      }
      if (item.matches(OSWORDofSLASHING)) {
        player.setDexterity(player.DEXTERITY + (pickup ? 5 : -5));
      }
      if (item.matches(OORBOFDRAGON))
        pickup ? player.SLAYING++ : player.SLAYING--;
      if (item.matches(OSPIRITSCARAB))
        pickup ? player.NEGATESPIRIT++ : player.NEGATESPIRIT--;
      if (item.matches(OCUBEofUNDEAD))
        pickup ? player.CUBEofUNDEAD++ : player.CUBEofUNDEAD--;
      if (item.matches(ONOTHEFT))
        pickup ? player.NOTHEFT++ : player.NOTHEFT--;

      if (oldDex != player.DEXTERITY) changedDEX = millis();
      if (oldStr != player.STREXTRA) changedSTR = millis();
      if (oldInt != player.INTELLIGENCE) changedINT = millis();
    };


    this.setStrExtra = function(x) {
      changedSTR = millis();
      this.STREXTRA = x;
    };
    this.setMoreDefenses = function(x) {
      changedAC = millis();
      this.MOREDEFENSES = x;
    };



    this.setHP = function(x) {
      changedHP = millis();
      this.HP = x;
    };
    this.setSpells = function(x) {
      changedSpells = millis();
      this.SPELLS = x;
    };



    this.setStrength = function(x) {
      changedSTR = millis();
      this.STRENGTH = Math.max(3, x);
    };
    this.setIntelligence = function(x) {
      changedINT = millis();
      this.INTELLIGENCE = Math.max(3, x);
    };
    this.setWisdom = function(x) {
      changedWIS = millis();
      this.WISDOM = Math.max(3, x);
    };
    this.setConstitution = function(x) {
      changedCON = millis();
      this.CONSTITUTION = Math.max(3, x);
    };
    this.setDexterity = function(x) {
      changedDEX = millis();
      this.DEXTERITY = Math.max(3, x);
    };
    this.setCharisma = function(x) {
      changedCHA = millis();
      this.CHARISMA = Math.max(3, x);
    };



    this.setGold = function(x) {
      changedGold = millis();
      this.GOLD = Math.max(0, x);
    };



    this.updateStealth = function(x) {
      var prev = this.STEALTH;
      this.STEALTH = Math.max(0, this.STEALTH + x);
      changedStealth = getUpdateTime(prev, x, this.STEALTH, changedStealth);
      return this.STEALTH;
    };
    this.updateUndeadPro = function(x) {
      var prev = this.UNDEADPRO;
      this.UNDEADPRO = Math.max(0, this.UNDEADPRO + x);
      changedUndeadPro = getUpdateTime(prev, x, this.UNDEADPRO, changedUndeadPro);
      return this.UNDEADPRO;
    };
    this.updateSpiritPro = function(x) {
      var prev = this.SPIRITPRO;
      this.SPIRITPRO = Math.max(0, this.SPIRITPRO + x);
      changedSpiritPro = getUpdateTime(prev, x, this.SPIRITPRO, changedSpiritPro);
      return this.SPIRITPRO;
    };
    this.updateCharmCount = function(x) {
      var prev = this.CHARMCOUNT;
      this.CHARMCOUNT = Math.max(0, this.CHARMCOUNT + x);
      changedCharmCount = getUpdateTime(prev, x, this.CHARMCOUNT, changedCharmCount);
      return this.CHARMCOUNT;
    };
    this.updateTimeStop = function(x) {
      var prev = this.TIMESTOP;
      this.TIMESTOP = Math.max(0, this.TIMESTOP + x);
      changedTimeStop = getUpdateTime(prev, x, this.TIMESTOP, changedTimeStop);
      return this.TIMESTOP;
    };
    this.updateHoldMonst = function(x) {
      var prev = this.HOLDMONST;
      this.HOLDMONST = Math.max(0, this.HOLDMONST + x);
      changedHoldMonst = getUpdateTime(prev, x, this.HOLDMONST, changedHoldMonst);
      return this.HOLDMONST;
    };
    this.updateGiantStr = function(x) {
      var prev = this.GIANTSTR;
      this.GIANTSTR = Math.max(0, this.GIANTSTR + x);
      changedGiantStr = getUpdateTime(prev, x, this.GIANTSTR, changedGiantStr);
      if (prev <= 0 && this.GIANTSTR > 0) this.setStrExtra(this.STREXTRA + 21);
      if (prev > 0 && this.GIANTSTR <= 0) this.setStrExtra(this.STREXTRA - 20);
      return this.GIANTSTR;
    };
    this.updateFireResistance = function(x) {
      var prev = this.FIRERESISTANCE;
      this.FIRERESISTANCE = Math.max(0, this.FIRERESISTANCE + x);
      changedFireResistance = getUpdateTime(prev, x, this.FIRERESISTANCE, changedFireResistance);
      return this.FIRERESISTANCE;
    };
    this.updateDexCount = function(x) {
      var prev = this.DEXCOUNT;
      this.DEXCOUNT = Math.max(0, this.DEXCOUNT + x);
      changedDexCount = getUpdateTime(prev, x, this.DEXCOUNT, changedDexCount);
      if (prev <= 0 && this.DEXCOUNT > 0) this.setDexterity(this.DEXTERITY + 3);
      if (prev > 0 && this.DEXCOUNT <= 0) this.setDexterity(this.DEXTERITY - 3);
      return this.DEXCOUNT;
    };
    this.updateStrCount = function(x) {
      var prev = this.STRCOUNT;
      this.STRCOUNT = Math.max(0, this.STRCOUNT + x);
      changedStrCount = getUpdateTime(prev, x, this.STRCOUNT, changedStrCount);
      if (prev <= 0 && this.STRCOUNT > 0) this.setStrExtra(this.STREXTRA + 3);
      if (prev > 0 && this.STRCOUNT <= 0) this.setStrExtra(this.STREXTRA - 3);
      return this.STRCOUNT;
    };
    this.updateScareMonst = function(x) {
      var prev = this.SCAREMONST;
      this.SCAREMONST = Math.max(0, this.SCAREMONST + x);
      changedScareMonst = getUpdateTime(prev, x, this.SCAREMONST, changedScareMonst);
      return this.SCAREMONST;
    };
    this.updateHasteSelf = function(x) {
      var prev = this.HASTESELF;
      this.HASTESELF = Math.max(0, this.HASTESELF + x);
      changedHasteSelf = getUpdateTime(prev, x, this.HASTESELF, changedHasteSelf);
      return this.HASTESELF;
    };
    this.updateCancellation = function(x) {
      var prev = this.CANCELLATION;
      this.CANCELLATION = Math.max(0, this.CANCELLATION + x);
      changedCancellation = getUpdateTime(prev, x, this.CANCELLATION, changedCancellation);
      return this.CANCELLATION;
    };
    this.updateInvisibility = function(x) {
      var prev = this.INVISIBILITY;
      this.INVISIBILITY = Math.max(0, this.INVISIBILITY + x);
      changedInvisibility = getUpdateTime(prev, x, this.INVISIBILITY, changedInvisibility);
      return this.INVISIBILITY;
    };
    this.updateAltPro = function(x) {
      var prev = this.ALTPRO;
      this.ALTPRO = Math.max(0, this.ALTPRO + x);
      changedAltPro = getUpdateTime(prev, x, this.ALTPRO, changedAltPro);
      if (prev <= 0 && this.ALTPRO > 0) this.setMoreDefenses(this.MOREDEFENSES + 3);
      if (prev > 0 && this.ALTPRO <= 0) this.setMoreDefenses(this.MOREDEFENSES - 3);
      return this.ALTPRO;
    };
    this.updateProtectionTime = function(x) {
      var prev = this.PROTECTIONTIME;
      this.PROTECTIONTIME = Math.max(0, this.PROTECTIONTIME + x);
      changedProtectionTime = getUpdateTime(prev, x, this.PROTECTIONTIME, changedProtectionTime);
      if (prev <= 0 && this.PROTECTIONTIME > 0) this.setMoreDefenses(this.MOREDEFENSES + 2);
      if (prev > 0 && this.PROTECTIONTIME <= 0) this.setMoreDefenses(this.MOREDEFENSES - 2);
      return this.PROTECTIONTIME;
    };
    this.updateWTW = function(x) {
      var prev = this.WTW;
      this.WTW = Math.max(0, this.WTW + x);
      changedWTW = getUpdateTime(prev, x, this.WTW, changedWTW);
      return this.WTW;
    };



    /*
    I'd like to do something like this, but it's ES6 only and not supported
    by chrome yet, and I don't want to deal with the transpile step every time
    see: https://github.com/airbnb/javascript#destructuring
    */
    /*
    this.updateProtectionTime = function(x) {
      ({this.PROTECTIONTIME, changedProtectionTime} = this.updateStat(this.PROTECTIONTIME, changedProtectionTime, x));
      return this.PROTECTIONTIME;
    };

    this.updateStat = function(stat, changetime, x) {
      var prev = stat;
      stat = Math.max(0, stat + x);
      if (x > 0 || prev != 0 && stat <= 0)
        changetime = millis();
      return {stat, changetime};
    };
    */



    //  Spells:  1( 1)  AC: 2    WC: 3    Level 1  Exp: 0           novice explorer
    // HP: 10(10)   STR=12 INT=12 WIS=12 CON=12 DEX=12 CHA=12 LV: H  Gold: 0
    this.getStatString = function(lev) {
        var templevel = LEVELNAMES[level];
        if (lev) templevel = lev;

        if (level == 0) this.TELEFLAG = 0;
        var hpstring = `${pad(this.HP,2,changedHP)}(${pad(this.HPMAX, 2,changedHPMax)})`;
        var output =
          `Spells: ${pad(this.SPELLS,2,changedSpells)}(${pad(this.SPELLMAX,2,changedSpellsMax)})  \
AC: ${pad(this.AC,-4,changedAC)} \
WC: ${pad(this.WCLASS,-4,changedWC)} \
Level ${pad(this.LEVEL,-2,changedLevel)} \
Exp: ${pad(this.EXPERIENCE,-10,changedExp)}${pad(CLASSES[this.LEVEL - 1],16,changedLevel)}               \n\
HP: ${pad(hpstring,-1)} \
STR=${pad((this.STRENGTH + this.STREXTRA),-2,changedSTR)} \
INT=${pad(this.INTELLIGENCE,-2,changedINT)} \
WIS=${pad(this.WISDOM,-2, changedWIS)} \
CON=${pad(this.CONSTITUTION,-2,changedCON)} \
DEX=${pad(this.DEXTERITY,-2,changedDEX)} \
CHA=${pad(this.CHARISMA,-2,changedCHA)} \
LV: ${pad((this.TELEFLAG ? `?` : templevel),-2,changedDepth)} \
Gold: ${pad(Number(this.GOLD).toLocaleString(),1,changedGold)}            `;

    return output;
  }; //





}; // END PLAYER



function getUpdateTime(prevVal, change, newVal, prevTime) {
  if (change > 0 || prevVal != 0 && newVal <= 0) {
    return millis();
  } else {
    return prevTime;
  }
}

var changedHP = 0;
var changedHPMax = 0;
var changedSpells = 0;
var changedSpellsMax = 0;
var changedAC = 0;
var changedWC = 0;
var changedLevel = 0;
var changedExp = 0;
var changedHP = 0;
var changedHPMax = 0;
var changedSTR = 0;
var changedINT = 0;
var changedWIS = 0;
var changedCON = 0;
var changedDEX = 0;
var changedCHA = 0;
var changedDepth = 0;
var changedGold = 0;

var changedStealth = 0;
var changedUndeadPro = 0;
var changedSpiritPro = 0;
var changedCharmCount = 0;
var changedTimeStop = 0;
var changedHoldMonst = 0;
var changedGiantStr = 0;
var changedFireResistance = 0;
var changedDexCount = 0;
var changedStrCount = 0;
var changedScareMonst = 0;
var changedHasteSelf = 0;
var changedCancellation = 0;
var changedInvisibility = 0;
var changedAltPro = 0;
var changedProtectionTime = 0;
var changedWTW = 0;

/*
 *  ifblind(x,y)    Routine to put `monster` or the monster name into lastmosnt
 *      int x,y;
 *
 *  Subroutine to copy the word `monster` into lastmonst if the player is blind
 *  Enter with the coordinates (x,y) of the monster
 *  Returns true or false.
 */
function ifblind(x, y) {
  if (player.BLINDCOUNT > 0) {
    lastnum = 279; /* demolished by an unseen attacker */
    lastmonst = `monster`;
    return true;
  } else {
    lastnum = player.level.monsters[x][y];
    lastmonst = player.level.monsters[x][y].toString();
    return false;
  }
}



/*
    function to wield a weapon
 */
function wield(index) {
  var item = itemAt(player.x, player.y);

  // player is over a weapon
  if (item.isWeapon()) {
    appendLog(` wield`);
    if (take(item)) {
      forget(); // remove from board
    } else {
      setMazeMode(true);
      return 1;
    }
  }
  // wield from inventory
  else {
    if (index == '*' || index == ' ' || index == 'I') {
      if (mazeMode) {
        showinventory(true, wield, showwield, false, false);
      } else {
        setMazeMode(true);
      }
      nomove = 1;
      return 0;
    }
    if (index == '-') {
      if (player.WIELD) {
        updateLog(`You weapon is sheathed`);
        player.WIELD = null;
      }
      setMazeMode(true);
      return 1;
    }

    var useindex = getIndexFromChar(index);
    item = player.inventory[useindex];

    if (!item) {
      if (useindex >= 0 && useindex < 26) {
        updateLog(`  You don't have item ${index}!`);
      }
      if (useindex <= -1) {
        appendLog(` cancelled`);
        nomove = 1;
      }
      setMazeMode(true);
      return 1;
    }

    if (!item.canWield()) {
      updateLog(`  You can't wield that!`);
      setMazeMode(true);
      return 1;
    }
  }

  // common cases for both
  if (player.SHIELD && item.matches(O2SWORD)) {
    updateLog(`  But one arm is busy with your shield!`);
    setMazeMode(true);
    return 1;
  }

  if (index === item) {
    index = getCharFromIndex(player.inventory.indexOf(item));
  }
  updateLog(`  You wield:`);
  updateLog(`${index}) ${item.toString(true)}`);
  player.WIELD = item;

  setMazeMode(true);
  return 1;
}



/*
    function to wear armor
 */
function wear(index) {
  var item = itemAt(player.x, player.y);

  // player is over some armor
  if (item.isArmor()) {
    appendLog(` wear`);
    if (take(item)) {
      forget(); // remove from board
    } else {
      setMazeMode(true);
      return 1;
    }
  } // wear from inventory
  else {
    if (index == '*' || index == ' ' || index == 'I') {
      if (mazeMode) {
        showinventory(true, wear, showwear, false, false);
      } else {
        setMazeMode(true);
      }
      nomove = 1;
      return 0;
    }

    var useindex = getIndexFromChar(index);
    item = player.inventory[useindex];

    if (!item) {
      if (useindex >= 0 && useindex < 26) {
        updateLog(`  You don't have item ${index}!`);
      }
      if (useindex <= -1) {
        appendLog(` cancelled`);
        nomove = 1;
      }
      setMazeMode(true);
      return 1;
    }
  }
  // common cases for both
  if (
    item.matches(OLEATHER) ||
    item.matches(OCHAIN) ||
    item.matches(OPLATE) ||
    item.matches(ORING) ||
    item.matches(OSPLINT) ||
    item.matches(OPLATEARMOR) ||
    item.matches(OSTUDLEATHER) ||
    item.matches(OSSPLATE)) {
    player.WEAR = item;
  } else if (item.matches(OSHIELD)) {
    if (player.WIELD && player.WIELD.matches(O2SWORD)) {
      updateLog(`  Your hands are busy with the two handed sword!`);
      setMazeMode(true);
      return 1;
    } else {
      player.SHIELD = item;
    }
  } else {
    updateLog(`  You can't wear that!`);
    setMazeMode(true);
    return 1;
  }

  if (index === item) {
    index = getCharFromIndex(player.inventory.indexOf(item));
  }
  updateLog(`  You wear:`);
  updateLog(`${index}) ${item.toString(true)}`);

  setMazeMode(true);
  return 1;
}



function game_stats(p, score) {
  if (!p) p = player;

  var tmpgtime = gtime;
  var tmprmst = rmst;
  if (score && score.extra) {
    tmpgtime = score.extra[EXTRA_GTIME];
    tmprmst = score.extra[EXTRA_RMST];
  }

  var s = ``;

  s += `Inventory:\n`;
  s += `.) ` + Number(p.GOLD).toLocaleString() + ` gold pieces\n`;
  var c = `a`;
  for (var inven = 0; inven < p.inventory.length; inven++) {
    var item = p.inventory[inven];
    if (item) {
      s += c.nextChar(inven) + `) ` + item.toString(true, true) + `\n`;
    }
  }

  s += `\nBank Account:\n`;
  s += Number(p.BANKACCOUNT).toLocaleString() + ` gold pieces\n`;

  s += `\nBonuses:\n`;
  s += `+AC:   ` + p.MOREDEFENSES + `\n`;
  s += `STREX: ` + p.STREXTRA + `\n`;
  s += `GIAST: ` + p.GIANTSTR + `\n`;
  s += `HERO:  ` + p.HERO + `\n`;
  s += `AWARE: ` + p.AWARENESS + `\n`;
  s += `SEEIN: ` + p.SEEINVISIBLE + `\n`;
  s += `SPRO:  ` + p.SPIRITPRO + `\n`;
  s += `UPRO:  ` + p.UNDEADPRO + `\n`;
  s += `FIRE:  ` + p.FIRERESISTANCE + `\n`;
  s += `STEL:  ` + p.STEALTH + `\n`;
  s += `LIFE:  ` + p.LIFEPROT + `\n`;

  s += `\nMagic:\n`;
  s += `PRO2:  ` + p.PROTECTIONTIME + `\n`;
  s += `DEX:   ` + p.DEXCOUNT + `\n`;
  s += `CHM:   ` + p.CHARMCOUNT + `\n`;
  s += `STR:   ` + p.STRCOUNT + `\n`;
  s += `INV:   ` + p.INVISIBILITY + `\n`;
  s += `CAN:   ` + p.CANCELLATION + `\n`;
  s += `HAS:   ` + p.HASTESELF + `\n`;
  s += `GLO:   ` + p.GLOBE + `\n`;
  s += `SCA:   ` + p.SCAREMONST + `\n`;
  s += `HLD:   ` + p.HOLDMONST + `\n`;
  s += `STP:   ` + p.TIMESTOP + `\n`;
  s += `WTW:   ` + p.WTW + `\n`;
  s += `PRO3:  ` + p.ALTPRO + `\n`;

  s += `\nCurses:\n`;
  s += `AGGR:  ` + p.AGGRAVATE + `\n`;
  s += `HSTM:  ` + p.HASTEMONST + `\n`;
  s += `POIS:  ` + p.HALFDAM + `\n`;
  s += `CONF:  ` + p.CONFUSE + `\n`;
  s += `BLIND: ` + p.BLINDCOUNT + `\n`;
  s += `ITCH:  ` + p.ITCHING + `\n`;
  s += `CLMSY: ` + p.CLUMSINESS + `\n`;

  s += `\nSpecial Items:\n`;
  s += `THEFT: ` + p.NOTHEFT + `\n`;
  s += `CUBE:  ` + p.CUBEofUNDEAD + `\n`;
  s += `ORB:   ` + p.SLAYING + `\n`;
  s += `NEGAT: ` + p.NEGATESPIRIT + `\n`;

  s += `\nLocation:\nx,y:   ${p.x},${p.y}\n`;

  s += `\nCounters:\n`;
  s += `TIME:  ` + tmpgtime + `\n`;
  s += `RMST:  ` + tmprmst + `\n`;
  s += `ENERG: ${p.ENERGY}, ${p.ECOUNTER}\n`;
  s += `REGEN: ${p.REGEN}, ${p.REGENCOUNTER}\n`;

  s += `\nStats:\n`;
  s += `MOVES: ` + p.MOVESMADE + `\n`;
  s += `KILLS: ` + p.MONSTKILLED + `\n`;
  s += `CAST:  ` + p.SPELLSCAST + `\n`;
  // s += `PAINT: ` + DEBUG_PAINT + `\n`;
  // s += `LPR:   ` + DEBUG_LPRCAT + `\n`;
  // s += `LPRC:  ` + DEBUG_LPRC + `\n`;

  s += `\nKnown Spells:\n`;
  var count = 0;
  for (var spell = 0; spell < p.knownSpells.length; spell++) {
    var tmp = p.knownSpells[spell];
    if (tmp) {
      s += tmp + ` `;
      if (++count % 3 == 0)
        s += `\n`;
    }
  }
  if (count % 3) s += `\n`;
  s += `\nKnown Scrolls:\n`;
  for (var scroll = 0; scroll < p.knownScrolls.length; scroll++) {
    var tmp = p.knownScrolls[scroll];
    if (tmp) s += SCROLL_NAMES[tmp.arg] + `\n`;
  }
  s += `\nKnown Potions:\n`;
  for (var potion = 0; potion < p.knownPotions.length; potion++) {
    var tmp = p.knownPotions[potion];
    if (tmp) s += POTION_NAMES[tmp.arg] + `\n`;
  }

  return s;
}
