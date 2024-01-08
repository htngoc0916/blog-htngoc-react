import { Pagination } from 'flowbite-react'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import categoryApi from '~/apis/categoryApi'
import {
  categoryFilterSelector,
  categoryListSelector,
  categoryLoadingSelector,
  categoryPaginationSelector,
  getCategory,
  setCategoryFilter
} from '~/app/category/categorySlice'
import { useAppSelector } from '~/app/hooks'
import { ActionAdd } from '~/components/action'
import DashboardTitle from '~/components/common/DashboardTitle'
import { CategoryDetail, CategoryList, CategoryFilter } from '~/modules/category'
import { API_STATUS, ApiResponseDTO, Category, FilterPramsDTO, defaultFilter } from '~/types'
import { REMOVE_SUCCESS } from '~/utils/message'

export default function CategoriesPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loading = useAppSelector(categoryLoadingSelector)
  const filter = useAppSelector(categoryFilterSelector) || defaultFilter
  const categoryList = useAppSelector(categoryListSelector)
  const pagination = useAppSelector(categoryPaginationSelector)

  const [isCategoryDetailOpen, setIsCategoryDetailOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  //pagination
  const onPageChange = (page: number) => {
    dispatch(
      getCategory({
        ...filter,
        pageNo: page
      })
    )
  }

  const hanldeCloseCategoryDetail = () => {
    setIsCategoryDetailOpen(false)
  }

  const handleAddCategory = () => {
    setSelectedCategory(null)
    setIsCategoryDetailOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setIsCategoryDetailOpen(true)
    setSelectedCategory(category)
  }

  const handleRemoveCategory = async (category: Category) => {
    try {
      const response: ApiResponseDTO<null> = await categoryApi.removeCategory(category?.id || 0, navigate)
      if (response?.status.includes(API_STATUS.FAILED)) {
        return toast.error(response.message)
      }

      toast.success(REMOVE_SUCCESS)
      dispatch(getCategory(filter))
    } catch (error: any) {
      console.log(error)
      return toast.error(error)
    }
  }

  const handleSaveCategory = () => {
    dispatch(getCategory(filter))
  }

  // const handleSearchCategory = (filter: FilterPramsDTO) => {
  //   dispatch(getCategory(filter))
  // }

  // const handleSetFilter = (filter: FilterPramsDTO) => {
  //   dispatch(setCategoryFilter(filter))
  // }

  const handleSearchCategory = useCallback(
    (filter: FilterPramsDTO) => {
      dispatch(getCategory(filter))
    },
    [dispatch]
  )

  const handleSetFilter = useCallback(
    (filter: FilterPramsDTO) => {
      dispatch(setCategoryFilter(filter))
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(getCategory(filter))
  }, [])

  return (
    <div className='flex flex-col h-full p-6 mx-auto'>
      <DashboardTitle title='Categories'>Quản lý thông tin categories 🌵</DashboardTitle>
      <div className='grid flex-1 grid-flow-row grid-cols-1 gap-4 xl:grid-flow-col'>
        <div className='flex flex-col order-2 px-4 py-6 bg-white rounded-xl dark:bg-darkbg3 xl:order-1'>
          <div id='categories-list' className='flex flex-wrap items-center justify-start gap-3 mb-6'>
            <CategoryFilter
              filter={filter}
              onSeach={handleSearchCategory}
              onSetFilter={handleSetFilter}
            ></CategoryFilter>
            <ActionAdd onClick={handleAddCategory}></ActionAdd>
          </div>
          <div className='flex-1 overflow-x-auto'>
            <CategoryList
              data={categoryList || []}
              onEditCategory={handleEditCategory}
              onRemoveCategory={handleRemoveCategory}
            ></CategoryList>
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
        {isCategoryDetailOpen && (
          <CategoryDetail
            data={selectedCategory}
            className={`order-1 bg-white xl:w-[500px] rounded-xl dark:bg-darkbg3 xl:order-2 w-full px-4 py-6`}
            onCloseCategory={hanldeCloseCategoryDetail}
            onSaveCategory={handleSaveCategory}
          ></CategoryDetail>
        )}
      </div>
    </div>
  )
}
