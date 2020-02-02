import { useState, useEffect } from 'react'
import { getCurrentUser } from '../helpers/getCurrentLocalStorage'
import { statusService } from '../services/statusService'
import { axios } from '../plugins/axios'

export const useUser = () => {
  const initialUser = () => getCurrentUser
  const localToken = localStorage.getItem('token')

  //? original
  // const [auth, setAuth] = useState(false)
  //? end

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
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiN2Y0NTVjYTM4ZGY1OThmMjJjNTZkMjcxMDdjZTk1Zjc3YzhmMDVjOGRmZTJiMjExMGY5NzkxZDUwMjZkOTMwMjBhZTJjNjFiNDRmMTBhMjEiLCJpYXQiOjE1ODAyOTE3MTQsIm5iZiI6MTU4MDI5MTcxNCwiZXhwIjoxNjExOTE0MTE0LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.S7Pncs14uecx-_6lhRx9BMLiJcVv-HcsWnT10z9r6J3AuCXBsn3_fRVSTiOGG0LCvYD3gRS84pg3NjkAa7Og0UhtrMQ_fDEZKALirjf4WI9s_j67-YVNu6mUrKn1v-6vLG7lso0FeVuSceGLYBiQwrQHLV18nuU-fk6O9xzUNMLCZfVqf2RmqIhsHERAlPvEJBgMRi7YWRkwr-bDW-oM6jdUjIRBzp6F0fGy438gVezQao0EC82JNLIOUj2tCGaTHu7VmE3KlUODtx1Rgifez-PkJPBZPiHFjfp7cYyRmgZ97M2WanqgZ1nhf1MzYGWY_cDl_H-eB1BXeuumETOdpF-P8WdwRPyUhXuxD-KF51zoqY3DP6qM3dehakEzAWewD_dZgGd8KYlUYwjtENHKKdN6DjlySPuV6VxUEYt3xaTAzlBCqtHODbloYPSs5xDqfDPvmkip4c0oqL6pBHpjyj5xxKKSlLPZNKAxTHawlVRZ6uV8Oq7iJ6w6659PzykdKD7SONZ4THg2rBAq6McxxzbPmMzKjW5V-PPbwyVnG_mQQ9znU4dwL3-M0KWEBciDr7gzG-nApvylQw2zLYXRj73VDWkz8pIl4lYaUVwmW0zzKf56GIB5AdiRN8VKdVrNEocCGNo6niY7tp6bKMQjrSkdCAh8ARYszM3elGGWFOU'
  const studentFemaleToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjlkZmUwODAzMDM2MDAzYjMzMTg2NzIyZTI4NDVkMDk5NTk4YmY4MGNkYjI1OTU3M2IxMzIyMTYxMjYyOGJlMzQzNTVlOWJjNTA2YTRmYzYiLCJpYXQiOjE1ODAxOTAyOTYsIm5iZiI6MTU4MDE5MDI5NiwiZXhwIjoxNjExODEyNjk2LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.589wIIapAYBpyL0YH5cjU4zDe0SrtQJASHmDBTZPgjFUaRaq3uV-dsv92UCxW8n9UDQwhPbJJXI1jBa98xtNZLXa58TElYlikIrKbaftcLSLGP9DKuxEzgj1WIo3DYtdfbcrxdBybuwFTsWdH_bxeFUxzdeGs6sMYqECpux5uNlMg4ICqnURqzfwW23NJbWgG-t9IkJwD5xU_iKACunJzDpAkcojuZv1xgIF1bBeV2fwmGF_yvIIvdLCpuffw0yTtlIyLWnX0UVk8g35PxVAK_MKKY8D4cYB9ROV8PT1Qh81-T2QouO9XNnXYDlg_LqnXKmSW4izcUOoghVEiw4F5Yue9o8tV1WgYDwvt-Vg4wudEgMppGlu2AuDKMKxL7XcBobotnJY4Wd24pWJ_e2Hm1AHq4G1wQykMryJWVYrqC-SVVFBr1Y6BEHW6fHW-j6j-SvhBdrIMPmuMbsvmgjeSesTkHmS_kerXfjR-09XrhsOTkqoy8obJe2YPyuwkJxUop8_M8TbcLJ7k6AQo18fF9T6TW40-HgUiTf2V9-ZR3SdwzVjz-iQ839Dwd6wnDfWc0LZD48LClwTa2t_FZTIy8kbudWVWXvTmY155iGpZxucJzJj6f1Oi6JYWLVMtCQt7NPwX7J6a_8-nz51ZYh-9PInK6UZ6LBhOrBpGApYVhY'
  const preceptorToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiM2RlMTE1M2RjODA3MTdmNzE0ODMxNmZjZDZlNTcyZjIyNGNlZTQ1MjQ3ODgzMGNlNjEwM2ExNzQ4MjlmMzY3MTAyYmUzMmI2ZTZhZGY3ZTkiLCJpYXQiOjE1ODAyOTE0MTUsIm5iZiI6MTU4MDI5MTQxNSwiZXhwIjoxNjExOTEzODE1LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.qBv4RZHlyU1irKTCrL4zxeIEMXecql5QiBcohxw78KnLk4OnW9gXhfBNiRnbTRwUJGdjCCdoPOqAd9kQCTLk9NRsaiQZrmTL7fh6K-DbfACqmSxc4woI3XSQi-eodxHhGyg7w0xN7SOuouZ_xVVJdG9MCUMqlRqD7ZdfwZhmP5ya-PlvEvN41MyKaD9XWdxZDHOwvBCdCpHh2Vxbi9DcY9KjLSFat9fTCSmeQ6sIwv5WNkwNCoKZadogn5-_RCv3AY0hLN1YKKKj5pH_Ord4UdnhHEOqvWaxfiDWMAm3m_5ihzyTCT2OQj-K3iGb8KKAM_keaqO8AZfDn5NWAdfk0ogPGS_TxfNPwX9Ukz5nQBolvF52xJfecsUz2qbgG4Eh68moNQai1jguA3pvksT8C4HDho4OTYx4iYfScl9CRTXBVgE8b5bdGxLJMzmsnxgg7nyb5kIqxw4xMZkxsBH2Xx2O5gnHKBAfraF0eLMRp7SpdtuJBXCcpOXzyWJoz0cZXRlpsXTPp4VfzLnk6xnMs4VsXWo2FoR0BXk2t634kTFUzXncK1av7d_Fu7KSP1-vwSoyXu-WzVCiig67uaz5FII3FV54ExQBhaHauN3gaQN6jlq9ZA6mAYupP8OwNBnDTjUXZOKEjazcTQ5Wxmt-Y3Yj3GkIBj9_1ZZuy6xFwB8'
  const monitorToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODYyY2I3MzRkMTUyYzEzMDMyMzg1NjU0MWU1ZGEzMWQ4YWU4Nzk0YzFiZDVmNzg4NjQxNGM3N2U5MGM4MmRlZWU1MTJlNDc4ZTA0Mzc3ZTUiLCJpYXQiOjE1ODAzMDE4OTMsIm5iZiI6MTU4MDMwMTg5MywiZXhwIjoxNjExOTI0MjkzLCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.SAH9r5a59sP1Wv8DlzW8Zg9GIotkgxe-t2_KFyZmKmRP5-8ayi2-0RkSTjUDK2fPIGENYc8FkdfYGK4AvzYTGneeN4LJBB2BN7vBGSo4KA7O9Sqz13QPBTY4McGqRYaJC9GdTug3hUyxvHpVXeC3su0W2xxDv0ABEOpGa-GsvNSAzvaJH_T1go4asy8WgzRqLh0nV_xCvAEYzeByKH9dj-LOcD4Vfg7YvDogtQqTmX2YpjO-A04p0CN2vLmf-Ux-fbm-_KNcrTLN-QP9ZrYwUwH31UoOc7eNYrpAccK7BAYFh2DMpvi6c9PMuP48SDx-XylAYQjnvDtxHUMlICheQtUWBDj_zUtRuRiVom2cp3O-4ueGRyBTS6jxD5hw6JhaNapausyTjuv1vtRPYQ1eectIxyfF6aAoqDxlAAcern2ZifDP8_sUmPcOj-6EP47oj4CFR245Km65Gntgv5Szo0NoyYiAsKcZu-f-Jo9xnWv0a6XCXoHC9eRIoo20Ray8flgvFYdEDTapL4mu6XTxEWN1QEHns_sdbdVbzqEkoCzJwOv3cnvuD3YNAlvrDB1bHTTiXU--ND4IK1xSGib4ZiuVR7F4ydCljn3XQZM6A0482qqSbD-RSiAYc2q9t-r87kOJTxQ7Oa_PVNKOZqIqkDb-XyxpKB63_BaPG3bKXTg'
  const guardToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2JiMTFjYmI2MjQ3NzIxZjUzNDFlODA3MDI3MTEyODYxZjBmNzk4YzE3ZGE1ZDcxZDE1YmE1YjVmYjg5ODRjNDU5ZmRhOTFkNjRiMGZkNzAiLCJpYXQiOjE1ODAyOTAzMzksIm5iZiI6MTU4MDI5MDMzOSwiZXhwIjoxNjExOTEyNzM5LCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.DvpL2mxX4goRd8EUPAAYIuGsMRoPelUKjiXBoVeNALkXRBFBlUzDXRD6Vr5yvMPVOgBF_HkoB87o5FSRGGJtXS-HJkMnC4w2Qd2A_I2mOehSVJqcuaSvmKTKE59gSV3sRJk-nQ-wfb3vuvJz5APkC2aYMhjSvqYz9JuDI4EmUZbihpcKdIZmOCiAppb_CcF7N_LEFb5NfDscAxt9Jgi1mKX4SNhc9wSuCsmor5eUHOPMOj8sZ4FIOJ3Ai40bHWuebgVl3Loa_AxwVZ9adc3x9xFYRkVQ-ITU4cR--GJ04a2LfDugQEokLlo5zbpp47mdYkISQZNvXTbypNBxX6Gq4htgruSimsYek1IuYMJJih16jhuZY0dUO-_H0WfCy5tpKBmYSRG1XjeU_0oQp4ZfzUVqAtAcHIGSquB-YJk-YwOFaTWYEEr2ew6zEOMgBnbZrnVZQRrBhAFezeV1QVYAR1j6FDxa-VmSioQj2z-b2ouj77qnXX46SI7XSvffhRs_pH4lu-1c70uqFitsG58n5JFNoWSa_qwvPQht5amudvMb0eXZ6vZlHuVD9BuGzxMgYVs-KPC_H0al94949i0yg6m6HPzXrY7M8NZ3HYOkS2md3EJToaRngxT0zEH4lQW4J2tOg1xsoDl3SEyCACb3KzZur6ZZI19EvSAn_fBkCHs'
  const rector =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWYzOTcwYWFmNGFmMDk4ZjA2YjE5OTk3NGJiZmI5NmU3YWYwYzU4NGIyMmJkZDAzZDdkYjg5MmIzNjkwY2Y4MGVjNWI2ZGZmZjA2YjRiYzciLCJpYXQiOjE1ODAyOTE2MzgsIm5iZiI6MTU4MDI5MTYzOCwiZXhwIjoxNjExOTE0MDM4LCJzdWIiOiIxMCIsInNjb3BlcyI6W119.e5uIZhfgT6zBsUolgadxsDdsYzSpPVpf0q4rLgaOlWThuFAW4oAs2sMujH44qrW-PNpG_KFfqZUOLJ8G2F6eeakAh-Rrk-EHSdtJF0GDNOLVB-M6P1MRoRziQL7NGqNnk8xqgNPlvhbODVKa5WdrKTYuk1SgGCqtfDEtjfICuD_eaPFZprHfcUfIxsmm-SsP2NAaujwJsifvhWUPtE5zX-pLtWl-rY1g2dDSSWl0L326jp4F8XgebBYy1TtuCVO_L9UTl4xQIvt5XyTQPWzSLG6wgRfGVaamzkyutdXf3GpoaCpMH29rgwL1vIbe74HJo3McdhfajCM0oSpjTxQdRL_yz1-IXvn9fb2jKZwt2vYLl3txa0GOhXXlE_QlQ15RE3BCe1y1ufYlzyGIJpLgvgt32gh8UdknWBStbKqWzGlBgkvLCsj--XLTub1WshjdCRgbXUzdzSsurU5_p8jdXWXOSs4PilnSPwcOzZ6iNT1bYsguwsddYwIQwtuuR9Y5cNOTEosGF_fTXTCpv0zKHzhw7sFNppC4xeM0PihauQWvnsoJQLL6v1kKmsVer0BxlIIt5KwxrHDxRGJPd0xL4oMtBymH8EC4-KwTg5CQqu32BYDyVxZeNoExm2ar6HbnIgg5aNcHBu0rR1DX_4pYJkV4Ufwc_h0y8oy3sf_BTMM'
  const [token, setToken] = useState(preceptorToken)
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
