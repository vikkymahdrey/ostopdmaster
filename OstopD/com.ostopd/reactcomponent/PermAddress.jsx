  {/*Document   : PermAddress View
    Created on : 1st Oct, 2017, 15:00:11 PM
    Author     : Vikky <info@atapplication.com>
    Copyright  : Copyright (C) by AT APPLICATION*/   }

class PermAddress extends React.Component{
    constructor(){
        super();
        this.state = { data: [],city : [],addType:[],country:[]};
        
        this.getStateByCountryId = this.getStateByCountryId.bind(this);
        this.getCityByStateId = this.getCityByStateId.bind(this);
        this.getFilterData = this.getFilterData.bind(this);
        
    };
    getFilterData(e){
        e.preventDefault();
        
        var cId=this.refs.cId.value;
        var sId=this.refs.sId.value;
        var cityId=this.refs.cityId.value;
        var pin=this.refs.pin.value;
        var aId=this.refs.aId.value;
        
     
        
      if(cId==0){
            alert("Please select country!");
            return false;
        }else if (sId==0){
            alert("Please select state!");
            return false;
        }else if (cityId==0){
            alert("Please select city!");
            return false;
        }else if (pin==''){
            alert("Please select pin!");
            return false;
        }else if (aId==0){
            alert("Please select address-type!");
            return false;
        }/*else if(img==''){
            alert("Please select image file!");
            return false;
        }*/
            
      return  fetch('http://localhost:8070/saveAddresses',{    
          method: 'POST',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          body: JSON.stringify({
          'cId': cId,
          'sId' : sId,
          'cityId' : cityId,
          'pin' : pin,
          'aId' : aId
          
          })
      }).then(function(res){
          return res.json();
      }).then(function(json){
         alert(json);
      
                 
      });
        
    };
    
    
    
