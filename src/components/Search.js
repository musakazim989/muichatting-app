import React from "react"
import { Paper, IconButton, InputBase, Divider } from "@mui/material"
import { MdSearch } from "react-icons/md"
import { BsThreeDotsVertical } from "react-icons/bs"

const Search = () => {
  return (
    <div className="search">
      <Paper
        className="searchbox"
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MdSearch />
        </IconButton>

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <BsThreeDotsVertical />
        </IconButton>
      </Paper>
    </div>
  )
}

export default Search
