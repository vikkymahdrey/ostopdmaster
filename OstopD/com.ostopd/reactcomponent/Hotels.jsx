  {/*Document   : Hotels react component
    Created on : 4th Oct, 2017, 11:00:11 PM
    Author     : Vikky <info@atapplication.com>
    Copyright  : Copyright (C) by AT APPLICATION*/   }

class Hotels extends React.Component{
        
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
                      <li><a href="#"><b>Hotels</b></a></li>   
                      <li><a href="/getRestaurants"><b>Restaurants</b></a></li>  
                      <li><a href="/getProfile"><b>UserProfile</b></a></li> 
                </ul>
                 <ul className="nav navbar-nav navbar-right">
                   <li><a href="#"><span className="glyphicon glyphicon-user"></span><b> Welcome OstopD Team</b></a></li>
                   <li className="log"><a href="/"><span className="glyphicon glyphicon-log-in"></span><b>Logout&nbsp;</b></a></li>
                </ul>
             </nav>
                      
             <div className="form-group border well">          
                      <form action="/infoSubmit" name="inputFieldForm" enctype="multipart/form-data" method="post">
                                           
                          <div className="row">
                          
                              <div className="col-sm-3">
                                    <label>Country:</label><br/>
                                    <select id="cId" name="cId" onchange="getDevId(this.form.cId.value)">
                                      <option value="0">---Select Country---</option>
                                      <option value="1">India</option>
                                      <option value="2">America</option>
                                      <option value="3">Japan</option>
                                                                    
                                   </select>   
                                   
                              </div>
                            
                               <div className="col-sm-3">
                                      <label>State:</label><br/>
                                      <select id="sId" name="sId" onchange="getDevId(this.form.sId.value)">
                                        <option value="0">---Select State---</option>
                                        <option value="1">Delhi</option>
                                        <option value="3">California</option>  
                                        <option value="2">Karanataka</option>
                                        <option value="3">Bihar</option>
                                        <option value="3">Rajesthan</option>
                                        <option value="3">Florida</option>                             
                                     </select>   
                                     
                              </div>
                                       
                              <div className="col-sm-3">
                              <label>City:</label><br/>
                                        <select id="cId" name="cId" onchange="getDevId(this.form.cId.value)">
                                          <option value="0">---Select City---</option>
                                          <option value="1">Delhi</option>
                                          <option value="2">Los Angels</option>
                                          <option value="2">Bangalore</option>
                                          <option value="2">San Jose</option>
                                          <option value="3">Japan</option>
                                                                        
                                       </select>   
                                       
                              </div>
                                          
                              <div className="col-sm-3">
                                          <label>Address-type:</label><br/>
                                                   <select id="cId" name="cId" onchange="getDevId(this.form.cId.value)">
                                                      <option value="0">---Select Type---</option>
                                                      <option value="1">Hotel</option>
                                                      <option value="2">Restaurant</option>
                                                                                    
                                                   </select>   
                                                   
                             </div>
                               
                                
                          </div>  <br/><br/>
                                          
                          <div className="row">
                                     <div className="col-sm-6 text-right">                        
                                                <input type="button" className="btn btn-primary text-right" value="Search"/> 
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
  <Hotels />,
  document.getElementById('hotels')
);