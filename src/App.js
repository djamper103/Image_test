import './App.css';
import React, {Component} from "react";
import Gallery from "./MainContent/Gallery";
import LoadingScreen from "./Loading/Loading";


class App extends Component  {

    state = {
        isLoading: true,
        data: [],
        isRefresh: false,
        time: null,
        minComments:0,


    }

  componentDidMount() {
      this.getElements()

  }

    getElements= async()=>{
        const response = await fetch('https://www.reddit.com/r/reactjs.json?limit=100')
        const data = await response.json()
        this.setState({
            isLoading: false,
            data:data.data.children,

        })
    }
 updateAutoRefresh=()=>{

    if(this.state.isRefresh){
        this.setState({isRefresh:false})
        clearInterval(this.autoRefresh)

    }else{
        this.autoRefresh= setInterval(() => this.setState({ time: Date.now() }),  2000)
        this.setState({isRefresh:true})

    }

    }
    updateMinComments=(event)=>{
        this.setState({
            minComments:event.target.value
        })
    }
    itemSortByComments=(data,minComments)=>{
        return(
            data.filter(item=>item.data.num_comments>=minComments)
                .sort((a,b)=>b.data.num_comments-a.data.num_comments)
        )
    }
  render(){
      const{data,isLoading,isRefresh,time,minComments}=this.state
      const itemSort=this.itemSortByComments(data,minComments)


    return(

        <div className="App">

          <h1 >Top commented</h1>

            <button onClick={this.updateAutoRefresh} className='big-button' >
                {isRefresh?'Stop auto refresh data':'Start auto refresh data'}
            </button>

            <div className='Comments' >
                <p><b>Comments count: {minComments}</b></p>
                <input type='range' value={minComments} min={0} max={200}
                       onChange={this.updateMinComments}
                />
            </div>
            {
                isLoading?<LoadingScreen/>:itemSort.length>0?
                    <Gallery data={itemSort} time={time}/>:<p>No result found matching your criteria</p>
            }
        </div>
    )
  }

}

export default App;
