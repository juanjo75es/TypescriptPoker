import * as logic from '../logic'
import { RenderableType } from './renderable'

export class Victory extends RenderableType {
    visibility:string
    constructor(id: string){
        super(id)
        this.visibility="none"
    }
    render(state: logic.GameState){
        //let listCards:string=""
        if(state.screen=="victory")
            this.visibility="block"
        let s=` <div class="overlayDiv" id="${this.id}" style="display:${this.visibility}">
        <div class="centered">
            <div>You won</div>
        </div>
    </div>`
        
        if(s!=this.prev)
        {
            document.querySelector<HTMLDivElement>('#'+this.id)!.outerHTML = s
            this.prev = s
        }
        super.render(state)
    }
}