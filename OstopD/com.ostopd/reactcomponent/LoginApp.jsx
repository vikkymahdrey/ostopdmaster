  {/*Document   : LoginApp react component
    Created on : 1st Oct, 2017, 15:00:11 PM
    Author     : Vikky <info@atapplication.com>
    Copyright  : Copyright (C) by AT APPLICATION*/   }


class LoginApp extends React.Component{
        constructor(){
            super();
            this.state = { data: {} };
            this.login = this.login.bind(this);
        };

        /* onSubmit fetch call */
        login(e){
                e.preventDefault();
                 
                var uname=this.refs.uname.value;
                var pass=this.refs.pass.value;
                    console.log("uname: ");
                    console.log("pass: ",pass);
               
               /*validating input fields*/     
               if(uname==""){
                    alert("Username should not emptty - please try again!");
               }else if (pass==""){
                     alert("Password should not emptty - please try again!");
               }else{
                    
                        return  fetch('http://localhost:8070/login', {    
                            method: 'POST',
                            headers: {'Content-Type': 'application/json;charset=utf-8'},
                            body: JSON.stringify({
                            'uname': uname,
                            'pass' : pass
                            })
                        }).then(function(res) {
                            return res.json();
                        }).then(function(json) {
                           // alert(json);
                           if(json!=0){
                               
                               window.open('http://localhost:8070/home/'+json, '_self');
                                                         
                            }else{
                                alert("Invalid username or password,please try again!"); 
                            }   
                           
                        });
                }
        };
    
        render() {
                    return (
                             
                    <div> 
                
                             <div className="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" ></div>
                             <div className="modal-dialog">
                                   <div className="loginmodal-container">
                                       <h1><b>OstopD Login</b></h1><br></br>
                                     <form onSubmit={this.login} name="user_validation_form" id="user_validation_form" method="post">
                                       <input type="text" id="uname" ref="uname" name="uname" placeholder="Username"/>
                                       <input type="password" id="pass" ref="pass" name="pass" placeholder="Password"/>
                                       <input type="submit" name="login" className="login loginmodal-submit" value="Login"/>
                                     </form>
                                       
                                     <div className="login-help">
                                       <a href="#">Register</a> - <a href="#">Forgot Password</a>
                                     </div>
                                   </div>
                             </div>
                    </div>
                             );
                }
 };/*react end*/

     //export default LoginApp;
 
ReactDOM.render(
  <LoginApp />,
  document.getElementById('ostopd')
);