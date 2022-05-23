import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditVaksinaModal extends Component{
    constructor(props){
        super(props);
        this.state={vak:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    // photofilename = "anonymous.png";
    // imagesrc = ' https://localhost:44357/api/Policia/SaveFile'+this.FotoEteDenuarit;

    componentDidMount(){
        fetch('https://localhost:44357/api/Vaksina')
        .then(response=>response.json())
        .then(data=>{
            this.setState({vak:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('https://localhost:44357/api/Vaksina',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:event.target.Id.value,
                Emri:event.target.Emri.value,
                NumriIVaksinuarit:event.target.NumriIVaksinuarit.value,
                Vendlindja:event.target.Vendlindja.value,
                LlojiVaksines:event.target.LlojiVaksines.value,
                DataVaksinimit:event.target.DataVaksinimit.value,
                Mjeku :event.target.Mjeku.value,
                NrIDozave :event.target.NrIDozave.value
                

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
            Edit Personin e vaksinuar
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
      
            
           
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="Id">
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text" name="Id" required 
                        placeholder="Id"
                        disabled
                        defaultValue={this.props.vakid}/>
                    </Form.Group>

                    <Form.Group controlId="Emri">
                        <Form.Label>Emri</Form.Label>
                        <Form.Control type="text" name="Emri" required 
                        defaultValue={this.props.vakname}
                        placeholder="Emri"/>
                    </Form.Group>

                    <Form.Group controlId="NumriIVaksinuarit">
                        <Form.Label>NumriIVaksinuarit</Form.Label>
                        <Form.Control type="text" name="NumriIVaksinuarit" required 
                        defaultValue={this.props.nrVaks}
                        placeholder="NumriIVaksinuarit"/>
                    </Form.Group>

                    <Form.Group controlId="Vendlindja">
                        <Form.Label>vendlindja</Form.Label>
                        <Form.Control type="text" name="Vendlindja" required 
                        defaultValue={this.props.vendlindja}
                        placeholder="Vendlindja"/>
                    </Form.Group>

                    <Form.Group controlId="LlojiVaksines">
                        <Form.Label>LlojiVaksines</Form.Label>
                        <Form.Control type="text" name="LlojiVaksines" required 
                        defaultValue={this.props.LlojiVaks}
                        placeholder="LlojiVaksines"/>
                    </Form.Group>

                    <Form.Group controlId="DataVaksinimit">
                        <Form.Label>DataVaksinimit</Form.Label>
                        <Form.Control 
                        type="date"
                        name="DataVaksinimit"
                        required
                        placeholder="Data"
                        defaultValue={this.props.DataVaks}
                        />
                    </Form.Group>

                    <Form.Group controlId="Mjeku">
                        <Form.Label>Mjeku</Form.Label>
                        <Form.Control type="text" name="Mjeku" required 
                        defaultValue={this.props.Mjek}
                        placeholder="Mjeku"/>
                    </Form.Group>
                    <Form.Group controlId="NrIDozave">
                        <Form.Label>NrIDozave</Form.Label>
                        <Form.Control type="text" name="NrIDozave" required 
                        defaultValue={this.props.NrIDoz}
                        placeholder="NrIDozave"/>
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