import React, { useState, useEffect } from 'react'

import { Navigation } from '../../../layout/Navigation'
import { StyledContainer } from '../../../styles/StyledContainer'
import { TableComponent } from '../../../components/TableComponent'
import { API_ROUTES } from '../../../constants/apiRoutes'
import { axios } from '../../../plugins/axios'
import { StyledCard } from '../../../styles/StyledCard'
import { LoadingComponent } from '../../../components/LoadingComponent'
import { NoDataComponent } from '../../../components/NoDataComponent'

import { tableHeader } from './tableHeader'
import { tableContent } from './tableContent'
import { displayUserDetails } from './displayUserDetails'

export const MyPenalties = () => {
  const [detailUser, setDetailUser] = useState(false)

  const [loading, setLoading] = useState(false)
  const [penalties, setPenalties] = useState([])

  const fetchData = async () => {
    setLoading(true)
    const request = await axios({
      method: API_ROUTES.getPenaltiesActive.method,
      url: API_ROUTES.getPenaltiesActive.url
    })
    if (request.status === 200) {
      setPenalties(request.data.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <StyledContainer>
      <Navigation />
      {!detailUser && (
        <TableComponent
          title="Penalties"
          displaySearch={false}
          subtitle={`Total: ${penalties.length}`}
          titleColor="#E0425D"
          tableheader={tableHeader}
        >
          {loading && <LoadingComponent color="#E0425D" />}
          {(penalties.length &&
            penalties.map(
              ({
                user_code: code,
                active,
                conclusion,
                reason,
                created_at: created
              }) => (
                <StyledCard
                  width="100%"
                  flexDirection="column"
                  alignItems="start"
                  margin="0 0 16px 0"
                  key={code}
                >
                  {tableContent(
                    { code, conclusion, created, reason },
                    setDetailUser
                  )}
                </StyledCard>
              )
            )) ||
            (!loading && <NoDataComponent color="#E0425D" />)}
        </TableComponent>
      )}
      {detailUser && displayUserDetails(detailUser, setDetailUser)}
    </StyledContainer>
  )
}
