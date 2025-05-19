import { Component, h, State } from "@stencil/core";

@Component({
    tag: "my-card",
    styleUrl: "my-card.css",
    shadow: true,
})
export class MyCard{
    @State() showStencilContent: boolean = false;
    @State() showReactContent: boolean = true;
    tabContent(content:string){
        if(content === 'stencil'){
            this.showStencilContent = true;
            this.showReactContent = false;
        }
        else if(content === 'react'){
            this.showReactContent = true;
            this.showStencilContent = false;
        }
        else{
            this.showReactContent = false;
            this.showStencilContent = false;
        }
    }

    


    render(){
        let react = (<div class="card-react">                    
                        <p>React card component.</p> 
                        <button  class="react-btn">React Button</button>
                    </div>);

        let stencil = (<div class="card-stencil">                    
                        <p>Stencil card component.</p> 
                        <button class="stencil-btn">Stencil Button</button>
                      </div>);

        let displayTabContent='';
        if(this.showStencilContent){
            displayTabContent = stencil;
        }
        else if(this.showReactContent){
            displayTabContent = react;
        }

        let myContainer = (           
                <div class="card">
                    <div class="card-header">
                        <h5>My Main Card</h5>
                    </div>
                    <div class="card-content">
                        <button class="react-btn" onClick={this.tabContent.bind(this,'react')}>React</button>
                        <button class="stencil-btn" onClick={this.tabContent.bind(this,'stencil')}>Stencil</button>
                        {displayTabContent}
                    </div>
                </div>           
        );
        return myContainer;
    }
}