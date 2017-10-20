  {/*Document   : View Address react component
    Created on : 13nd Oct, 2017, 19:00:11 PM
    Author     : Vikky <info@atapplication.com>
    Copyright  : Copyright (C) by AT APPLICATION*/   }



class ViewAddress extends React.Component{
    constructor(){
        super();
        this.state = { data: [] };
        this.getApproval = this.getApproval.bind(this);
      
    };
    
    componentDidMount() {
              
                    return  fetch('http://localhost:8070/fetchViewAddress', {    
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'}
                    }).then(function(response){
                       console.log(response.headers.get('Content-Type'));
                       console.log(response.status);
                       return response.json();
                    }).then( (json) => {
                                this.setState({data: json});
                    }).then(function(body) {
                   
                    // console.log(body);
                        //alert(eval(JSON.stringify(body)));
                        //alert(JSON.parse(JSON.stringify(body)));
                        return body;
                      }).catch(function(ex) {
                             console.log('parsing failed', ex);
                      });

            
  
     };
    
    getApproval(e){
        e.preventDefault();
        console.log("parsing failed");
        alert("hello");
        
    };
     
    render() {
    return (
            <div >
                <Admin />
                <div className="row">
                    <div className="col-sm-12">
                        
                            <table className="table table-condensed">
                                <thead>
                                    <tr>
                                        <th>UserName</th>
                                        <th>Country</th>
                                        <th>State</th>
                                        <th>City</th>
                                        <th>Address Type</th>
                                        <th>ApprovalStatus</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                        
                                <tbody>
                                           {this.state.data.map((address, i) => <TableRow key = {i} data = {address} />)}
                                </tbody>
                            </table>
                       
                     </div>
                 </div>
                
            </div>
        
      );
     }
    };
    
    class TableRow extends React.Component{
        render() {
        return (
               
            <tr>
                <td>{this.props.data.displayname}</td>
                <td>{this.props.data.country_name}</td>
                <td>{this.props.data.state_name}</td>
                <td>{this.props.data.city_name}</td>
                <td>{this.props.data.address_type}</td>
                <td>{this.props.data.approval_status}</td>
                
                <td>
                    <button className="btn btn-success" onClick={this.getApproval} value={this.props.data.id}>Approve</button>
               
                </td>
             </tr>
    );
         }
        
    };

class Admin extends React.Component{
        
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
                    
                                  
          
          
   


</div>

        
      );
     }
    };


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
  <ViewAddress />,
  document.getElementById('viewAddress')
);