import { Component, h, Prop, State,Watch } from "@stencil/core";

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

    @State() todoData: any[] = [];
    @State() userData: any[] = [];

    @Watch('userName') userWatchHandler(newValue: string, oldValue: string){
        console.log('userName changed from', oldValue, 'to', newValue);
        this.userName = newValue;
    }

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
    onInputChanges(event:Event){
        this.userName = (event.target as HTMLInputElement).value;
    }
    // connectedCallback(){
    //     console.log('connectedCallback');
    // }
    // disconnectedCallback(){
    //     console.log('disconnectedCallback');
    // }   
    componentWillLoad(){
        console.log('componentWillLoad');   
    }
    componentDidLoad(){
        console.log('componentDidLoad');
        
    }

    fetchTodoData(){
       fetch('https://jsonplaceholder.typicode.com/todos').then((res)=>res.json()).then((data)=> this.todoData=data)
    }
    fetchUserData(){
       fetch('https://jsonplaceholder.typicode.com/users').then((res)=>res.json()).then((data)=> this.userData=data)
    }

    render(){
        let react = (<div class="card-react">                    
                        <p>React card component.</p> 
                        <p>API Data: {this.todoData.length > 0 ? JSON.stringify(this.todoData[1]) : 'Loading...'}</p>
                        <button  class="react-btn" onClick={this.fetchTodoData.bind(this)} >React Button</button>
                    </div>);

        let stencil = (<div class="card-stencil">                    
                        <p>Stencil card component.</p> 
                        <p>API Data: {this.userData.length > 0 ? JSON.stringify(this.userData[1]) : 'Loading...'}</p>
                        <button class="stencil-btn" onClick={this.fetchUserData.bind(this)}>Stencil Button</button>
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
                    <input type="text" value={this.userName} onInput={this.onInputChanges.bind(this)} />
                </div>  
                
                
        );
        return myContainer;
    }
}