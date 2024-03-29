import Vue from "vue/dist/vue.esm.js";

export default class Game {

    static indexGame = 1;

    #id = null ;
    // передавать объекты игроков
    #firstUserObj = null;
    #secondUserObj = null;
    rounds = [0];
    isOverGame = false;
    #tourneyFlag = null;

    constructor(firstPlayer, secondPlayer, flag, ){
        this.#id = Game.indexGame;
        Game.indexGame++
        this.#firstUserObj = firstPlayer;
        this.#secondUserObj = secondPlayer;
        this.#tourneyFlag = flag;    
    }

    get firstUserObj(){
        return this.#firstUserObj
    }

    get secondUserObj(){
        return this.#secondUserObj
    }

    get id(){
        return this.#id
    }

    #endGame(){
        this.isOverGame = true;
    }

    firstUserWon() {
        this.#userWon(this.#firstUserObj.id);
        console.log('see flag', this.#tourneyFlag);
    }

    secondUserWon() {
        this.#userWon(this.#secondUserObj.id);
        console.log('see flag', this.#tourneyFlag);
    }

    #userWon(userId) {
    const rounds = this.rounds;
  
    if (rounds[2] === 0){
        Vue.set(rounds, 2, userId);
        if (rounds[0] === rounds[2]){
            this.#sendScore()
        }
        if (rounds[1] === rounds[2]){
            this.#sendScore()
        }
    }
    if (rounds[1] === 0){
        Vue.set(rounds, 1, userId);
        if (rounds[0] === rounds[1]){
            this.#sendScore()
        } else {
            rounds.push(0);
        }
    }
    if (rounds[0] === 0){ 
        rounds.push(0);
        Vue.set(rounds, 0, userId);
    }
    console.log('rounds', rounds);
    }
    #sendScore(){
        this.#firstUserObj.addPoints(this.#calculateScoreWin(this.#firstUserObj.id), this.#calculateScoreLoss(this.#firstUserObj.id), this.#tourneyFlag)
        this.#secondUserObj.addPoints(this.#calculateScoreWin(this.#secondUserObj.id), this.#calculateScoreLoss(this.#secondUserObj.id), this.#tourneyFlag)
        this.#endGame()
    }
    #calculateScoreWin(userId) {
        return this.rounds.reduce((wonRounds, item) => 
        wonRounds += userId === item 
            ? 1 
            : 0 
        , 0);
    }
    #calculateScoreLoss(userId){
        return this.rounds.reduce((lossRounds, item) =>
        lossRounds += userId !== item
            ? 1
            : 0
        , 0)
    }
}