  {/*Document   : LoginApp react component
    Created on : 1st Oct, 2017, 15:00:11 PM
    Author     : Vikky <info@atapplication.com>
    Copyright  : Copyright (C) by AT APPLICATION*/   }


class LoginApp extends React.Component{
        constructor(){
            super();
            this.state = { data: {} };
           
        };
        
         
        render() {
                    return (
                             
                    <div> 
                
                             <div className="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" ></div>
                             <div className="modal-dialog">
                                   <div className="loginmodal-container">
                                       <h1><b>OstopD Login</b></h1><br></br>
                                     <form action="http://localhost:8070/login" name="user_validation_form" id="user_validation_form" method="get">
                                       <input type="text" id="uname" ref="uname" name="uname" placeholder="Username"/>
                                       <input type="password" id="pass" ref="pass" name="pass" placeholder="Password"/>
                                       <label id="passvalid"></label>
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