import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class AddVaksinaModal extends Component{
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
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:null,
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
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Policia/SaveFile',{
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
    
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Shto Person te vaksinuar
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
           
           
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="Emri">
                        <Form.Label>Emri</Form.Label>
                        <Form.Control type="text" name="Emri" required 
                        placeholder="Emri i personit te vaksinuar"/>
                    </Form.Group>

                    <Form.Group controlId="NumriIVaksinuarit">
                        <Form.Label>NumriIVaksinuarit</Form.Label>
                        <Form.Control type="text" name="NumriIVaksinuarit" required 
                        placeholder="Numri identifikues i te vaksinuarit"/>
                    </Form.Group>

                    <Form.Group controlId="Vendlindja">
                        <Form.Label>Vendlindja</Form.Label>
                        <Form.Control type="text" name="Vendlindja" required 
                        placeholder="Vendlindja"/>
                    </Form.Group>
                    
                    <Form.Group controlId="LlojiVaksines">
                        <Form.Label>LlojiVaksines</Form.Label>
                        <Form.Control type="text" name="LlojiVaksines" required 
                        placeholder="LlojiVaksines"/>
                    </Form.Group>



                    
                    <Form.Group controlId="DataVaksinimit">
                        <Form.Label>DataVaksinimit</Form.Label>
                        <Form.Control 
                        type="date"
                        name="DataVaksinimit"
                        required
                        placeholder="DataVaksinimit"
                        />
                    
                        
                    </Form.Group>
                    <Form.Group controlId="Mjeku">
                        <Form.Label>Mjeku</Form.Label>
                        <Form.Control type="text" name="Mjeku" required 
                        placeholder="Mjeku"/>
                    </Form.Group>
                    <Form.Group controlId="NrIDozave">
                        <Form.Label>NrIDozave</Form.Label>
                        <Form.Control type="text" name="NrIDozave" required 
                        placeholder="NrIDozave"/>
                    </Form.Group>


                    
                    
                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Shto 
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            {/* <Col sm={6}>
                <Image width="200px" height="200px" src={this.imagesrc}/>
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