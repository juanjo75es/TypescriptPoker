import * as logic from '../logic'
import {globals} from '../logic'
import { RenderableType } from './renderable';

const audio  = new Audio("/sounds/158166-Door-Wood-Bathroom-Exterior_POV-Knock-x2-Concise.mp3")
const audio2 = new Audio("/sounds/201805__fartheststar__poker-chips3.wav")
const audio3 = new Audio("/sounds/201807__fartheststar__poker-chips1.wav")
const audio4 = new Audio("/sounds/289113-Dropping_on_the_table_a_pile_of_small_cards_03.mp3")



export class Panel extends RenderableType{
    raised = logic.INITIAL_BET
    constructor(id: string){
        super(id)
    }

    onCheck(e:Event){
        e.preventDefault(); 
        console.log("oncheck")
        if(globals.state.call-globals.state.players[0].bet==0){
            audio.play()
        }
        else{
            audio2.play()
        }
        globals.state=logic.check(globals.state)
        globals.state=logic.next_player_speaks(globals.state)
    }
    onFold(e:Event){
        e.preventDefault(); 
        console.log("onfold")
        audio4.play()
        globals.state=logic.fold(globals.state)
        globals.state=logic.next_player_speaks(globals.state)
    }
    onRaise(e:Event){
        e.preventDefault(); 
        console.log("onfold")
        audio3.play()
        globals.state=logic.raise(globals.state,+this.raised)
        globals.state=logic.next_player_speaks(globals.state)
    }
    onRaiseChange(e:any){
        this.raised=+e.target.value
        document.querySelector<HTMLAnchorElement>('#'+this.id+'_raise_button')!.innerText="Raise "+this.raised
    }
    render(state: logic.GameState){
    
        let s:string=`<div class="Panel" id="${this.id}"></div>`
        if(state.bListening && state.speaking_player==0)
        {
        s=`
        <div class="Panel" id="${this.id}">
        <div>
        <a class="myButton" id="${this.id}_fold_button">Fold</a>
        </div>
        <div>
        <a class="myButton" id="${this.id}_check_button">Check ${globals.state.call-globals.state.players[0].bet}</a>
        </div>
        <div>
        <a class="myButton" id="${this.id}_raise_button">Raise ${this.raised}</a>
        </div>
        <div>
            <input type="range" id="${this.id}_range" min="100" max="${globals.state.players[0].money}"/>
        </div>
   </div>
`
        }
        if(s!=this.prev )
        {
            document.querySelector<HTMLDivElement>('#'+this.id)!.outerHTML = s
            super.render(state)
            if(state.bListening && state.speaking_player==0)
            {
                //setTimeout(() => {
                document.querySelector<HTMLAnchorElement>('#'+this.id+'_check_button')!.addEventListener(
                    "click", this.onCheck.bind(this)
                )
                document.querySelector<HTMLAnchorElement>('#'+this.id+'_fold_button')!.addEventListener(
                    "click", this.onFold.bind(this)
                )
                document.querySelector<HTMLAnchorElement>('#'+this.id+'_raise_button')!.addEventListener(
                    "click", this.onRaise.bind(this)
                )
                document.querySelector<HTMLInputElement>('#'+this.id+'_range')!.value=""+this.raised
                document.querySelector<HTMLInputElement>('#'+this.id+'_range')!.addEventListener(
                    "change", this.onRaiseChange.bind(this)
                )
                //} ,1)
            }
            this.prev = s
        }
        else
            super.render(state)
    }
}