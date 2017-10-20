  {/*Document   : Admin react component
    Created on : 3nd Oct, 2017, 19:00:11 PM
    Author     : Vikky <info@atapplication.com>
    Copyright  : Copyright (C) by AT APPLICATION*/   }



class Admin extends React.Component{
    constructor(){
        super();
        this.state = { data: [] };
      
    };
    
    /*componentDidMount(){
        console.log('Component WILL MOUNT!')
       return fetch('http://localhost:8070/getUserById', {    
            method: 'GET'                     
        }).then(function(res){
            return res.json();
        }).then(function(json){
            alert(json);
                     
        });
        
     };*/
     
    render() {
    return (
          
            <div className="container-fluid">
              <nav className="navbar navbar-inverse">
                <div className="navbar-header">
                    <a href="#"><img src="../images/home.jpg"></img></a>
                </div>

                <ul className="nav navbar-nav">
                  
                  <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"><b>User Mgmt</b><span class="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><a href="/getAddressStatus"><span className="glyphicon glyphicon-send"><b>&nbsp;ViewAddress</b></span></a></li>
                    </ul>
                  </li>                      
                      
                      
                  
                </ul>
                 <ul className="nav navbar-nav navbar-right">
                   
                   <li className="log"><a href="/"><span className="glyphicon glyphicon-log-in"></span><b>Logout&nbsp;</b></a></li>
                </ul>
                      
                      
             </nav>
    
                              
                                  
          
          
   

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
  <Admin />,
  document.getElementById('admin')
);