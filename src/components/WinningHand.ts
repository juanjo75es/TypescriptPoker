import * as logic from '../logic'
import { Card } from './Card'
import { RenderableType } from './renderable'

export class WinningHand extends RenderableType {
    player_id:number
    cards: Array<Card>
    constructor(id: string, player_id:number){
        super(id)
        this.player_id=player_id
        this.cards=[]
        for(let i:number=0; i < 5; i++)
        {
            let card: Card= new Card(this.id+"card"+i, this.player_id, "D1")
            this.cards.push(card)
            this.add_sub("",card)
        }
    }
    render(state: logic.GameState){
        let visibility="hidden"
        let player=state.players[this.player_id]
        let won=player.won
        if(won>0){
            visibility="visible"
            for(let i:number=0; i < 5; i++)
            {
                this.cards[i].card=player.best_hand[i]
                //console.log(this.cards[i].card)
            }
        }
        let s=`<div class="winning-hand" id="${this.id}" style="visibility:${visibility}">`
        for(let i:number=0; i < 5; i++)
                {
                    s+=`<div id="${this.id}card${i}"></div>`
                }
        s+=`</div>`
        if(s!=this.prev)
        {
            console.log(JSON.stringify(player.best_hand))
            document.querySelector<HTMLDivElement>('#'+this.id)!.outerHTML = s
            this.prev = s
        }
        
        super.render(state)


    }
}