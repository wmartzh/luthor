import React, { useState, useEffect, useCallback } from 'react'
import { TableComponent } from '../../../components/TableComponent'
import { LoadingComponent } from '../../../components/LoadingComponent'
import { StyledCard } from '../../../styles/StyledCard'
import { tableContent } from './tableContent'
import { NoDataComponent } from '../../../components/NoDataComponent'
import { requestService } from '../../../services/requestService'
import { API_ROUTES } from '../../../constants/apiRoutes'
import { tableHeader } from './tableHeader'
import { StyledTypography } from '../../../styles/StyledTypography'

export const StudentsTable = ({ selectedEvent }) => {
  const [students, setStudents] = useState([])
  const [studentEvent, setStudentEvent] = useState([])
  const [validStudent, setValidStudent] = useState([])

  const [search, setSearch] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [stateFalse, setStateFalse] = useState(false)

  useEffect(() => {
    requestService(
      API_ROUTES.getStudents.method,
      API_ROUTES.getStudents.url.base,
      setStudents,
      setLoading,
      setError
    )
  }, [])

  useEffect(() => {
    if (selectedEvent) {
      requestService(
        API_ROUTES.getFilterAssistance.method,
        `${API_ROUTES.getFilterAssistance.url}/${selectedEvent.id}`,
        setStudentEvent,
        setStateFalse,
        setStateFalse
      )
    }
  }, [selectedEvent])

  const searchResult = () => {
    let result = validStudent.filter(data => {
      return (
        data['first_name'].toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
    })
    return result ? (
      <>
        {(result.length &&
          result.map(
            ({
              code,
              status,
              first_name: firstName,
              last_name: lastName,
              phone_number: phone,
              present
            }) => (
              <StyledCard
                width="100%"
                flexDirection="column"
                alignItems="start"
                margin="0 0 16px 0"
                key={code}
              >
                {tableContent(
                  { code, firstName, lastName, phone, status, present },
                  selectedEvent
                )}
              </StyledCard>
            )
          )) ||
          (!loading && (
            <StyledCard width="100%" flexDirection="column" alignItems="center">
              <StyledTypography
                fontSize="14px"
                fontFamily="Segoe UI"
                fontWeigth="600"
                color="#4F3C75"
              >
                No found
              </StyledTypography>
            </StyledCard>
          ))}
      </>
    ) : (
      <StyledCard width="100%" flexDirection="column" alignItems="center">
        <StyledTypography
          fontSize="14px"
          fontFamily="Segoe UI"
          fontWeigth="600"
          color="#4F3C75"
        >
          Searching...
        </StyledTypography>
      </StyledCard>
    )
  }

  const displayTable = () => {
    let valid = students.map(student => ({
      ...student,
      present: studentEvent.find(data => {
        return data['user_code'] === student.code
      })
    }))
    setValidStudent(valid)
    return (
      (students.length !== 0 &&
        valid.map(
          ({
            code,
            status,
            first_name: firstName,
            last_name: lastName,
            phone_number: phone,
            present
          }) => (
            <StyledCard
              width="100%"
              flexDirection="column"
              alignItems="start"
              margin="0 0 16px 0"
              key={code}
            >
              {tableContent(
                { code, firstName, lastName, phone, status, present },
                selectedEvent
              )}
            </StyledCard>
          )
        )) ||
      (!loading && <NoDataComponent color="#12B6C6" />)
    )
  }

  return (
    <TableComponent
      title="Assistance"
      subtitle={`Total: ${students.length}`}
      titleColor="#12B6C6"
      search={setSearch}
      searchTitle="name"
      tableheader={tableHeader}
      to="take-assistance"
    >
      {loading && <LoadingComponent color="#12B6C6" />}
      {search.length === 0 ? displayTable() : searchResult()}
    </TableComponent>
  )
}
