import React from 'react';
import webApi from './api/webApi';
import $ from 'jquery';


export default class ClinicalMain extends React.Component {
    //quest = "newtest";
    constructor(props) {
        super(props);
        //this.state = {xvalue: "", myform: new FormData(this.form)};
        //this.body = new FormData(this.form);
        this.state = {xvalue: ""};
        this.reactStringify = this.reactStringify.bind(this);

        
        //this.quest = "testr";
        //this.state = {
        //    quest: props.ini
        //}
       // this.state = {
       //     selectedOption: ''
       // };
        // this binding is necessary to make 'this' work in the callback
        //this.radioChange = this.radioChange.bind(this);
        //let value = this.state.data.map(e=>JSON.stringify(e).replace(/{|}/g,''));
    }
    state = {
        clinical: [],
        user: '',
        rememberMe: false,
        id: '',
        quest: '',
        quest11: '',
        selectedOption : '',
        xvalue : '',
        body : '',
        myform : ''
    }
   
    radioChange = (e) => {
        this.setState({ selectedOption: e.currentTarget.value });       
        //const input = e.target;
        //const value = input.type === 'radio' ? input.checked : input.value;
        //this.setState({ [input.name]: value });
    }

    saveForm = () => {
        
        console.log('test');
    };


    reactStringify() {
        //this.
        let obj = {
            name:"bob",
            age: 4
        }

        //let value = //this.state.data.map(e=>JSON.stringify(e).replace(/{|}/g,''));
        console.log('in stringify');
        //let value = JSON.stringify(obj);
        //this.setState({xvalue: "foobar"})
        
        //this.setState({xvalue: JSON.stringify(obj)});
        
        //this.body = new FormData(this.form);
        //var x = this.setState({xvalue: JSON.stringify(this.body)});
        //console.log(this.body);
        // JSON.stringify(obj);

        //this.setState({xvalue: JSON.stringify(this.myform)});
        let myForm = document.getElementById('myForm');
        let formData = new FormData(myForm);
        var object = {};
        formData.forEach((value, key) => {object[key] = value});
        var json = JSON.stringify(object);
        this.setState({xvalue: json});


    }


    handleChange = (event) => {
        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;
        
        console.log('');

        this.setState({ [input.name]: value });
        
        //this.setState({[input.id]: value});
    }
    
    handleFormSubmit = () => {
        const { user, rememberMe, id, quest11, selectedOption} = this.state;
        localStorage.setItem('rememberMe', rememberMe);
        localStorage.setItem('id', rememberMe ? id : '');
        localStorage.setItem('user', rememberMe ? user : '');
        localStorage.setItem('quest11', quest11);
        localStorage.setItem('selectedOption', selectedOption);

    };






    createTable = () => {
        let table = []
    
        // Outer loop to create parent
        for (let i = 0; i < 3; i++) {
          let children = []
          //Inner loop to create children
          for (let j = 0; j < 5; j++) {
            children.push(<td>{`Column ${j + 1}`}</td>)
          }
          //Create the parent and add the children
          table.push(<tr>{children}</tr>)
        }
        return table
      }

      
    componentDidMount() {

        //const h1 = $('h1');
        //console.log(h1);
      
        const xvalue = '';
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const user = rememberMe ? localStorage.getItem('user') : '';
        const id = rememberMe ? localStorage.getItem('id') : '';
        const quest11 = rememberMe ? localStorage.getItem('quest11') : '';
        const selectedOption = rememberMe ? localStorage.getItem('selectedOption') : '';
        this.setState({ user, rememberMe, id, quest11, selectedOption, xvalue });
        //const quest = "";
        //console.log('test')
        //axios.get('http://localhost:65')
        webApi.get('clinical/questions')
            .then(res => {
                const clinical = res.data;
                this.setState({ clinical });
                console.log(res);
                console.log(res.data);
                //this.test = res.data;
                console.log(res.data[1]["quest_Text"]);
                //this.quest = res.data[1]["quest_Text"];
                //console.log('this.quest =' + this.quest);
                //this.setState({quest : res.data[1]["quest_Text"]});
                const quest = res.data[1]["quest_Text"];
                this.setState({ quest });  // this.quest = "sucks";
            })

            

            var f = $('form'), a = $('a'),
            i = $('input'), t = $('textarea');


            $('#salva').bind('click', function(evt) {
                var o = {}, v = t.val();
                
                //a.hide();
                i.each(function() { o[this.name] = $(this).val(); });
                if (v === '') {
                    t.val("[\n " + JSON.stringify(o) + " \n]")         
                }
                else {
                    t.val(v.substr(0, v.length - 3));
                    t.val(t.val() + ",\n " + JSON.stringify(o) +  " \n]")  
                }
            });

            
            $('#esporta').bind('click', function(evt) {
                var bb = new Blob([t.val()], { type: 'text/plain' });
                var a = document.createElement('a');
                a.download = 'download.json'; // customize download name
                a.href = window.URL.createObjectURL(bb);
                a.textContent = 'Download ready';
                a.style='display:none';
                a.click();    
            });
    }

