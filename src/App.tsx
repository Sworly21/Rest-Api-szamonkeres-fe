import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


interface State{
  bojlerek: Bojler[];
  newBojlerAr: number;
  newBojlerTipus: string;
}

interface Bojler {
  id: number;
  price: number;
  type: string;
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
    bojlerek: [],
    newBojlerAr: 0,
    newBojlerTipus: "",
    }
  }

  async loadBojler(){
  let response = await fetch('http://localhost:3000/villanybojler')
  let data = await response.json() as Bojler[];
  this.setState({
    bojlerek:data,
    })
  }

  componentDidMount() {
    this.loadBojler();
  }

  bojlerDelete = async (id:number) => {
    await fetch('http://localhost:3000/villanybojler/'+id, {method: 'DELETE'})
    this.loadBojler();
  }

  newBojler = async () => {
    const { newBojlerTipus, newBojlerAr} = this.state;
  

  const adat = {
    type: newBojlerTipus,
    price: newBojlerAr,
  }
 

 let response = await fetch('http://localhost:3000/villanybojler',{
  method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adat)
    });

  this.setState({
    newBojlerTipus: '',
    newBojlerAr: 0,
  })
  await this.loadBojler();
  }

  render(){
    const { newBojlerTipus,  newBojlerAr} = this.state;
    return <div className='container'>
      <div className='row'>
          <div className='col-lg-4'>
            Bojler Márkája:<input type='text' value={newBojlerTipus} onChange={e => this.setState({ newBojlerTipus: e.currentTarget.value})}/><br/>
          </div>          
          <div className='col-lg-4'>
            Bojler ára:<input type='number' value={newBojlerAr} onChange={e =>  this.setState({newBojlerAr: parseInt(e.currentTarget.value)})}/><br/>
          </div>
      </div>
      <button onClick={this.newBojler} className='btn btn-primary'>Bojler hozzáadása</button>

      <br/>
      <div className='container'>
        <h2>Bojlerek</h2>
        <table>
          <thead>
            <tr>
              <th>Típus</th>
              <th>Ár</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.bojlerek.map(bojlerek => <tr>
                <td>{bojlerek.type}</td>
                <td>{bojlerek.price}</td>
                <td>
                  <button onClick={(event) => this.bojlerDelete(bojlerek.id)} className='btn btn-danger'>Törlés</button>
                </td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  }
}

export default App;
