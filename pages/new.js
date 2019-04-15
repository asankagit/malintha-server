import React, { Component } from 'react';
import { Form, Button, Input, Message, Card, CardContent, CardMedia, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import Layout from './../components/Layout';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios';
import axios from 'axios';
// import { apiCall } from '../helpers/CurlReq';

// var apicall = require('./../helpers/CurlReq')

class AddImage extends Component {
    // function(){
    //     apiCall(null,'http://localhost:3001/drive/imagedata').then((data)=>{
    //         console.log("newjs",data);
    //     }).cath((e)=>{
    //         console.log("newjs error",e);
    //     });
    // }

    constructor() {
        super();
        this.state = { load:false,date: '', title: '', description: '', imageurl: '', imageid: '' }
        this.imgurl = React.createRef();
        this.saveToFirebase = this.saveToFirebase.bind(this);
        // this.imgidRef = React.createRef();
        this.imgidRef = null;
        this.setTextInputRef = element => {
            this.imgidRef = element;
          };
        this.imageID = React.createRef();
    }

    componentDidMount() {
        this.setState({load:true});
        console.log("refs",this.refs,"imgidRef",this.imgidRef)
        // this.imgidRef.current.focusTextInput(); 
        this.setState({imageid: " "});
        
 
    
    }


    saveToFirebase() {
        console.log("imageID ref",this.imageID)
        console.log(this.refs, this.imageurl, this.state)
        if(this.state.load)
        axios.put('http://localhost:3001/fb/' + this.state.date + '/' + this.state.imageid,
            { title: this.state.title, url: this.state.imageurl, description: this.state.description })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (
            <Layout>
                <div>
                    <Get url="http://localhost:3001/drive/imagedata" >
                        {(error, response, isLoading, onReload) => {
                            if (error) {
                                return (<div>Something bad happened: {error.message} <button onClick={() => onReload({ params: { reload: true } })}>Retry</button></div>)
                            }
                            else if (isLoading) {
                                return (<div>Loading...</div>)
                            }
                            else if (response !== null) {
                                return (
                                    <div>
                                        <div class="ui grid">
                                            <div class="three column row">
                                                <div class="column">
                                                    {
                                                        response.data.map((obj) => {
                                                            return (
                                                                // <div>
                                                                //     <p>{obj.name}</p>
                                                                //     <p>{obj.id}</p>
                                                                // </div>

                                                                <Get url={"http://localhost:3001/drive/imageurl/" + obj.id} params={{ id: "12345" }}>
                                                                    {(error, response, isLoading, onReload) => {
                                                                        if (error) {
                                                                            return (<div>Something bad happened: {error.message} <button onClick={() => onReload({ params: { reload: true } })}>Retry</button></div>)
                                                                        }
                                                                        else if (isLoading) {
                                                                            return (<div>Loading...</div>)
                                                                        }
                                                                        else if (response !== null) {
                                                                            return (
                                                                                <div>

                                                                                    <Card>
                                                                                        <img src={response.data} />

                                                                                        <CardContent >

                                                                                            <div>Edite & Post your Item</div>
                                                                                            {/* <form onSubmit={this.saveToFirebase()}> */}

                                                                                            <Input ref={this.props.onMounted} onChange={
                                                                                                (e)=>{
                                                                                                    
                                                                                                    this.setState({imageid:e.target.value})
                                                                                                }
                                                                                            } value={obj.id} />
                                                                                           
                                                                                            <Input ref={this.props.onMounted}  
                                                                                            onChange={
                                                                                                (e)=>{
                                                                                                    this.setState({imageurl:e.target.value})
                                                                                                    console.log(e.target.value)
                                                                                                }
                                                                                            } value={response.data} />
                                                                                            <Input ref={this.props.onMounted} 
                                                                                            onChange={
                                                                                                (e)=>{
                                                                                                    this.setState({title:e.target.value})
                                                                                                    console.log(e.target.value)
                                                                                                }
                                                                                            }placeholder="Enter title" />
                                                                                            <Input 
                                                                                            
                                                                                            ref={(d)=>this.imageID=d}

                                                                                            onChange={
                                                                                                (e)=>{
                                                                                                    this.setState({date:e.target.value})
                                                                                                    console.log(e.target.value)
                                                                                                }
                                                                                            }placeholder="date tag" />
                                                                                            <Input ref={this.props.onMounted} 
                                                                                            onChange={
                                                                                                (e)=>{
                                                                                                    this.setState({description:e.target.value})
                                                                                                    console.log(e.target.value)
                                                                                                }
                                                                                            }
                                                                                            placeholder="Enter description" />
                                                                                            <button onClick={() => { this.saveToFirebase() }}>Save</button>
                                                                                            <button>Submit</button>
                                                                                            {/* </form> */}
                                                                                        </CardContent>
                                                                                        <button onClick={() => onReload()}>ReLoad</button>
                                                                                    </Card>


                                                                                </div>)
                                                                        }
                                                                        return (<div>Default message before request is made.</div>)
                                                                    }}
                                                                </Get>
                                                            )
                                                        })
                                                    }
                                                    data here

                                        <button onClick={() => onReload({ params: { refresh: true } })}>Refresh</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            }
                            return (<div>Default message before request is made.</div>)
                        }}
                    </Get>
                </div>
                <Card>
                    <img src="https://s.gravatar.com/avatar/408e61befbf49e229eb2afaff91fe79c?size=100&default=retro" />
                    <CardContent>

                        <div>Edite & Post your Item</div>
                        <Input defaultValue="Enter title" />
                        <Input defaultValue="Enter description" />
                    </CardContent>
                </Card>
            </Layout>
        );
    }

}
export default AddImage;

