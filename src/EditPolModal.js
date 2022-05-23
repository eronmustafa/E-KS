import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditPolModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    // photofilename = "anonymous.png";
    // imagesrc = ' https://localhost:44357/api/Policia/SaveFile'+this.FotoEteDenuarit;

    componentDidMount(){
        fetch('https://localhost:44357/api/Policia')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('https://localhost:44357/api/Policia',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                PoliciaId:event.target.PoliciaId.value,   
                EmriDenuarit:event.target.EmriDenuarit.value,
                llojiIgjobes:event.target.llojiIgjobes.value,
                Data:event.target.Data.value,
                FotoEteDenuarit:this.FotoEteDenuarit

            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }


    handleFileSelected(event){
        event.preventDefault();
        this.FotoEteDenuarit=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "Photos",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch('https://localhost:44357/api/departamentiPolicia/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc='https://localhost:44357/api/departamentiPolicia/SaveFile'+result;
        },
        (error)=>{
            alert('Failed');
        })
        
    }

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header closeButton={true}>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Employee
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="PoliciaId">
                        <Form.Label>EmployeeId</Form.Label>
                        <Form.Control type="text" name="PoliciaId" required 
                        placeholder="PoliciaId"
                        disabled
                        defaultValue={this.props.empid}/>
                    </Form.Group>

                    <Form.Group controlId="EmriDenuarit">
                        <Form.Label>EmriDenuarit</Form.Label>
                        <Form.Control type="text" name="EmriDenuarit" required 
                        defaultValue={this.props.empname}
                        placeholder="EmriDenuarit"/>
                    </Form.Group>

                    <Form.Group controlId="llojiIgjobes">
                        <Form.Label>llojiIgjobes</Form.Label>
                        <Form.Control type="text" name="llojiIgjobes" required 
                        placeholder="Lloji i gjobes"/>
                    </Form.Group>
                
                    <Form.Group controlId="Data">
                        <Form.Label>DateOfJoining</Form.Label>
                        <Form.Control 
                        type="date"
                        name="Data"
                        required
                        placeholder="Data"
                        defaultValue={this.props.doj}
                        />

                    
                       
                        
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Ndrysho
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            {/* <Col sm={6}>
                <Image width="200px" height="200px" 
                src={'https://localhost:44357/api/Policia/SaveFile'+this.props.FotoEteDenuarit}/>
                <input onChange={this.handleFileSelected} type="File"/>
            </Col> */}
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}