import { useState, useEffect } from 'react'
import { getCurrentUser } from '../helpers/getCurrentLocalStorage'
import { statusService } from '../services/statusService'
import { axios } from '../plugins/axios'

export const useUser = () => {
  const initialUser = () => getCurrentUser
  const localToken = localStorage.getItem('token')

  // const [auth, setAuth] = useState(false) //? original
  //! dev mode!
  const [auth, setAuth] = useState(true)
  //! end

  const [user, setUser] = useState(initialUser)
  //? original
  // const [token, setToken] = useState(
  //   localToken ? JSON.parse(localToken).substr(1) : 'f34th3r.io'
  // )
  //? end

  //! dev mode!
  const studentMaleToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGMzNjBhMzRmOTNjN2I2YTQ5YjE2ZTRiNGNkNGI3MDUwZWU4YmNhZTQ1MDI4MjRjYTEwYjAwM2ZkMDI4ODY2Mjc1ODI0MzliN2FiMzVjYjUiLCJpYXQiOjE1ODAxMjA0MDUsIm5iZiI6MTU4MDEyMDQwNSwiZXhwIjoxNjExNzQyODA1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.gfqh-HwVzvmjpC58Om2SePhXfcFPqhm2WgZ3LBCvANYzrVxffkHtsKPl0RCFnChM5xmRKPTvi_8wAdcVu8N9DFYAsJ8tR9f7RG01Za2GBfr62jc4W7glIOkJA91tK7SYbINyHlJX32nUc8UrG1s3IVEJK4WyYbRIRxxgQz8TtqetP3rP-PjFs1pxg3as3IFW_VUUaq2jbIYEjEVYTTvpu8M9GRkmNpbKYXv67613k31C7KZpqugEWKRagdcH0lLrhAuAy9AoqFgG7RkWjOu0798gxIKBDZqZYI4yVGw5QFVi49aamXVauxHbBYkKzTbuoiguu7fgZoNDvqSkc5kRbTxX5MqCwnb_9ki8d7eqatlobRgIBlYhgOqDqUA8QWfnUzP-1k3Hq8xD1pbUAuD70J8DT1-F-rcsOuUhga_4cx5eEqHUOWcl2t0UA_XU8R4bBvKg-7DgLpc9lKDrml84Qpwf2nZyvYjROLp_A0c8Zoop6By0J5np0lZ1R4_UVcAGV6o7-8YH32vXWGx7Rhr1sU-RYNDvxY4f5qYmv2JGfnW2q2hhu7OyuiG4JAwIM_NGnZprFYiQLUjXhZxxTDbXNRC0Zo_21Wua9cMqORotUn_8ualiyWRu-60J-DwvquEUPu9Ykcv8SgzGMAe_f4pNfFguXeHU6jIR3lMD18C2Qdk'
  const studentFemaleToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjlkZmUwODAzMDM2MDAzYjMzMTg2NzIyZTI4NDVkMDk5NTk4YmY4MGNkYjI1OTU3M2IxMzIyMTYxMjYyOGJlMzQzNTVlOWJjNTA2YTRmYzYiLCJpYXQiOjE1ODAxOTAyOTYsIm5iZiI6MTU4MDE5MDI5NiwiZXhwIjoxNjExODEyNjk2LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.589wIIapAYBpyL0YH5cjU4zDe0SrtQJASHmDBTZPgjFUaRaq3uV-dsv92UCxW8n9UDQwhPbJJXI1jBa98xtNZLXa58TElYlikIrKbaftcLSLGP9DKuxEzgj1WIo3DYtdfbcrxdBybuwFTsWdH_bxeFUxzdeGs6sMYqECpux5uNlMg4ICqnURqzfwW23NJbWgG-t9IkJwD5xU_iKACunJzDpAkcojuZv1xgIF1bBeV2fwmGF_yvIIvdLCpuffw0yTtlIyLWnX0UVk8g35PxVAK_MKKY8D4cYB9ROV8PT1Qh81-T2QouO9XNnXYDlg_LqnXKmSW4izcUOoghVEiw4F5Yue9o8tV1WgYDwvt-Vg4wudEgMppGlu2AuDKMKxL7XcBobotnJY4Wd24pWJ_e2Hm1AHq4G1wQykMryJWVYrqC-SVVFBr1Y6BEHW6fHW-j6j-SvhBdrIMPmuMbsvmgjeSesTkHmS_kerXfjR-09XrhsOTkqoy8obJe2YPyuwkJxUop8_M8TbcLJ7k6AQo18fF9T6TW40-HgUiTf2V9-ZR3SdwzVjz-iQ839Dwd6wnDfWc0LZD48LClwTa2t_FZTIy8kbudWVWXvTmY155iGpZxucJzJj6f1Oi6JYWLVMtCQt7NPwX7J6a_8-nz51ZYh-9PInK6UZ6LBhOrBpGApYVhY'
  const preceptorToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzNlNjdlNzgyMDFkZDQ3YmRiNDY4ZTZjZGZlNTBkYTQ4NTcxOTk4ZTBhMGNmYTVjY2RiOTlhODlhMzY4YmRmZTk4ZjI4NGE4ODU2MDMyOWEiLCJpYXQiOjE1ODAxODk4OTUsIm5iZiI6MTU4MDE4OTg5NSwiZXhwIjoxNjExODEyMjk1LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.lnjU4jGEMjD3p6trzRqvyB5pij-k6GpzkxNXg4E-qvsM50iZWuz70ONR2qPKSuPZB27_sor2QaxZkypX7q-Xqr0MtDzO8co5AZv6CjWdOeowoJ46Iq0cZTA6997fA7aJJUj3714FwOi1bpUn2HpCV7_Me_l4n4xxyOXCrk6Dqg31p5RML9_P2Icp-3mhx_dectqJN1fWfd2v6c1mFVqV8e7dhunTAy11ICm13fmIJnPDyF34-fOseX5qqw6fmknkn6qByhh0qr1Wd9qBHPsS3N8qkDxecdgtJWxePGN8PAWv7GJslq2YpGKwyYOhlBuWiZAuQvbjB1OFul_dSPrwK6_-CK1sBJzQjc4oKxBdQ-EeczV0x1Wk7O_OQxCKPvOHpKQaTaH_4C6kGMGrt55DkV6Pd6gqu1UXmdPp_gKzKWkJjDecGRgd8nhBjWznvdUKVt0yWgIE4bYnMtwJmVbzolY4oyApBU-ibdp9VICYCfmICdhvfVGDaLb9dl4Yl9cp7ZXvXpgjY51Ky-ipfIr-J9c5KBHFARMhQrN-68Smf8aiU_ZI6GNx5vMmteOzHvmlXs-RrsLMawXtLjPaWIGU-tQUTky8dy8Qs6kXfuv_bAVvToSJETGWbIBwCjB2LYnKSerzzgxsex0rrJPRa4N63pr5Z8Xv6Kbm0O3YHzTyv9M'
  const guardToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMWQ4OGI1ODNmZGZjMDFmODZlNDI1NDg0NWIzNTFkODQwYmU1NTVmOGEwMzRiNDc4ODIzZjYzNDBlOWE2MmFhOWQxZDAzNjRiNGZhZjI1MTUiLCJpYXQiOjE1ODAxMTk3MjEsIm5iZiI6MTU4MDExOTcyMSwiZXhwIjoxNjExNzQyMTIxLCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.7RPwvhy9WtEGaQ-9CYmW3DGPblftn04fll0qAQ1ulYgUscPN2VOTRF6hlI1hnN-k40T-Cozv862E9CpOsHBGHKI4PcoKIr5qVYA0RNuCG-8sicB_FKLcMyyraiiuARwSlEg2mpN7byzE_Wp8kH-ygCeEU7fJOnPV9O15ex3zIzNRCvDFFYJXTNX0jwyUKAhzsNARdniR2sCYvviMEOhclbOPJo-T2wV3fUJA5nS2tDaCiyeR0Ly3s8tHvXGCyaWgc1W9j8jzD7lidmrKa3qYsNM9_poUfZXeYgNDTbQbAkuO7CSTZWWTrYW7Rct2_07wDXOmDwiVtt92TWWF-QpsbPcsGtFruZiI8XN01zVTDg1rR6Ath0TFrxb9y0BFcSyXXvYC6xYnb0D2cGlFGT7jSckGCLl4jTiB_l86SeL5h1YkpACQas9iiFC60ZdAMg4_KuJiVaxFvaEvkF3dlYJaHc5G1BX626LVatuUXgs0UvqxmFRF2cRV1Zl6mLSbbNhMTNUiIq9nd8jxninoQVS3B4oKtTCDqb2FDpwaDn-MQxefrf7gu4Hby2YNt78B_VoPxgDwObxT4xUFlMOywCvyu27lWM5M832hAeTtU5REy41_RGwF1X2L1zr3e83imECDTQ_kN4yPLO4d1XNGAT0EAo_6-SfQAMhmr4iApBoxM-Y'
  const rector =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjc2YjFkNDU3MmVkN2Q0ODk0YTFiODAxZDY2ZmFkYTk1Y2E0MTg0ZTQ3OGRiMzE4NWFjMzc1NTkyNmUzNTA2MjI2NjE3Y2Q0NzYzZTE3OTgiLCJpYXQiOjE1ODAyMDEwNDEsIm5iZiI6MTU4MDIwMTA0MSwiZXhwIjoxNjExODIzNDQxLCJzdWIiOiIxMCIsInNjb3BlcyI6W119.AYCWlUFK868kcCXsFsjZNTfeUzcoz6vSM79KCDLWcoETSPVcvEZEFvbvjEXMrfpghuoiJwu7Uv4ovBcIqU8twxdWcdQqW1n0qTIuw_aexnbQui0OmA8qIr6SclHKIcCjzkgrzKgMUuFQStfepBfd6nTL_76qaEl6gN3z4o0roMdZAocPhK9hR_Z5lslCGSLua1UsgSniQNlNoLY7Ng9f7IZlKMA3untN6m7J-3Qym9wXa0FCfHvh4RY8omr5rocxR-KCqx0jGxkNXwDeLbZdeQN_Eiyu-YTFqZQRPyae8Ro_onn7bFKnM7NqHWcFq5Q7GOZ7OoOG9vnXtODlnYmYtaBsFzsXhNtdUZTXPZ0xsQ6Tfnp3HJB5utyC-tSMYn8kUMVVXNb4WjZdT_Nm7sOOZ4qHr4nqhz6Qq0lNU-Yp73LC968LwFd9ZwtCKOFIBcJwVLrbJ64Be249a70q3sy9BFncwFHiArubzbUFHAhLGBD5nN7VlApOrKgNJIJYFnot2CUkOwQqBKZ0i2Bu5Evwa3W2XbHAdVrWSMB0blb5uULXIhy_MKQizsyNUsm8Q1wYJnnUMWZRh-0uXYVa4CYdsbaGSLDcY6lolaiJ2tmzBpIBp4UOKjvjzOjvtBQVnQpyg4rRBaNDtq2d5dXfeuLzFXa1n5YVYakqQv-6ucpusBM'
  const [token, setToken] = useState(guardToken)
  //! end

  //? original
  // useEffect(() => {
  //   if (auth) {
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(
  //       localToken
  //     ).substr(1)}`
  //   }
  // }, [auth, localToken])
  //? end

  //! dev mode!
  useEffect(() => {
    if (auth) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }, [auth, localToken, token])
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
