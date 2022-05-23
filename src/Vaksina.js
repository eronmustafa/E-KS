import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddVaksinaModal} from './AddVaksinaModal';
import {EditVaksinaModal} from './EditVaksinaModal';

export class Vaksina extends Component{

    state= {
        loading:true,
        person:null,
        vak:[],
        addModalShow:false, 
        editModalShow:false
    };



async componentDidMount(){
    const url ="https://localhost:44357/api/Vaksina";
    const response =await fetch(url);
    const data = await response.json();
    this.setState({vak:data, loading:false});
    
}
deleteVak(vakid){
    if(window.confirm('Are you sure?')){
        fetch('https://localhost:44357/api/Vaksina/'+vakid,{
            method:'DELETE',
            header:{'Accept':'application/json',
        'Content-Type':'application/json'}
        })
    }
}

render(){
 
const {vak, vakid,vakname,nrVaks,vendlindja,LlojiVaks, DataVaks, Mjek, NrIDoz}=this.state;
        let addModalClose=()=>this.setState({addVaksinaShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                        <th>Emri i te Vaksinuarit</th>
                        <th>Numri i te vaksines</th>
                        <th>Vendlindja</th>
                        <th>Lloji i vaksines</th>
                        <th>Data e vaksinimit</th>
                        <th>Mjeku qe ka dhene vaksinen</th>
                        <th>Dozat e marra</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {vak.map(vak=>
                            <tr key={vak.Id}>
                                <td>{vak.Id}</td>
                                <td>{vak.Emri}</td>
                                <td>{vak.NumriIVaksinuarit}</td>
                                <td>{vak.Vendlindja}</td>
                                <td>{vak.LlojiVaksines}</td>
                                <td>{vak.DataVaksinimit}</td>
                                <td>{vak.Mjeku}</td>
                                <td>{vak.NrIDozave}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="primary"
    onClick={()=>this.setState({editModalShow:true,
        vakid:vak.Id,vakname:vak.Emri,nrVaks:vak.NumriIVaksinuarit,
        vendlindja:vak.Vendlindja,LlojiVaks:vak.LlojiVaksines, DataVaks:vak.DataVaksinimit, Mjek:vak.Mjeku, NrIDoz:vak.NrIDozave})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteVak(vak.Id)}>
            Delete
        </Button>

        <EditVaksinaModal show={this.state.editModalShow}
        onHide={editModalClose}
        vakid={vakid}
        vakname={vakname}
        nrVaks={nrVaks}
        vendlindja={vendlindja}
        LlojiVaks={LlojiVaks}
        DataVaks={DataVaks}
        Mjek={Mjek}
        NrIDoz={NrIDoz}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='success'
                    onClick={()=>this.setState({addVaksinaShow:true})}>
                    Shto Person te vaksinuar</Button>
                            
                        <AddVaksinaModal show={this.state.addVaksinaShow}
                        onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }



}