    getStateByCountryId(e){
            e.preventDefault();
           
            var cId=this.refs.cId.value;
            alert(cId);
          
                   
                    return  fetch('http://localhost:8070/getStateByCountryId', {    
                        method: 'POST',
                        headers: {'Content-Type': 'application/json;charset=utf-8'},
                        body: JSON.stringify({
                        'cId': '1'
                        })
                    }).then(function(response){
                        console.log(response.headers.get('Content-Type'));
                        console.log(response.headers.get('Date'));
                        console.log(response.status);
                        console.log(response.statusText);
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
    
    getRefresh(e){
        location.reload();
    }
    
    getCityByStateId(e){
        e.preventDefault();
        
             var sId=this.refs.sId.value;
      
               
                return  fetch('http://localhost:8070/getCityByStateId', {    
                    method: 'POST',
                    headers: {'Content-Type': 'application/json;charset=utf-8'},
                    body: JSON.stringify({
                    'sId': sId
                    })
                }).then(function(response) {

                    console.log(response.headers.get('Content-Type'));
                    console.log(response.headers.get('Date'));
                    console.log(response.status);
                    console.log(response.statusText);
               return response.json();
          }).then( (json) => {
                            this.setState({city: json});
            }).then(function(body) {
                 console.log(body);
                    //alert(eval(JSON.stringify(body)));
                    //alert(JSON.parse(JSON.stringify(body)));
            return body;
          }).catch(function(ex) {
                 console.log('parsing failed', ex);
          });

        
    };
   
    componentDidMount(){
               
        /*to get address type*/
               fetch('http://localhost:8070/getAddressType', {    
                    method: 'GET'
                }).then(function(response) {

                    console.log(response.headers.get('Content-Type'));
                    console.log(response.headers.get('Date'));
                    console.log(response.status);
                    console.log(response.statusText);
                    return response.json();
                }).then( (json) => {
                            this.setState({addType: json});
                }).then(function(body) {
                 console.log(body);
                    //alert(eval(JSON.stringify(body)));
                    //alert(JSON.parse(JSON.stringify(body)));
                 return body;
                  }).catch(function(ex) {
                         console.log('parsing failed', ex);
                  });
               
             
                /*Getting country*/
                fetch('http://localhost:8070/getCountry', {    
                    method: 'GET'
                }).then(function(response) {

                    console.log(response.headers.get('Content-Type'));
                    console.log(response.headers.get('Date'));
                    console.log(response.status);
                    console.log(response.statusText);
                    return response.json();
                }).then( (json) => {
                            this.setState({country: json});
                }).then(function(body) {
                 console.log(body);
                    //alert(eval(JSON.stringify(body)));
                    //alert(JSON.parse(JSON.stringify(body)));
                 return body;
                  }).catch(function(ex) {
                         console.log('parsing failed', ex);
                  });

        
    };
    render() {
    return (
            
            <div className="container-fluid">
               
              <nav className="navbar navbar-inverse">
                <div className="navbar-header">
                    <a href="#"><img src="../images/home.jpg"></img></a>
                </div>

                <ul className="nav navbar-nav">
                  <li><a href="/ostopD"><b>Home</b></a></li>
                  <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"><b>Address</b><span class="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><a href="#"><span className="glyphicon glyphicon-send"><b>&nbsp;Permanent</b></span></a></li>
                    
                    </ul>
                  </li>
                      <li><a href="/getHotels"><b>Hotels</b></a></li>   
                      <li><a href="/getRestaurants"><b>Restaurants</b></a></li>  
                      <li><a href="/getProfile"><b>UserProfile</b></a></li>  
                </ul>
                 <ul className="nav navbar-nav navbar-right">
                   
                   <li className="log"><a href="/"><span className="glyphicon glyphicon-log-in"></span><b>Logout&nbsp;</b></a></li>
                </ul>
             </nav>
                      
                      <div className="row">       
                          <div className="col-sm-12 text-right">
                              <button type="button" id="addB"  className="btn btn-primary" onClick={this.getRefresh} >Add more</button>
                           </div>
                      </div>  <br/> 
                      
             <div className="form-group border well">          
                      <form onSubmit={this.getFilterData}  name="inputFieldForm" enctype="multipart/form-data" method="post">
                                           
                          <div className="row">
                          
                                   
                              <div className="col-sm-6">
                                    <label>Country:</label><br/>
                                        <select id="cId" ref="cId" name="cId" onChange={this.getStateByCountryId}>
                                        <option value="0">---Select Country---</option>
                                        {this.state.country.map((countryKey, i) => <Country key = {i} 
                                            country = {countryKey} />)}  
                                                                      
                                     </select> 
                                   
                              </div>
                          </div> <br/>           
                               
                          <div className="row">   
                               <div className="col-sm-6">
                                      <label>State:</label><br/> 
                                          <select id="sId" ref="sId" name="sId" onChange={this.getCityByStateId}>
                                          <option value="0">----Select State----</option>        
                                      {/*this.state.data.length==0 &&
                                                  <option value="0">----Select State----</option>*/}
                                                 
                                                  {this.state.data.map((stKey, i) => <StateData key = {i} 
                                                  data = {stKey} />)}  
                                              
                                       </select> 
                                     
                              </div>
                           </div>  <br/>  
                                          
                                     <div className="row">              
                                          <div className="col-sm-6">
                                              <label>District/City:</label><br/>
                                                  <select id="cityId" ref="cityId" name="cityId" >
                                              { /*<option value="0">---Select District---</option>*/}
                                             {this.state.city.length==0 &&
                                                  <option value="0">---Select District---</option>}
                                                 
                                                  {this.state.city.map((cKey, i) => <CityData key = {i} 
                                                  city = {cKey} />)} 
                                                 
                                                                                
                                               </select>      
                                          </div>
                                                      
                                      </div>   <br/>  
                              
                                                  
                                           <div className="row">
                                                  <div className="col-sm-6">
                                                  <label>Pincode:</label><br/>
                                                  {this.state.city.length==0 &&
                                                      <input type="text" id="pin" ref="pin" name="pin" placeholder="Enter pincode"/>}
                                                  {this.state.city.length!=0 &&
                                                  <input type="text" id="pin" ref="pin" name="pin" value={this.state.city[0].pincode}/>}
                                                           
                                                            
                                                  </div>
                                           </div><br/>
                                          
                          <div className="row">                
                                <div className="col-sm-6">
                                <label>Address-type:</label><br/>
                                         <select id="aId" ref="aId" name="aId">
                                            <option value="0">---Select Type---</option>
                                            {this.state.addType.map((aKey, i) => <AddressType key = {i} 
                                            addType = {aKey} />)} 
                                                                          
                                         </select>   
                                         
                                </div>
                          </div> <br/>    
                                            
                           
                        { /* <div className="row">       
                                 <div className="col-sm-6">
                                 <label>Image Upload:</label><br/>
                                     <input type="file" ref="file1" name="file1" id="file1"  />
                                 </div>
                          </div>  <br/> */  }         
                         
                           <div className="row">       
                                  <div className="col-sm-6">
                                      <input type="submit" className="btn btn-primary " value="Submit"/>
                                   </div>
                           </div>  <br/>           
                                     
                                     
                    </form>     
                             
                        
          </div>     
                    
        

<Footer/>
</div>

        
      );
     }
    }

class StateData extends React.Component {
    render() {
       return (
               <option value={this.props.data.id} >{this.props.data.state_name}</option>
                         
        
       );
    }
 }


class CityData extends React.Component {
    render() {
       return (
               <option value={this.props.city.id} >{this.props.city.city_name}</option>
                         
        
       );
    }
 }

class Pincode extends React.Component {
    render() {
       return (
                   <input type="text" id="pin" ref="pin" name="pin" value={this.props.city.pincode}/>
                         
        
       );
    }
 }


class AddressType extends React.Component {
    render() {
       return (
               <option value={this.props.addType.id} >{this.props.addType.address_type}</option>
                         
        
       );
    }
 }

class Country extends React.Component {
    render() {
       return (
               <option value={this.props.country.id} >{this.props.country.country_name}</option>
                         
        
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
  <PermAddress />,
  document.getElementById('permAddress')
);