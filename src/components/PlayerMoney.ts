import * as logic from '../logic'
import { RenderableType } from './renderable'

export class PlayerMoney extends RenderableType {
    player_id:number    
    constructor(id: string, player_id:number){
        super(id)
        this.player_id=player_id
    }
    render(state: logic.GameState){
        let money=state.players[this.player_id].money

        let s=`<div id="${this.id}">${money}</div>`
        if(s!=this.prev)
        {
            document.querySelector<HTMLDivElement>('#'+this.id)!.outerHTML = s
            this.prev = s
        }
        super.render(state)


    }
}