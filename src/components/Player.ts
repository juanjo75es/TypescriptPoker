import * as logic from '../logic'
import * as utils from '../utils'
import { PlayerCards } from './PlayerCards'
import { PlayerWon } from './PlayerWon'
import { PlayerButton } from './PlayerButton'
import { PlayerMoney } from './PlayerMoney'
import { PlayerBet } from './PlayerBet'
import { WinningHand } from './WinningHand'
import { RenderableType } from './renderable'

export class Player extends RenderableType {
    iid: number
    mycards:Array<string>
    mywon:number
    constructor(iid: number){
        super("player"+(iid+1))
        this.iid=iid
        this.mycards=[]
        this.mywon=0
        let playerwon:PlayerWon =new PlayerWon(this.id+"won",iid)
        this.add_sub("",playerwon)
        let playerbutton:PlayerButton =new PlayerButton(this.id+"button", iid)
        this.add_sub("",playerbutton)
        let playermoney:PlayerMoney =new PlayerMoney(this.id+"money", iid)
        this.add_sub("",playermoney)
        let playerbet:PlayerBet =new PlayerBet(this.id+"bet", iid)
        this.add_sub("",playerbet)
        let wininghand:WinningHand =new WinningHand(this.id+"winninghand", iid)
        this.add_sub("",wininghand)
    }
    load_cards(state: logic.GameState,player:logic.TPlayer, cards:Array<string>){
        if(!utils.arraysIdentical(cards,this.mycards))
        {
            this.clear_subs("cards")            
            {
                let cards:PlayerCards= new PlayerCards(this.id+"cards",player.id,
                    state.player_cards[player.id]
                    )
                this.add_sub("cards",cards)
            }
            this.mycards=cards
        }
    }

    render(state: logic.GameState){
        let player=state.players[this.iid]
        let cards=state.player_cards[player.id]
        let classname="jugador jugador"+(player.id+1)        
        if(player.eliminated)
            classname="eliminated_player jugador jugador"+(player.id+1)

        this.load_cards(state,player,cards)
        let visibility="visible"
        let s=""
        if(player.eliminated)
            visibility="hidden"

        s=`
    <div class="${classname}"  id="${this.id}" style="visibility:${visibility}">
`
        s+=`<div class="cartas" id="${this.id}cards"></div>`
        s+=`
        <div class="card">
            <div class="card_img">
                <img class="css-border" src="${player.picture}" />
            </div>
            <div class="card_info">
                <div>${player.name}</div>
                <div id="${this.id}money"></div>`
        
        s+=`    <div class="winner" id="${this.id}won"></div>`
        s+=`</div>`
        s+=`</div>`
        s+=`<div class="winning-hand" id="${this.id}winninghand" style="visibility:hidden"></div>`
        s+=`<div class="bet" id="${this.id}bet"></div>`
        s+=`<img class="dealer-button" id="${this.id}button" src="/images/dealer-button.png"/>`
   
        s+=`</div>`
        
        if(s!=this.prev)
        {
            document.querySelector<HTMLDivElement>('#'+this.id)!.outerHTML = s
            this.prev = s
            this.mycards=[]
            this.load_cards(state,player,cards)
        }
        super.render(state)

    }
}