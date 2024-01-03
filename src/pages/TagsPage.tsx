import { Pagination } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import TagApi from '~/apis/tagApi'
import { useAppSelector } from '~/app/hooks'
import { TagFilterSelector, TagListSelector, TagPaginationSelector, getTag, setTagFilter } from '~/app/tag/tagSlice'
import { ActionAdd } from '~/components/action'
import DashboardTitle from '~/components/common/DashboardTitle'
import { TagDetail, TagFilter, TagList } from '~/modules/tag'
import { API_STATUS, ApiResponseDTO, FilterPramsDTO, Tag, defaultFilter } from '~/types'
import { REMOVE_SUCCESS } from '~/utils/message'

export default function TagsPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const filter = useAppSelector(TagFilterSelector) || defaultFilter
  const tagList = useAppSelector(TagListSelector)
  const pagination = useAppSelector(TagPaginationSelector)

  const [isTagDetailOpen, setIsTagDetailOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null)

  const onPageChange = (page: number) => {
    dispatch(
      getTag({
        ...filter,
        pageNo: page
      })
    )
  }

  const hanldeCloseTagDetail = () => {
    setIsTagDetailOpen(false)
  }

  const handleAddTag = () => {
    setSelectedTag(null)
    setIsTagDetailOpen(true)
  }

  const handleEditTag = (tag: Tag) => {
    setIsTagDetailOpen(true)
    setSelectedTag(tag)
  }

  const handleSaveTag = () => {
    dispatch(getTag(filter))
  }

  const handleSearchTag = (filter: FilterPramsDTO) => {
    dispatch(getTag(filter))
  }

  const handleSetFilter = (filter: FilterPramsDTO) => {
    dispatch(setTagFilter(filter))
  }

  const handleRemoveTag = async (tag: Tag) => {
    try {
      const response: ApiResponseDTO<null> = await TagApi.removeTag(tag?.id || 0, navigate)
      if (response?.status.includes(API_STATUS.FAILED)) {
        return toast.error(response.message)
      }
      toast.success(REMOVE_SUCCESS)
      dispatch(getTag(filter))
    } catch (error: any) {
      console.log(error)
      return toast.error(error)
    }
  }

  useEffect(() => {
    dispatch(getTag(filter))
  }, [])

  return (
    <div className='flex flex-col h-full p-6 mx-auto'>
      <DashboardTitle title='Tags'>Quản lý thông tin tags 🔗</DashboardTitle>
      <div className='grid flex-1 grid-flow-row grid-cols-1 gap-4 xl:grid-flow-col'>
        <div className='flex flex-col order-2 px-4 py-6 bg-white rounded-xl dark:bg-darkbg3 xl:order-1'>
          <div id='tags-list' className='flex flex-wrap items-center justify-start gap-3 mb-6'>
            <TagFilter filter={filter} onSeach={handleSearchTag} onSetFilter={handleSetFilter}></TagFilter>
            <ActionAdd onClick={handleAddTag}></ActionAdd>
          </div>

          <div className='flex-1 overflow-x-auto'>
            <TagList data={tagList || []} onEditTag={handleEditTag} onRemoveTag={handleRemoveTag}></TagList>
          </div>

          <div className='flex items-center justify-center mt-10'>
            <Pagination
              layout='pagination'
              currentPage={pagination.pageNo}
              totalPages={pagination.totalPage}
              onPageChange={onPageChange}
              previousLabel='Prev'
              nextLabel='Next'
              showIcons
            />
          </div>
        </div>

        {isTagDetailOpen && (
          <TagDetail
            data={selectedTag}
            className={`order-1 bg-white xl:w-[500px] rounded-xl dark:bg-darkbg3 xl:order-2 w-full px-4 py-6`}
            onCloseTag={hanldeCloseTagDetail}
            onSaveTag={handleSaveTag}
          ></TagDetail>
        )}
      </div>
    </div>
  )
}