    render() {
        return (
            <React.Fragment>
                
            
            <div className="container">
                <form onSubmit={this.handleFormSubmit}>
                <input type="hidden" name="id" value="Angela-C22276363"/>
                <label for="question11">{this.state.quest}</label> 
                <div class="form-check">
                    <input class="form-check-input" type="radio" value="Yes" name="quest11" checked={this.state.selectedOption ==="Yes"} onChange={this.radioChange} />
                    <label class="form-check-label" for="quest11">
                        Yes
                    </label>
                    </div>
                    <div class="form-check">
                    <input class="form-check-input" type="radio" name="quest11" value="No" checked={this.state.selectedOption ==="No"} onChange={this.radioChange}/> 
                    <label class="form-check-label" for="quest11">
                        No
                    </label>
                    </div>
                {/* <br/>
                <input type="radio" name="rad" value="1" />Yes
                <br/>
                <input type="radio" name="rad" value="0" />No */}
                <br/><br/>
                    <label>
                        User: <input name="user" value={this.state.user} onChange={this.handleChange}/>
                    </label>
                    <label>
                        <input name="rememberMe" checked={this.state.rememberMe} onChange={this.handleChange} type="checkbox"/> 
                    </label>
                    <button type="submit">Save</button>
                </form>
            {/* <form action="#" method="get" id="myForm">
            
            <br></br>
            <input type="text" name="textfield"/>
            Textfield
            <br/>
            <input type="number" name="numberfield" />
            Numberfield
            <br/>
            <input type="radio" name="radiofield" value="1" />
            <input type="radio" name="radiofield" value="2" />
            <input type="radio" name="radiofield" value="3" />
            Radiofields
            <br/>
            <input type="checkbox" name="checkfield"/>
            <input type="checkbox" name="checkfield2"/>
            <input type="checkbox" name="checkfield3"/>
            Checkboxes
            <br/>
            <select name="selectbox">
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            </select>
            Selectbox
            <br/>
            <textarea name="textarea"></textarea>
            Textarea
            <br/> */}

            {/* <h3>this.state.selectedOption: {this.state.selectedOption}</h3> */}
      
            <hr/>
            <button onClick={this.saveForm} id="_save">Save</button>
            <button id="_load">Load</button>
            <input type="reset"/>
            {/* </form> */}
            </div>
            <br/>
            <form id="myForm">

            <input id="username" name="username" type="text" />
            <input id="firstname" name="firstname" type="text" />
                        <button type="button" onClick={this.reactStringify} id="reactid">React stringify</button>
                        <button type="button" id="salva">json stringify</button>
                    </form>        

                    <textarea value={this.state.xvalue} defaultValue="" rows="10" cols="80"></textarea><br />
                    <button type="button" id="esporta">Export Data</button>
                    <a href="" style={{display: 'none'}}>Scarica Dati</a>
            </React.Fragment>
        )
    }


}

