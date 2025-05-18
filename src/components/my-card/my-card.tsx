import { Component, h, State } from "@stencil/core";

@Component({
    tag: "my-card",
    styleUrl: "my-card.css",
    shadow: true,
})
export class MyCard{
    @State() showStencilContent: boolean = true;

    tabContent(){
        this.showStencilContent = false;
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

        let myContainer = (           
                <div class="card">
                    <div class="card-header">
                        <h5>My Main Card</h5>
                    </div>
                    <div class="card-content">
                        <button class="react-btn" onClick={this.tabContent.bind(this)}>React</button>
                        <button class="stencil-btn" onClick={this.tabContent.bind(this)}>Stencil</button>
                        {this.showStencilContent?react:stencil}
                    </div>
                </div>           
        );
        return myContainer;
    }
}