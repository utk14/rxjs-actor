/*eslint react/jsx-filename-extension: 0 */
/* eslint react/forbid-prop-types: 0 */

import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import HomePageComponent from './HomePageComponent';
import ProgressBar from './loadingSpinner';
import queryString from "query-string";
import '../styles/AddGitUrl.css';

import * as Rx from 'rxjs';
import { filter, map } from 'rxjs/operators';


class AddGitURL extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            context: '',
            printResponse: ''
        }
    }

    componentDidMount() {
        // const token = queryString.parse(this.props.location.search).token;
        // if (!token) {
        //     window.localStorage.setItem("jwt",token);
        //     this.props.history.push("/");
        // }
        
        console.log('before rxjs');
        Rx.fromEvent(document.getElementById("outlined-email-input"), "click")
        .pipe(map(() => {
           console.log('inside map');
           return document.getElementById("outlined-email-input2").value;
         }),
           filter((data) => {
               return data !== ""
           }))
        .subscribe((data) => {
        console.log("data", data);
        const url = data;
        fetch(`/deploy`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: url
        })
        .then(res => res.json())
        .then(res => {
            console.log('condition', res);
            console.log('before: ',this.state.context);
            if(res){
                this.setState({context: '', printResponse:(<p>URL deployed successfully : {res}</p>)})    
            }
            console.log('after: ',this.state.context);
            document.getElementById("outlined-email-input2").value = ''
            return res;
        })
        .then(res => console.log('this is res: ',res))
        })
        console.log('after rxjs');   
    } 
        
    
    handleClickButton = ()  => {
        console.log('inside handleClickButton', this.state.loading);
        if(document.getElementById("outlined-email-input2").value){
            this.setState({
                context: <ProgressBar />

            })    
        } 
    }

    clearResult = () => {
        this.setState({
            printResponse: ''
        })
    }
    
    render() {
        const { context,printResponse } = this.state;
        return (
            <div className="main">
                <HomePageComponent/>
                <Paper className="root1" elevation={20}>
                    <div className="text1">
                        <TextField
                            id="outlined-email-input2"
                            label="GitURL"
                            className="textField1"
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                            onFocus={this.clearResult}
                        />

                        <Button 
                            variant="outlined" 
                            color="primary" 
                            className="button1" 
                            id="outlined-email-input" 
                            name="buttonSubmit"
                            onClick={this.handleClickButton} 
                        > 
                            Deploy     
                        </Button>
                        { context }
                        { printResponse }
                    </div>
                </Paper>
            </div>
        )
        
    }
}


export default AddGitURL;


	
	
	
