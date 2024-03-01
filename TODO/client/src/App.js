import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import Updatedata from './components/Updatedata';

// Set the default base URL for axios
axios.defaults.baseURL = "http://localhost:5000/"

function App() {
  // State variables for controlling the add and edit sections, form data, and fetched data
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

  // Handle input changes in the form
  const handleonchange = (e) => {
    const { value, name } = e.target
    console.log(value, name);
    // Update formdata state using the previous state
    setFormdata((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  // Handle form submission for adding data
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

  // Fetch data from the server
  const getfetchdata = async () => {
    const data = await axios.get("/")
    console.log(data)
    if (data.data.success)
      setDataList(data.data.data)
  }

  // Fetch data when the component mounts
  useEffect(() => {
    getfetchdata()
  }, [])

  // Handle data deletion
  const handeldelete = async (id) => {
    const data = await axios.delete("/delete/" + id)
    if (data.data.success) {
      getfetchdata()
      alert(data.data.message)
    }
  }

  // Handle form submission for updating data
  const handleUpdate = async (e) => {
    e.preventDefault()
    // Send a PUT request to update data
    const data = await axios.put("/update/", formdataEdit)
    if (data.data.success) {
      getfetchdata()
      alert(data.data.message)
      setEditSection(false)
    }
  }

  // Handle input changes in the edit form
  const handelonchange = (e) => {
    const { value, name } = e.target
    // Update formdataEdit state using the previous state
    setFormdataEdit((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  // Open the edit section and set the form data for editing
  const handeledit = (e) => {
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
                <th>Operations</th>
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
                        <button className='btn btn-edit' onClick={() => handeledit(e)}>Edit</button>
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
