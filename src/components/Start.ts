import * as logic from '../logic'
import { RenderableType } from './renderable'

export class Start extends RenderableType {
    visibility:string
    constructor(id: string){
        super(id)
        this.visibility="visible"
    }
    onStart(e:Event)
    {
        this.visibility="hidden"
    }
    render(state: logic.GameState){
        //let listCards:string=""
        let s=`<div class="overlayDiv" id="start"
        style="background-image: url('/images/background.jpg'); visibility:${this.visibility}"
    >
        <div class="centered">
            <div>Press to start</div>
            <div>
                <a class="myButton" id="startbutton">Start</a>
            </div>
        </div>
    </div>`
        if(s!=this.prev)
        {
            document.querySelector<HTMLDivElement>('#'+this.id)!.outerHTML = s
            this.prev = s
        }
        super.render(state)
        document.querySelector<HTMLAnchorElement>('#startbutton')!.addEventListener(
            "click", this.onStart.bind(this)
        )

    }
}