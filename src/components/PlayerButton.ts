import * as logic from '../logic'
import { RenderableType } from './renderable'

export class PlayerButton extends RenderableType {
    player_id:number
    constructor(id: string, player_id:number){
        super(id)
        this.player_id=player_id
    }
    render(state: logic.GameState){
        let visible ="hidden"
        if(state.button==this.player_id)
            visible="visible"
        let s=`<img class="dealer-button" id="${this.id}" src="/images/dealer-button.png" 
            style="visibility: ${visible}"/>`
        if(s!=this.prev)
        {
            document.querySelector<HTMLDivElement>('#'+this.id)!.outerHTML = s
            this.prev = s
        }
        super.render(state)


    }
}