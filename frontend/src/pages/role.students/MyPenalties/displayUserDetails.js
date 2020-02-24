import React from 'react'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { StyledSpacer } from '../../../styles/StyledSpacer'
import { StyledCard } from '../../../styles/StyledCard'
import { StyledBackButton } from '../../../styles/StyledBackButton'
import { StyledTypography } from '../../../styles/StyledTypography'
import { TextLabelContent } from '../../../components/TextLabelContent'
import moment from 'moment'

export const displayUserDetails = (detailUser, setDetailUser) => (
  <>
    <StyledSpacer height="90px" />
    <StyledCard flexDirection="column" width="400px">
      <StyledBackButton>
        <ArrowBackIosIcon
          onClick={() => {
            setDetailUser(false)
          }}
          fontSize="small"
          style={{ marginTop: '5px' }}
        />
      </StyledBackButton>
      <StyledTypography
        fontSize="24px"
        fontWeigth="600"
        fontFamily="Segoe UI"
        color="#E0425D"
        style={{ margin: '0 0 8px 0' }}
      >
        Details of {detailUser.firstName}
      </StyledTypography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          width: '100%'
        }}
      >
        <TextLabelContent
          label="Reason:"
          content={detailUser.reason}
          colorLabel="#E0425D"
        />

        <TextLabelContent
          label="Penaltie end:"
          content={moment(detailUser.conclusion).format('DD/MMM/YYYY')}
          colorLabel="#E0425D"
        />

        <StyledSpacer height="10px" />
        <TextLabelContent
          label="Created:"
          content={moment(detailUser.created).format('DD/MMM/YYYY')}
          colorLabel="#E0425D"
        />
      </div>
    </StyledCard>
  </>
)
