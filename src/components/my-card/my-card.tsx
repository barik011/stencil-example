import { Component, h, Prop, State } from "@stencil/core";

@Component({
    tag: "my-card",
    styleUrl: "my-card.css",
    shadow: true,
})
export class MyCard{
    @Prop({mutable:true}) userName: string = 'Quamar';
    @State() APIDetails: string = 'API Initial Value';
    @State() showStencilContent: boolean = false;
    @State() showReactContent: boolean = true;
    tabContent(content:string){
        if(content === 'stencil'){
            this.showStencilContent = true;
            this.showReactContent = false;
            this.APIDetails = 'API Details Updated with Stencil';
        }
        else if(content === 'react'){
            this.showReactContent = true;
            this.showStencilContent = false;
            this.APIDetails = 'API Details Updated with React';
        }
        else{
            this.showReactContent = false;
            this.showStencilContent = false;
        }
        
    }
    connectedCallback(){
        console.log('connectedCallback');
    }
    disconnectedCallback(){
        console.log('disconnectedCallback');
    }   
    componentWillLoad(){
        console.log('componentWillLoad');   
    }
    componentDidLoad(){
        console.log('componentDidLoad');
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
                        <h5>{this.userName} Card</h5>
                    </div>
                    <div class="card-content">
                        <p>{this.APIDetails}</p>
                        <button class="react-btn" onClick={this.tabContent.bind(this,'react')}>React</button>
                        <button class="stencil-btn" onClick={this.tabContent.bind(this,'stencil')}>Stencil</button>
                        {displayTabContent}
                    </div>
                </div>           
        );
        return myContainer;
    }
}