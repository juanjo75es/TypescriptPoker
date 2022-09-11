import * as logic from '../logic'
import { Card } from './Card'
import { RenderableType } from './renderable'

export class PlayerCards extends RenderableType {
    cards: Array<string>
    player_id: number
    constructor(id: string, player_id: number,
         cards: Array<string>){
        super(id)
        this.cards=cards
        this.player_id=player_id
        for(let i:number=0; i < this.cards.length; i++)
        {
            let card: Card= new Card(this.id+"card"+i, this.player_id, this.cards[i])
            this.add_sub("",card)
        }

    }
    render(state: logic.GameState){
        //let listCards:string=""
        let visibility="hidden"
        let player=state.players[this.player_id]
        if(!player.eliminated && player.playing)
            visibility="visible"
        let s=`<div class="cartas" id="${this.id}"  style="visibility: ${visibility};">`
        {
            
            s=`<div class="cartas" id="${this.id}"  style="visibility: ${visibility};">`
            if(!player.showCards)
            {
                for(let i:number=0; i < this.cards.length; i++)
                {
                    s+=`<img id="${this.id}card${i}" class="reverso" src="/images/back.png"/>`
                }
            }
            else{
                for(let i:number=0; i < this.cards.length; i++)
                {
                    s+=`<div id="${this.id}card${i}" style="visibility: ${visibility};"></div>`
                }
            }
        }
        s+=`</div>`
        if(s!=this.prev)
        {
            document.querySelector<HTMLDivElement>('#'+this.id)!.outerHTML = s
            this.prev = s
        }
        super.render(state)


    }
}