import * as logic from '../logic'

export class RenderableType {
    private subs: Array<[string, RenderableType]>
    id:string
    prev:string
    constructor(id: string){
        this.id=id
        this.subs= []
        this.prev=""
    }
    render_subs(state: logic.GameState){
        for(let i:number=0; i<this.subs.length; i++){
            let e=this.subs[i]
            e[1].render(state)
        }
    }
    clear_subs(type:string){
        let newsubs:Array<[string, RenderableType]>=[]
        for(let i:number=0;i<this.subs.length;i++)
        {
            if(this.subs[i][0]!=type)
                newsubs.push(this.subs[i])
        }
        this.subs=newsubs
    }
    add_sub(type:string, e:RenderableType)
    {
        this.subs.push([type,e])
    }
    render(state: logic.GameState): void {
        this.render_subs(state)
    }
}