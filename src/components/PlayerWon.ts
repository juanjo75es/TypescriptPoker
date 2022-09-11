import * as logic from '../logic'
import { RenderableType } from './renderable'

export class PlayerWon extends RenderableType {
    player_id:number    
    constructor(id: string, player_id:number){
        super(id)
        this.player_id=player_id
    }
    render(state: logic.GameState){
        let won=state.players[this.player_id].won
        let visibility="hidden"
        if(won>0)
            visibility="visible"

        let s=`<div class="winner" id="${this.id}" style="visibility: ${visibility};">`
        s+=`${won}`
        s+=`</div>`
        if(s!=this.prev)
        {
            document.querySelector<HTMLDivElement>('#'+this.id)!.outerHTML = s
            this.prev = s
        }
        super.render(state)


    }
}