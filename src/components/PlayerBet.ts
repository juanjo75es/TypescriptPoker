import * as logic from '../logic'
import { RenderableType } from './renderable'

export class PlayerBet extends RenderableType {
    player_id:number    
    constructor(id: string, player_id:number){
        super(id)
        this.player_id=player_id
    }
    render(state: logic.GameState){
        let bet=state.players[this.player_id].bet
        let visibility="hidden"
        if(bet>0)
            visibility="visible"
        let s=`<div class="bet" id="${this.id}" style="visibility: ${visibility};">
            <img class="chip" src="/images/chip.png"/>${bet}</div>`
        if(s!=this.prev)
        {
            document.querySelector<HTMLDivElement>('#'+this.id)!.outerHTML = s
            this.prev = s
        }
        super.render(state)


    }
}