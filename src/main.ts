import './style.css'
import './App.css'
import './components/Panel'
import {Player} from './components/Player'
import * as logic from './logic'
import {globals} from './logic'
import { Panel } from './components/Panel'
import { Hand } from './components/Hand'
import { Pot } from './components/Pot'
import { App } from './components/App'



var panel = new Panel('panel')
var hand = new Hand('hand')
var pot = new Pot('pot')
var player1 = new Player(0)
var player2 = new Player(1)
var player3 = new Player(2)
var player4 = new Player(3)
var app = new App('app')
app.add_sub("",panel)
app.add_sub("",hand)
app.add_sub("",pot)
app.add_sub("",player1)
app.add_sub("",player2)
app.add_sub("",player3)
app.add_sub("",player4)

function render()
{
  app.render(globals.state)
}

function game_logic(){
  switch(globals.state.stage)
  {
    case 0://dealing cards      
      /*console.log("test1: "+JSON.stringify(utils.highest_card(
        ["H1","H4","H5","H7","H8"],[],["H4","H5","H8","HB","HD"],[]))
      )*/
      
      for(let i=0;i<logic.NPLAYERS;i++){
        globals.state.players[i].bet=0
        if(!globals.state.players[i].eliminated)
        {
          globals.state.players[i].playing=true
          let e1: string | undefined= globals.state.available_cards.pop()
          let e2: string | undefined = globals.state.available_cards.pop()
          globals.state.player_cards[i]=[e1 as string,e2 as string]
        }
      }
      globals.state.call=logic.INITIAL_BET
      globals.state.players[0].showCards=true

      globals.state=logic.force_bet(globals.state, (globals.state.button+2)%logic.NPLAYERS, logic.INITIAL_BET)
      globals.state=logic.force_bet(globals.state, (globals.state.button+3)%logic.NPLAYERS, logic.INITIAL_BET/2)
      globals.state.speaking_player=(globals.state.button+1)%logic.NPLAYERS
      globals.state.players_asked=0              
      break;
    case 1://listening players
      globals.state=logic.listen_players(globals.state)
      break;
    case 2://showing 3 cards
      globals.state.hand_cards=[
        globals.state.available_cards.pop() as string,
        globals.state.available_cards.pop() as string,
        globals.state.available_cards.pop() as string
      ]
      break;
    case 3://listening players
        globals.state=logic.listen_players(globals.state)
      break;
    case 4://showing 1 card
      globals.state.hand_cards=[...globals.state.hand_cards,
        globals.state.available_cards.pop() as string,
      ]
      break;
    case 5://listening players
      globals.state=logic.listen_players(globals.state)
      break;
    case 6://showing 1 card
      globals.state.hand_cards=[...globals.state.hand_cards,
        globals.state.available_cards.pop() as string,
      ]
      break;
    case 7:
      globals.state=logic.listen_players(globals.state)
      break;
    case 8: //show cards
      globals.state.players[1].showCards=true
      globals.state.players[2].showCards=true
      globals.state.players[3].showCards=true
      //console.log("table hand: "+JSON.stringify(globals.state.hand_cards))
      globals.state=logic.reward_winners(globals.state)
      break;
    case 9://rewarding winners
      {
        globals.state.players[1].showCards=false
        globals.state.players[2].showCards=false
        globals.state.players[3].showCards=false
        //globals.state.players[0].money+=globals.state.pot;
        globals.state.players[0].bet=0;
        globals.state.players[1].bet=0;
        globals.state.players[2].bet=0;
        globals.state.players[3].bet=0;
        globals.state.players[0].won=0;
        globals.state.players[1].won=0;
        globals.state.players[2].won=0;
        globals.state.players[3].won=0;
        
        globals.state.players[1].best_hand=[]
        globals.state.players[2].best_hand=[]
        globals.state.players[3].best_hand=[]
        let neliminated=0
        for(let i=0;i<logic.NPLAYERS;i++)
        {
          if(globals.state.players[i].money<0)
          {
            globals.state.players[i].eliminated=true
            neliminated++
            if(i==0){
              globals.state=logic.game_over(globals.state)
            }
          }
          if(neliminated==logic.NPLAYERS-1 && !globals.state.players[0].eliminated){
            globals.state=logic.victory(globals.state)
          }
          if(!globals.state.players[i].eliminated){
          }
        }

        globals.state.total_pot=0
        
        globals.state.call=logic.INITIAL_BET;
        globals.state.button=(globals.state.button+1)%logic.NPLAYERS
        globals.state.available_cards=logic.shuffle_cards()
        globals.state.hand_cards=[]
        globals.state.players[0].showCards=false
      }
      break;
  }
  render()
}



function interval(){
  let l=400
  if(globals.state.bListening)
  {
    game_logic()
    if(globals.state.speaking_player!=0)
    {      
      globals.state = logic.next_player_speaks(globals.state)
    }
    
  }
  else 
  {
    
    globals.state.players_asked=0
    globals.state.stage = (globals.state.stage+1)%logic.NSTATES
    game_logic()
    if(globals.state.stage==8)
    {
      l=5000
    }
    console.log("useEffect "+globals.state.stage)    
  }
  mytimeout=setTimeout(interval,l)
}

game_logic()
let mytimeout=setTimeout(interval,500)

