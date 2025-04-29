import Link from "next/link";
export interface PaginationProps {
  totalPages: number;
  pageNumber: number;
  handleClick: (num: number) => void;
}
const Pagination = ({ totalPages, pageNumber, handleClick }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePreviousClick = () => {
    handleClick(pageNumber - 1);
  };

  const handleNextClick = () => {
    handleClick(pageNumber + 1);
  };

  return (
    <nav>
      <div className="nav-links">
        <ul className="rbt-pagination">
          <li className={pageNumber === 1 ? "disabled" : ""}>
            <Link
              href="#"
              aria-label="Previous"
              onClick={() => handlePreviousClick()}
            >
              <i className="feather-chevron-left" />
            </Link>
          </li>
          {pages.map((num) => (
            <li key={num} className={pageNumber === num ? "active" : ""}>
              <Link href="#" onClick={() => handleClick(num)}>
                {num}
              </Link>
            </li>
          ))}

          <li className={pageNumber === totalPages ? "disabled" : ""}>
            <Link href="#" aria-label="Next" onClick={() => handleNextClick()}>
              <i className="feather-chevron-right" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Pagination;
