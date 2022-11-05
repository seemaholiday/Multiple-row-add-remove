import {useState} from 'react';
import './App.css';

function App() {
  const [formVal, setFormVal] = useState([{name:'', email:''}])
  const addRow = () => {
    setFormVal([...formVal, {name:'', email:''}])
  }
  const onRemove=(i) => {
    const newForm = [...formVal]
    newForm.splice(i, 1)
    setFormVal(newForm)
  }
  const onHandle = (e, i) => {
    let newForm = [...formVal]
    newForm[i][e.target.name]= e.target.value
    setFormVal(newForm)
  }
  const formValidation=(formVal)=>{
    const data = [...formVal]
    var re = /\S+@\S+\.\S+/;
    let valid = true
    for (let index = 0; index < data.length; index++) {
      // const element = data[index];
      if(data[index].name == "") {
        data[index].nameCheck = "name required"
        data[index].nameLengthCheck = ""
        valid = false
      } else if(data[index].name.length < 10) {
        data[index].nameLengthCheck = "name should be greater than 10"
        data[index].nameCheck = ""
        valid = false
      }
      else{
        data[index].nameCheck = ""
        data[index].nameLengthCheck = ""
        valid = true
      }

      if(data[index].email == "") {
        data[index].emailCheck = "email required"
        data[index].emailFormat = ""
        valid = false
        
      } else if(!re.test(data[index].email)) {
          data[index].emailFormat = "Invalid Email"
          data[index].emailCheck = ""
          valid = false
      }
      else{
        data[index].emailCheck = ""
        data[index].emailFormat = ""
        valid = true

      }
      
    }
    setFormVal(data)
    return valid

  }
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitData", formVal)
   const errorRes = formValidation(formVal)
   console.log("errorRes", errorRes)
   if(errorRes) {
    // api call
   }
   else{
    // error msg
   }
  }
  return (
    <div className="App">
      <div style={{width:'60%', margin:'20px auto', }}>
        <form onSubmit={onSubmit}>
          {formVal.map((item, i)=> (
            <div>
              <div style={{padding:'10px', margin:'10px', diplay:'flex', flexDirection:'row'}}>
                <label>Name</label>
                <input type="text" name="name" value={item.name || ""} onChange={(e)=> onHandle(e, i)}/>
                <div style={{color:'red'}}>{item.nameCheck}<br/>{item.nameLengthCheck}</div>
              <label style={{marginTop:'50px'}}>Email</label>
              <input type="text" name="email" value={item.email || ""} onChange={(e)=>onHandle(e, i)}/>
              <div  style={{color:'red'}}>{item.emailCheck}<br/>{item.emailFormat}</div>
              {
                i == 0 ? "" :  <button onClick={()=>onRemove(i)}>Remove</button>
              }
              </div>
             
            </div>

          ))}
          <div style={{marginTop:'20px'}}>
                <button onClick={addRow}>Add Row</button>
              <button type="submit" style={{marginLeft:'20px'}}>Submit</button>
           </div>
        </form>
      </div>
    </div>
  );
}

export default App;
