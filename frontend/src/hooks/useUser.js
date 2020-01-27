import { useState, useEffect } from 'react'
import { getCurrentUser } from '../helpers/getCurrentLocalStorage'
import { statusService } from '../services/statusService'
import { axios } from '../plugins/axios'

export const useUser = () => {
  const initialUser = () => getCurrentUser
  const localToken = localStorage.getItem('token')

  const [auth, setAuth] = useState(false) //? original
  //! dev mode!
  // const [auth, setAuth] = useState(true)
  //! end

  const [user, setUser] = useState(initialUser)
  //? original
  const [token, setToken] = useState(
    localToken ? JSON.parse(localToken).substr(1) : 'f34th3r.io'
  )
  //? end
  //! dev mode!
  // const studentMaleToken =
  //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGMzNjBhMzRmOTNjN2I2YTQ5YjE2ZTRiNGNkNGI3MDUwZWU4YmNhZTQ1MDI4MjRjYTEwYjAwM2ZkMDI4ODY2Mjc1ODI0MzliN2FiMzVjYjUiLCJpYXQiOjE1ODAxMjA0MDUsIm5iZiI6MTU4MDEyMDQwNSwiZXhwIjoxNjExNzQyODA1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.gfqh-HwVzvmjpC58Om2SePhXfcFPqhm2WgZ3LBCvANYzrVxffkHtsKPl0RCFnChM5xmRKPTvi_8wAdcVu8N9DFYAsJ8tR9f7RG01Za2GBfr62jc4W7glIOkJA91tK7SYbINyHlJX32nUc8UrG1s3IVEJK4WyYbRIRxxgQz8TtqetP3rP-PjFs1pxg3as3IFW_VUUaq2jbIYEjEVYTTvpu8M9GRkmNpbKYXv67613k31C7KZpqugEWKRagdcH0lLrhAuAy9AoqFgG7RkWjOu0798gxIKBDZqZYI4yVGw5QFVi49aamXVauxHbBYkKzTbuoiguu7fgZoNDvqSkc5kRbTxX5MqCwnb_9ki8d7eqatlobRgIBlYhgOqDqUA8QWfnUzP-1k3Hq8xD1pbUAuD70J8DT1-F-rcsOuUhga_4cx5eEqHUOWcl2t0UA_XU8R4bBvKg-7DgLpc9lKDrml84Qpwf2nZyvYjROLp_A0c8Zoop6By0J5np0lZ1R4_UVcAGV6o7-8YH32vXWGx7Rhr1sU-RYNDvxY4f5qYmv2JGfnW2q2hhu7OyuiG4JAwIM_NGnZprFYiQLUjXhZxxTDbXNRC0Zo_21Wua9cMqORotUn_8ualiyWRu-60J-DwvquEUPu9Ykcv8SgzGMAe_f4pNfFguXeHU6jIR3lMD18C2Qdk'
  // const preceptorToken = ''
  // const guardToken =
  //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMWQ4OGI1ODNmZGZjMDFmODZlNDI1NDg0NWIzNTFkODQwYmU1NTVmOGEwMzRiNDc4ODIzZjYzNDBlOWE2MmFhOWQxZDAzNjRiNGZhZjI1MTUiLCJpYXQiOjE1ODAxMTk3MjEsIm5iZiI6MTU4MDExOTcyMSwiZXhwIjoxNjExNzQyMTIxLCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.7RPwvhy9WtEGaQ-9CYmW3DGPblftn04fll0qAQ1ulYgUscPN2VOTRF6hlI1hnN-k40T-Cozv862E9CpOsHBGHKI4PcoKIr5qVYA0RNuCG-8sicB_FKLcMyyraiiuARwSlEg2mpN7byzE_Wp8kH-ygCeEU7fJOnPV9O15ex3zIzNRCvDFFYJXTNX0jwyUKAhzsNARdniR2sCYvviMEOhclbOPJo-T2wV3fUJA5nS2tDaCiyeR0Ly3s8tHvXGCyaWgc1W9j8jzD7lidmrKa3qYsNM9_poUfZXeYgNDTbQbAkuO7CSTZWWTrYW7Rct2_07wDXOmDwiVtt92TWWF-QpsbPcsGtFruZiI8XN01zVTDg1rR6Ath0TFrxb9y0BFcSyXXvYC6xYnb0D2cGlFGT7jSckGCLl4jTiB_l86SeL5h1YkpACQas9iiFC60ZdAMg4_KuJiVaxFvaEvkF3dlYJaHc5G1BX626LVatuUXgs0UvqxmFRF2cRV1Zl6mLSbbNhMTNUiIq9nd8jxninoQVS3B4oKtTCDqb2FDpwaDn-MQxefrf7gu4Hby2YNt78B_VoPxgDwObxT4xUFlMOywCvyu27lWM5M832hAeTtU5REy41_RGwF1X2L1zr3e83imECDTQ_kN4yPLO4d1XNGAT0EAo_6-SfQAMhmr4iApBoxM-Y'
  // const [token, setToken] = useState(studentMaleToken)
  //! end
  //? original
  useEffect(() => {
    if (auth) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(
        localToken
      ).substr(1)}`
    }
  }, [auth, localToken])
  //? end
  //! dev mode!
  // useEffect(() => {
  //   if (auth) {
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  //   }
  // }, [auth, localToken, token])
  //! end

  useEffect(() => {
    if (localToken !== null) {
      setToken(localToken ? JSON.parse(localToken).substr(1) : '')
    }
  }, [localToken])

  useEffect(() => {
    if (user.role === '2' && user.role === '3') {
      statusService(setUser)
    }
  }, [user.role])

  useEffect(() => {
    if (user.role === '2' && user.role === '3') {
      setInterval(() => {
        statusService(setUser)
      }, 180000) // 3 min
    }
  }, [user.role])

  return {
    user,
    setUser,
    token,
    setToken,
    auth,
    setAuth
  }
}
