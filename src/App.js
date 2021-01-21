import React, { Component } from 'react';

import axios from 'axios';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      dataInput: '',
      dataInputSubmit: '',
      isSubmit: false,
      open: false,
      checkbox: false

    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({
      dataInput: event.target.value
    })

  }

  onSubmit = (data) => {
    console.log("Hello");
    console.log(data);
    const { dataInput } = this.state;

    data.preventDefault();
    this.setState({
      isSubmit: true,
      dataInputSubmit: dataInput,
      dataInput: ''

    })
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    })
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  };

  onDelete = () => {
    console.log("Hello Delete")
    this.setState({
      dataInputSubmit: ''
    });
    // Xoa va Close
    this.handleClose();
  }

  changeCheckBox = () => {
    console.log('Hello Check box');
    let { checkbox, dataInputSubmit } = this.state;
    checkbox = !checkbox;
    if(checkbox === true) {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/datainput',
        data: {
          name : dataInputSubmit
        }
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
      ;
    }
    this.setState({
      checkbox: checkbox
    })

    console.log(checkbox);
  }



  render() {
    const { isSubmit, dataInput, dataInputSubmit, open } = this.state;
    return (
      <div>
        <form onSubmit={ this.onSubmit }>
          <label>Nhap data</label>
          <br/>
          <input type="text" onChange={ this.onInputChange } value={ dataInput }/>
        </form>

        <div>
          <h5>List Option</h5>
          <input type="checkbox" onChange={ this.changeCheckBox } />
          <label> { isSubmit ? dataInputSubmit : ''} </label>
          <br/>
          <div>
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
              Delete
            </Button>
            <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Bạn Có Muốn Xóa Không?</DialogTitle>

              <DialogActions>
                <Button onClick={this.onDelete} color="primary">
                  Xóa
                </Button>
                <Button onClick={this.handleClose} color="primary">
                  Hủy Bỏ
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    )
  }
}


export default App;