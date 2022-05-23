import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddPolModal} from './AddPolModal';
import {EditPolModal} from './EditPolModal';

export class Policia extends Component{

    state= {
        loading:true,
        person:null,
        emps:[],
        addModalShow:false, 
        editModalShow:false
    };



async componentDidMount(){
    const url ="https://localhost:44357/api/policia";
    const response =await fetch(url);
    const data = await response.json();
    this.setState({emps:data, loading:false});
    
}
deleteEmp(empid){
    if(window.confirm('Are you sure?')){
        fetch('https://localhost:44357/api/Policia/'+empid,{
            method:'DELETE',
            header:{'Accept':'application/json',
        'Content-Type':'application/json'}
        })
    }
}

render(){
const {emps, empid,empname,depmt,photofilename,doj}=this.state;
        let addModalClose=()=>this.setState({addPolShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                        <th>Emri i te denuarit</th>
                        <th>Lloji i gjobes</th>
                        <th>Data</th>
                        <th>Foto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.PoliciaId}>
                                <td>{emp.PoliciaId}</td>
                                <td>{emp.EmriDenuarit}</td>
                                <td>{emp.llojiIgjobes}</td>
                                <td>{emp.Data}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="primary"
    onClick={()=>this.setState({editModalShow:true,
        empid:emp.PoliciaId,empname:emp.EmriDenuarit,depmt:emp.llojiIgjobes,
        photofilename:emp.PhotoFileName,doj:emp.DateOfJoining})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(emp.PoliciaId)}>
            Delete
        </Button>

        <EditPolModal show={this.state.editModalShow}
        onHide={editModalClose}
        empid={empid}
        empname={empname}
        depmt={depmt}
        photofilename={photofilename}
        doj={doj}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='success'
                    onClick={()=>this.setState({addPolShow:true})}>
                    Shto Gjobe</Button>
                            
                        <AddPolModal show={this.state.addPolShow}
                        onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }



}

