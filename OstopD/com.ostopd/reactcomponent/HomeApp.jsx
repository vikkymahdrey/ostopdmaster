  {/*Document   : HomeApp react component
    Created on : 3nd Oct, 2017, 19:00:11 PM
    Author     : Vikky <info@atapplication.com>
    Copyright  : Copyright (C) by AT APPLICATION*/   }



class HomeApp extends React.Component{
    componentWillMount() {
        console.log('Component WILL MOUNT!')
         {/*Session.get('userId')*/}
     };
    render() {
    return (
            
            <div className="container-fluid">
              <nav className="navbar navbar-inverse">
                <div className="navbar-header">
                    <a href="#"><img src="../images/home.jpg"></img></a>
                </div>

                <ul className="nav navbar-nav">
                  <li><a href="#"><b>Home</b></a></li>
                  <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"><b>Address</b><span class="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><a href="/getPermAdd"><span className="glyphicon glyphicon-send"><b>&nbsp;Permanent</b></span></a></li>
                    </ul>
                  </li>
                    
                      <li><a href="/getHotels"><b>Hotels</b></a></li>   
                      <li><a href="/getRestaurants"><b>Restaurants</b></a></li>  
                      <li><a href="/getProfile"><b>UserProfile</b></a></li>  
                      
                      
                      
                  
                </ul>
                 <ul className="nav navbar-nav navbar-right">
                   <li><a href="#"><span className="glyphicon glyphicon-user"></span><b> Welcome ostopd_admin</b></a></li>
                   <li className="log"><a href="/"><span className="glyphicon glyphicon-log-in"></span><b>Logout&nbsp;</b></a></li>
                </ul>
                      
                      
             </nav>
    
                              
                                    
                <div className="form-group border well">
                    
                        <div className="row">
                            <div className="col-sm-12">
                                <span className="glyphicon glyphicon-info-sign"><b>Personal-Information</b></span>
                            </div>
                        </div><br/><br/><br/>
                    
                    
                    
                  
                    <div className="row">
                        <div className="col-md-2 col-sm-5 col-xs-6 mar-top-15 text-lightgrey"><span className="glyphicon glyphicon-user">&nbsp;FirstName:</span></div>
                        <div className="col-md-2 col-sm-5 col-xs-6 mar-top-15">OstopD</div>
                        
                        <div className="col-md-2 col-sm-5 col-xs-6 mar-top-15 col-md-offset-2 text-lightgrey"><span className="glyphicon glyphicon-user">&nbsp;LastName:</span></div>
                        <div className="col-md-2 col-sm-7 col-xs-6 mar-top-15">Team</div>                        
                    </div><br/>
                    
                                    
                    
                    <div className="row">
                        
                        <div className="col-md-2 col-sm-5 col-xs-6 mar-top-15 text-lightgrey "><span className="glyphicon glyphicon-envelope">&nbsp;Email:</span></div>
                        <div className="col-md-2 col-sm-5 col-xs-6 mar-top-15 ">info@atapplication.com</div>
                        
                        <div className="col-md-2 col-sm-5 col-xs-6 mar-top-15 col-md-offset-2 text-lightgrey"><span className="glyphicon glyphicon-modal-window">&nbsp;Mobile No:</span></div>
                        <div className="col-md-2 col-sm-5 col-xs-6 mar-top-15">+91 9620300915</div>                      
                    </div>
                                           
              </div><br/> <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>  
          
   

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
  <HomeApp />,
  document.getElementById('home')
);