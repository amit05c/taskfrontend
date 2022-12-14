import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserData = () => {
  const [data, setData] = useState([])
  const getData = async () => {
    axios
      .get('https://kind-toad-clothes.cyclic.app/user/allusers')
      .then((res) => setData(res.data.message))
  }
  useEffect(() => {
    getData()
  }, [])

  const handleClick = async (id) => {
    await axios
      .delete(`https://kind-toad-clothes.cyclic.app/user/delete/${id}`)
      .then(() => getData())
  }

  const toggleStatus = async (id, status) => {
    console.log(status)
    let updatedstatus = status == 'active' ? 'Blocked' : 'active'
    await axios
      .patch(`https://kind-toad-clothes.cyclic.app/user/togglestatus/${id}`, {
        status: updatedstatus,
      })
      .then(() => getData())
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>USERS DATA</h1>

      <div
        style={{
          margin: 'auto',
          border: '1px solid black',
          //   height: '100vh',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
        }}
      >
        {data?.map((el) => (
          <div key={el._id} style={{ border: '1px solid black', textAlign: 'center' }}>
            <h2>{`Username: ${el.username}`}</h2>
            <h2>{`Eamil: ${el.email}`}</h2>
            {/* <h2>{`Password: ${el.password}`}</h2> */}
            <div>
              <img src={el.pic} alt={el.username} width={'100px'} />
            </div>
            <div
              style={{ margin: 'auto', border: '1px solid red', width: '30%', marginTop: '2rem' }}
            >
              <button onClick={() => handleClick(el._id)}>Remove User</button>
            </div>

            <div>
              <h3>{`status: ${el.status}`}</h3>
              <button onClick={() => toggleStatus(el._id, el.status)}>Toggle Status</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserData
