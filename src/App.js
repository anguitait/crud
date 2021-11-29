import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  { id: 1, nombres: "Luis Alberto", apellidos: "Anguita Fernández", edad: 34, run: "16.534.406-5"},
  { id: 2, nombres: "Pepe", apellidos: "Rojas", edad: 34, run: "16.666.666-6"}
];
class App extends React.Component {
  state = {
    data: data,
    form:{
      id:'',
      nombres:'',
      apellidos:'',
      edad:'',
      run:''
    },
    modalCreate : false,
    modalEdit: false,
  }
handleChange=e=>{
  this.setState({
    form:{
      ...this.state.form,
      [e.target.name]: e.target.value,
    }
  })
}
showCreateModal=()=>{
  this.setState({modalCreate:true});
}
hideCreateModal=()=>{
  this.setState({modalCreate:false});
}
showEditModal=(record)=>{
  this.setState({modalEdit:true, form:record});
}
hideEditModal=()=>{
  this.setState({modalEdit:false});
}
createUser=()=>{
  var newValue = {...this.state.form};
  newValue.id = this.state.data.length+1;
  var list = this.state.data;
  list.push(newValue);
  this.setState({data: list, modalCreate:false});
}
editUser=(newUser)=>{
  var i=0;
  var list = this.state.data;
  list.map((record)=>{
    if(newUser.id === record.id){
      list[i].nombres = newUser.nombres;
      list[i].apellidos = newUser.apellidos;
      list[i].edad = newUser.edad;
      list[i].run = newUser.run;
    }
    i++;
  });
  this.setState({data: list, modalEdit:false});
}

delete=(user)=>{
  var option = window.confirm("¿Desea continuar con la eliminación?");
  if(option){
    var i = 0;
    var list = this.state.data;
    list.map((record)=>{
      if(record.id === user.id){
        list.splice(i);
      }
      i++
    });
    this.setState({data: list});
  }
}
  render(){
    return (
    <>
    <br />
    <Container>
    <Button color="success" onClick={()=>this.showCreateModal()}>Crear Nuevo Usuario</Button>
    <br /><br />
    <Table>
      <thead>
          <tr>
              <th>Id</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Edad</th>
              <th>RUN</th>
              <th>Acciones</th>
          </tr>
      </thead>
      <tbody >
        {this.state.data.map((user)=>(
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.nombres}</td>
            <td>{user.apellidos}</td>
            <td>{user.edad}</td>
            <td>{user.run}</td>
            <td>
              <Button color="primary" onClick={()=>this.showEditModal(user)}>Editar</Button> {"  "}
              <Button color="danger" onClick={()=>this.delete(user)}>Eliminar</Button>
            </td>
          </tr> 
    ))}
      </tbody>
    </Table>
    </Container>
    <Modal isOpen={this.state.modalCreate}>
          <ModalHeader>
            <div>
              <h3>Crear Nuevo Usuario</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label> 
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Nombres: 
              </label>
              <input
                className="form-control"
                name="nombres"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Apellidos: 
              </label>
              <input
                className="form-control"
                name="apellidos"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Edad: 
              </label>
              <input
                className="form-control"
                name="edad"
                type="number"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                RUN: 
              </label>
              <input
                className="form-control"
                name="run"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button onClick={()=> this.createUser()}
              color="success"
            >
              Aceptar y Confirmar
            </Button>
            <Button onClick={()=>this.hideCreateModal()}
              color="danger"
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
        {/*MODAL EDITAR*/}
        <Modal isOpen={this.state.modalEdit}>
          <ModalHeader>
            <div>
              <h3>Editar Usuario</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>            
            <FormGroup>
              <label>
                Nombres: 
              </label>
              <input
                className="form-control"
                name="nombres"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombres}
              />
            </FormGroup>            
            <FormGroup>
              <label>
                Apellidos: 
              </label>
              <input
                className="form-control"
                name="apellidos"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.apellidos}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Edad: 
              </label>
              <input
                className="form-control"
                name="edad"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.edad}
              />
            </FormGroup>
            <FormGroup>
              <label>
                RUN: 
              </label>
              <input
                className="form-control"
                name="run"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.run}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editUser(this.state.form)}
            >
              Aceptar y Confirmar
            </Button>
            <Button
              color="danger"
              onClick={() => this.hideEditModal()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
    </>
    )
  }
}

export default App;
