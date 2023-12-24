import { Pagination } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import categoryApi from '~/apis/categoryApi'
import { categoryListSelector, getCategory } from '~/app/category/categorySlice'
import { ActionAdd } from '~/components/action'
import DashboardTitle from '~/components/common/DashboardTitle'
import { CategoryDetail, CategoryList } from '~/modules/category'
import { API_STATUS, ApiResponseDTO, Category, CategoryRequestDTO } from '~/types'
import { REMOVE_SUCCESS } from '~/utils/message'

export default function CategoriesPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const categoryList = useSelector(categoryListSelector)
  const [isCategoryDetailOpen, setIsCategoryDetailOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = (page: number) => setCurrentPage(page)

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
      dispatch(getCategory())
    } catch (error: any) {
      console.log(error)
      return toast.error(error)
    }
  }

  const handleSaveCategory = () => {
    dispatch(getCategory())
  }

  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])

  return (
    <div className='flex flex-col h-full p-6 mx-auto'>
      <DashboardTitle title='Categories'>Quản lý thông tin category của bạn 🌵</DashboardTitle>
      <div className='grid flex-1 grid-flow-row grid-cols-1 gap-4 xl:grid-flow-col'>
        <div
          id='categories-list'
          className='flex flex-col order-2 px-4 py-6 bg-white rounded-xl dark:bg-darkbg3 xl:order-1'
        >
          <div className='flex items-center justify-end mb-6'>
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
              currentPage={currentPage}
              totalPages={1000}
              onPageChange={onPageChange}
              previousLabel='Previous'
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
