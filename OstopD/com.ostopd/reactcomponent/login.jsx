  /* Document   : Login React Component
    Created on : 29th Sept 2017, 19:30:11 PM
    Author     : Vikky <info@atapplication.com>
    Copyright  : Copyright (C) by AT APPLICATION LLP*/ 

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
    
                return  fetch('http://60.243.246.122:8181/MedicalPortal/userLogin', {    
                    method: 'POST',
                    headers: {'Content-Type': 'application/json;charset=utf-8'},
                    body: JSON.stringify({
                    'uname': uname,
                    'pass' : pass
                    })
                }).then(response => response.json().then(body => ({ response, body })))
                  .then(({ response, body }) => {
                        if (response.ok) {
                                console.log(response.headers.get('Content-Type'));
                                console.log(response.headers.get('Date'));
                                console.log(response.status);
                                console.log(response.statusText);
                          window.open('http://60.243.246.122:8181/MedicalPortal/adminHome', '_self');
                        }
                   });
        };
    
  render() {
    return (
             
              <div> 

   <div className="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" ></div>
             <div className="modal-dialog">
                   <div className="loginmodal-container">
                       <h1><b>OstopD Login</b></h1><br></br>
                     <form>
                       <input type="text" name="user" placeholder="Username"/>
                       <input type="password" name="pass" placeholder="Password"/>
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
 };/*react class end*/


ReactDOM.render(
  <LoginApp />,
  document.getElementById('ostopd')
);