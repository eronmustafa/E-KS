import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddLejaModal} from './AddLejaModal';
import {EditLejaModal} from './EditLejaModal';

export class Leja extends Component{

    state= {
        loading:true,
        person:null,
        lej:[],
        addModalShow:false, 
        editModalShow:false
    };



async componentDidMount(){
    const url ="https://localhost:44357/api/Leja";
    const response =await fetch(url);
    const data = await response.json();
    this.setState({lej:data, loading:false});
    
}
deleteLej(lejid){
    if(window.confirm('Are you sure?')){
        fetch('https://localhost:44357/api/Leja/'+lejid,{
            method:'DELETE',
            header:{'Accept':'application/json',
        'Content-Type':'application/json'}
        })
    }
}

render(){
const {lej, lejid,lejname,lejident,vendlindja,Kategoria, DataPranimit, DataSkadences}=this.state;
        let addModalClose=()=>this.setState({addLejaShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                        <th>Emri i personit me patent shoferit</th>
                        <th>Numri identifikues</th>
                        <th>Vendlindja</th>
                        <th>Kategoria e patent shoferit</th>
                        <th>Data e Pranimit</th>
                        <th>Data e Skadences</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lej.map(lej=>
                            <tr key={lej.IdentitetiId}>
                                <td>{lej.IdentitetiId}</td>
                                <td>{lej.EmriLejaMarresit}</td>
                                <td>{lej.NumriIdentifikues}</td>
                                <td>{lej.Vendlindja}</td>
                                <td>{lej.Kategoria}</td>
                                <td>{lej.DataPranimit}</td>
                                <td>{lej.DataSkadences}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="primary"
    onClick={()=>this.setState({editModalShow:true,
        lejid:lej.IdentitetiId,lejname:lej.EmriLejaMarresit,lejident:lej.NumriIdentifikues,
        vendlindja:lej.Vendlindja,Kategoria:lej.Kategoria, DataPranimit:lej.DataPranimit, DataSkadences:lej.DataSkadences})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteLej(lej.IdentitetiId)}>
            Delete
        </Button>

        <EditLejaModal show={this.state.editModalShow}
        onHide={editModalClose}
        lejid={lejid}
        lejname={lejname}
        lejident={lejident}
        vendlindja={vendlindja}
        Kategoria={Kategoria}
        DataPranimit={DataPranimit}
        DataSkadences={DataSkadences}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='success'
                    onClick={()=>this.setState({addLejaShow:true})}>
                    Shto Patent Shofer</Button>
                            
                        <AddLejaModal show={this.state.addLejaShow}
                        onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }



}

