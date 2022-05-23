import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';





export class Navigation extends Component{
    render(){
        return(
            <Navbar bg="info" expand="lg" >
            <Navbar.Toggle aria-controls="nav nav-pills"/>
            <Navbar.Collapse id="nav nav-pills">
            <Nav>
            <NavLink className="d-inline p-2 .bg-info  text-dark" to="/">
            <strong>Home</strong>
            </NavLink>
           
            <NavLink className="d-inline p-2 .bg-info text-dark " to="/Policia">
                <strong>Sherbimet e Policise</strong>
            </NavLink>
            
            <NavLink className="d-inline p-2 .bg-info text-dark" to="/Leja">
                <strong>Patent Shoferi</strong>
            </NavLink>

            <NavLink className="d-inline p-2 .bg-info text-dark" to="/Vaksina">
                <strong> Personat e Vaksinuar</strong>
            </NavLink>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
        )
    }
}