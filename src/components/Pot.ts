import * as logic from '../logic'
import { RenderableType } from './renderable';

export class Pot extends RenderableType{
    
    constructor(id: string){
        super(id)
    }

    render(state: logic.GameState){
        let amount = state.total_pot
        let s:string=`
        <div class="Pot" id="pot">
        Pot: <img class="chip" src="/images/chip.png"/>${amount}
        </div>`

        if(s!=this.prev)
        {
            document.querySelector<HTMLDivElement>('#'+this.id)!.outerHTML = s
            super.render(state)
        }
        else
            super.render(state)
        this.prev = s
    }
}
