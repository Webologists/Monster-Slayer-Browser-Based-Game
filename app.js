// Vanilla JS down here!!!
function randomValue(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Vue app down here!!!
const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
    mayUseHealing() {
      return this.currentRound % 2 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    startNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    monsterAttack() {
      const monsterAttackValue = randomValue(15, 8);
      this.playerHealth -= monsterAttackValue;
      this.addLogMessages("monster", "attack", monsterAttackValue);
    },
    playerAttack() {
      const playerAttackValue = randomValue(12, 5);
      this.monsterHealth -= playerAttackValue;
      this.monsterAttack();
      this.currentRound++;
      this.addLogMessages("player", "attack", playerAttackValue);
    },
    specialAttack() {
      const playerAttackValue = randomValue(25, 10);
      this.monsterHealth -= playerAttackValue;
      this.monsterAttack();
      this.currentRound++;
      this.addLogMessages("player", "attack", playerAttackValue);
    },
    healPlayer() {
      const healingValue = randomValue(20, 8);
      if (this.playerHealth + healingValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healingValue;
      }
      this.monsterAttack();
      this.currentRound++;
      this.addLogMessages("player", "heal", healingValue);
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessages(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
