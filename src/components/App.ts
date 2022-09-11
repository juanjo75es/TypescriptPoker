import * as logic from '../logic'
import { Gameover } from './Gameover';
import { RenderableType } from './renderable';
import { Start } from './Start'
import { Victory } from './Victory';

export class App extends RenderableType{
    start:Start
    gameover:Gameover
    victory:Victory
    constructor(id: string){
        super(id)
        this.start= new Start("start")
        this.gameover= new Gameover("gameover")
        this.victory= new Victory("victory")
        this.add_sub("",this.start)
        this.add_sub("",this.gameover)
        this.add_sub("",this.victory)
    }
    render(state: logic.GameState){
        let s=`
        <div id="${this.id}" class="App" style="background-image: url('/images/background.jpg')">
          <div class="Board">
            <img class='table' src='/images/table.png'/>
            <div id="start"></div>
            <div id="victory"></div>
            <div id="gameover"></div>
            <div id="hand"></div>
            <div id="deck"></div>
            <div id="pot"></div>
            <div id="player1"></div>
            <div id="player2"></div>
            <div id="player3"></div>
            <div id="player4"></div>
            <div class="Panel" id="panel"></div>
            <img class='dealer' src='/images/dealer1.jpg'/>
          </div>
        </div>
        `
        if(s!=this.prev)
        {
            document.querySelector<HTMLDivElement>('#'+this.id)!.outerHTML = s
            this.prev = s
        }
        super.render(state)
    }
}