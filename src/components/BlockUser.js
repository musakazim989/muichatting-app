import React from "react"

const BlockUser = () => {
  return (
    <div className="grouplist friendlist mygroup">
      <h2>Block Users</h2>

      <div className="box">
        <div className="img">
          <img src="./assets/images/group.jpg" alt="" />
        </div>
        <div className="name">
          <h4>MERN</h4>

          <h5>The best fishing Group</h5>
        </div>
        <div className="button">
          <p>3/6//2022</p>
        </div>
      </div>

      <div className="divider"></div>
      <div className="box">
        <div className="img">
          <img src="./assets/images/group.jpg" alt="" />
        </div>
        <div className="name">
          <h4>MERN</h4>

          <h5>The best fishing Group</h5>
        </div>
        <div className="button">
          <div className="info">
            <p>3/6//2022</p>
            <button>Unblock</button>
          </div>
        </div>
      </div>

      <div className="divider"></div>
    </div>
  )
}

export default BlockUser
