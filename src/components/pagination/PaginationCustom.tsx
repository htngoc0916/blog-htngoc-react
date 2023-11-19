import ReactPaginate from 'react-paginate'
export interface PaginationCustomProps {}

export default function PaginationCustom() {
  const handlePageClick = () => {}
  return (
    <ReactPaginate
      breakLabel='...'
      nextLabel='next >'
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={5}
      previousLabel='< previous'
      renderOnZeroPageCount={null}
      className='pagination'
    />
  )
}
