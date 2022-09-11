import * as logic from '../logic'
import { Card } from './Card'
import { RenderableType } from './renderable';

export class Hand extends RenderableType{
    
    constructor(id: string){
        super(id)
    }

    render(state: logic.GameState){
    
        let s:string=`
        <div class="Hand" id="hand">`
        for(let i:number=0;i<state.hand_cards.length;i++)
        {
            let id:string = "handcard"+i
            s+=`<div id="${id}"></div>`
            let h:Card = new Card(id, -1, state.hand_cards[i])
            this.add_sub("",h)
        }
        s+=`</div>
`
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
