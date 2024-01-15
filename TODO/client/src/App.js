import { useEffect, useState } from 'react';
import './App.css';
import { MdClose } from "react-icons/md";
import axios from "axios";
import Updatedata from './components/Updatedata';

axios.defaults.baseURL = "http://localhost:5000/"

function App() {
  const [addSection, setAddsection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    mobile: "",
  })

  const [formdataEdit, setFormdataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: ""
  })
  const [dataList, setDataList] = useState([]);

  const handleonchange = (e) => {
    const { value, name } = e.target
    console.log(value, name);
    setFormdata((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handelSumit = async (e) => {
    e.preventDefault()
    const data = await axios.post("/add", formdata)
    console.log(data)
    if (data.data.success) {
      setAddsection(false)
      alert("Data Save Succesfully....!")
      getfetchdata()
    }
  }

  const getfetchdata = async () => {
    const data = await axios.get("/")
    console.log(data)
    if (data.data.success)
      setDataList(data.data.data)
  }

  useEffect(() => {
    getfetchdata()
  }, [])

  const handeldelete = async (id) => {
    const data = await axios.delete("/delete/" + id)
    if (data.data.success) {
      getfetchdata()
      alert(data.data.message)
    }
  }

  const handleUpdate = async (e) => {
e.preventDefault()
const data = await axios.put("/update/",formdataEdit)
if (data.data.success) {
  getfetchdata()
  alert(data.data.message)
  setEditSection(false)
}
  }

  const handelonchange = (e)=>{
    const { value, name } = e.target    
    setFormdataEdit((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handeledit = (e) =>{
    console.log(e);
    setFormdataEdit(e)
    setEditSection(true)
  }
  
  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddsection(true)} >Add</button>
        {

          addSection && (
            <Updatedata
              handleSumit={handelSumit}
              handleonchange={handleonchange}
              handelclos={() => setAddsection(false)}
              rest={formdata}
            />
          )
        }
        {
          editSection && (
            <Updatedata
              handleSumit={handleUpdate}
              handleonchange={handelonchange}
              handelclos={() => setEditSection(false)}
              rest={formdataEdit}
            />
          )

        }

        <div className='tablecontainer'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>P.Number</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataList[0] ? (
                dataList.map((e) => {
                  return (
                    <tr>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>{e.mobile}</td>
                      <td>
                        <button className='btn btn-edit' onClick={()=>handeledit(e)}>Edit</button>
                        <button className='btn btn-delete' onClick={() => handeldelete(e._id)}>Delete</button>
                      </td>
                    </tr>
                  )
                }))
                : (
                  <p className='nodata'>No Data Found</p>
                )
              }
            </tbody>
          </table>

        </div>
      </div>

    </>
  );
}

export default App;
