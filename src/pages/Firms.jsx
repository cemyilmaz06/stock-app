import { useEffect, useState } from "react"
import useStockRequests from "../services/useStockRequests"

import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import { useSelector } from "react-redux"
import FirmCard from "../components/FirmCard"
import FirmModal from "../components/FirmModal"
// import { useSelector } from "react-redux"
// import axios from "axios"

// export const getFirms = async () => {
//   try {
//     const { data } = await axios(`${process.env.REACT_APP_BASE_URL}/firms`, {
//       headers: { Authorization: `Token ${token}` },
//     })
//     console.log(data)
//   } catch (error) {
//     console.log(error)
//   }
// }

const Firms = () => {
  // const { token } = useSelector((state) => state.auth)
  // const { getFirms, getSales } = useStockRequests()

  const { getStock } = useStockRequests()
  const { firms } = useSelector((state) => state.stock)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const initialState = { image: "", address: "", phone: "", name: "" }
  const [data, setData] = useState(initialState)

  //? Sayfa yüklendikten sonra firmları getir
  useEffect(() => {
    // getFirms()
    // getSales()
    getStock("firms")
  }, [])

  console.log(firms)
  return (
    <div>
      <Typography variant="h5" color={"error"} mb={2}>
        Firms
      </Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={handleOpen}>
        NEW FIRM
      </Button>

      <FirmModal
        open={open}
        handleClose={handleClose}
        data={data}
        setData={setData}
      />
      <Grid container justifyContent={"center"} gap={2}>
        {firms?.map((firm, index) => (
          <Grid item key={index}>
            <FirmCard
              firm={firm}
              handleOpen={handleOpen}
              data={data}
              setData={setData}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Firms
