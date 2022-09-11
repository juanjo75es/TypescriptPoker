import * as logic from '../logic'
import { RenderableType } from './renderable'

function get_img(card: string){
    let number="";
    let cosa="";
    switch(card[1])
    {
        case 'A':
            number='10';
            cosa="";
            break;
        case 'B':
            number='jack';
            cosa="2";
            break;
        case 'C':
            number='queen';
            cosa="2";
            break;
        case 'D':
            number='king';
            cosa="2";
            break;
        case 'E':
            number='ace';
            break;
        default: 
            number=(parseInt(card[1])+1).toString()
            break;
    }
    let simg=""
    switch(card[0])
    {
        case 'S':
            simg="images/"+number+"_of_spades"+cosa+".png"
            break;
        case 'H':
            simg="images/"+number+"_of_hearts"+cosa+".png"
            break;
        case 'D':
            simg="images/"+number+"_of_diamonds"+cosa+".png"
            break;
        case 'C':
            simg="images/"+number+"_of_clubs"+cosa+".png"
            break;
    }
    return simg
}

export class Card extends RenderableType{
    card: string
    player_id:number
    constructor(id:string, player_id:number, card: string){
        super(id)
        this.card=card        
        this.player_id=player_id
    }
    render(state: logic.GameState){
        if(this.player_id<0 || state.players[this.player_id].showCards)
        {
            let img=get_img(this.card)
            //console.log(img)
            //console.log(this.id)
            let s=`<img id="${this.id}" class="carta" src="${img}"/>`
            if(s!=this.prev)
            {
                //console.log(this.card)
                document.querySelector<HTMLDivElement>('#'+this.id)!.outerHTML = s
                this.prev = s
            }
            super.render(state)
        }
    }
}