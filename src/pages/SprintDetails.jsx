import { useNavigate, useParams } from 'react-router-dom'
import { useGetSprint } from '../hooks/data/use-get-sprint'
import StatusBadge from '../components/StatusBadge'
import { statusLabels } from '../utils/statusLabels'
import { statusVariants } from '../utils/statusVariants'
import DateRange from '../components/DateRange'
import Header from '../components/Header'
import Button from '../components/Button'
import EditIcon from '../assets/icons/edit.svg?react'
import ArrowLeftIcon from '../assets/icons/arrow-left.svg?react'
import SprintStatCards from '../components/SprintStatCards'

const SprintDetails = () => {
  const { sprintId } = useParams()

  const id = Number(sprintId)

  const { data: sprint } = useGetSprint(id)
  const pageBack = useNavigate()

  return (
    <div className="flex flex-col gap-8 p-10">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <button
            className="bg-secondary mb-1 self-start rounded-[50%] p-2 hover:cursor-pointer"
            onClick={() => pageBack(-1)}
          >
            <ArrowLeftIcon />
          </button>
          <div className="flex gap-3">
            <StatusBadge
              status={statusVariants[sprint?.status]}
              title={statusLabels[sprint?.status]}
            />
            <DateRange
              startDate={sprint?.startDate}
              endDate={sprint?.endDate}
            />
          </div>
          <Header title={sprint?.title} description={sprint?.description} />
        </div>
        <Button color="secondary">
          <EditIcon /> Editar sprint
        </Button>
      </div>

      <SprintStatCards id={id} />
    </div>
  )
}

export default SprintDetails
