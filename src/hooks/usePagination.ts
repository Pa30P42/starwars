import {Dispatch, SetStateAction, useState} from 'react';

type Pagination = {
  page: number;
  getNextPage: () => void;
  getPrevPage: () => void;
  setNextPage: Dispatch<SetStateAction<string | null>>;
  setPrevPage: Dispatch<SetStateAction<string | null>>;
};

const usePagination = (): Pagination => {
  const [page, setPage] = useState<number>(1);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  const goToPage = (targetPage: number) => {
    if (targetPage >= 1) {
      setPage(targetPage);
    }
  };

  const getNextPage = () => {
    if (nextPage) {
      const nextPageNumber = getPageNumberFromUrl(nextPage);
      goToPage(nextPageNumber);
    }
  };

  const getPrevPage = () => {
    if (prevPage) {
      const prevPageNumber = getPageNumberFromUrl(prevPage);
      goToPage(prevPageNumber);
    }
  };

  const getPageNumberFromUrl = (url: string) => {
    const match = url.match(/page=(\d+)/);
    if (match) {
      return parseInt(match[1], 10);
    }
    return 1;
  };

  return {
    page,
    getNextPage,
    getPrevPage,
    setNextPage,
    setPrevPage,
  };
};

export default usePagination;
