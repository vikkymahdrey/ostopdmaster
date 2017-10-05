  {/*Document   : UsrProfile react component
    Created on : 4th Oct, 2017, 15:00:11 PM
    Author     : Vikky <info@atapplication.com>
    Copyright  : Copyright (C) by AT APPLICATION*/   }

class UserProfile extends React.Component{
        
    render() {
    return (
            
            <div className="container-fluid">
              <nav className="navbar navbar-inverse">
                <div className="navbar-header">
                    <a href="#"><img src="../images/home.jpg"></img></a>
                </div>

                <ul className="nav navbar-nav">
                  <li><a href="ostopD"><b>Home</b></a></li>
                  <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"><b>Address</b><span class="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><a href="/getPermAdd"><span className="glyphicon glyphicon-send"><b>&nbsp;Permanent</b></span></a></li>
                      
                    </ul>
                  </li>
                      <li><a href="/getHotels"><b>Hotels</b></a></li>   
                      <li><a href="/getRestaurants"><b>Restaurants</b></a></li>  
                      <li><a href="#"><b>UserProfile</b></a></li> 
                </ul>
                 <ul className="nav navbar-nav navbar-right">
                   <li><a href="#"><span className="glyphicon glyphicon-user"></span><b> Welcome OstopD Team</b></a></li>
                   <li className="log"><a href="/"><span className="glyphicon glyphicon-log-in"></span><b>Logout&nbsp;</b></a></li>
                </ul>
             </nav>
                      
                      <div id="id01" className="modal">
                              <span onclick="document.getElementById('id01').style.display='none'" className="close" title="Close Modal">×</span>
                                  <form class="modal-content animate" action="/action_page.php">
                                      <div className="container">
                                          <label><b>Email</b></label>
                                          <input type="text" placeholder="Enter Email" name="email" required/>
                
                                          <label><b>Password</b></label>
                                          <input type="password" placeholder="Enter Password" name="psw" required/>
                
                                          <label><b>Repeat Password</b></label>
                                          <input type="password" placeholder="Repeat Password" name="psw-repeat" required/>
                                          <input type="checkbox" checked="checked"/> Remember me
                                          <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

                                              <div class="clearfix">
                                                <button type="button" onclick="document.getElementById('id01').style.display='none'" className="cancelbtn">Cancel</button>
                                                <button type="submit" className="signupbtn">Sign Up</button>
                                              </div>
                                         </div>
                                  </form>
                         </div>
                    
        

<Footer/>
</div>

        
      );
     }
    }


class Footer extends React.Component{
    render() {
            return (
                    <div className="footer-wrap">
                                
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                         <p className="text-12"><b>All Content © 2017 At application LLP</b></p>
                                     </div>
                                </div>
                                
                    </div>
                   );
             }
    
};
    

ReactDOM.render(
  <UserProfile />,
  document.getElementById('profile')
);