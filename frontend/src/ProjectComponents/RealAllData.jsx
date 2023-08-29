import React, { useEffect, useState } from 'react';

const ReadAllData = () => {
  const [page, setPage] = useState(1);
  const [pageInformation, setPageInformation] = useState({});

  useEffect(() => {
    const fakePageData = {
         currentPage: page,
         totalPage: 5, 
        hasNextPage: page < 5, 
      hasPreviousPage: page > 1,
    };
    setPageInformation(fakePageData);
  }, [page]);

  const renderText = () => {
    switch (page) {
      case 1:   return "This is page 1 content.";
            case 2: return "This is page 2 content.";
      case 3:   return "This is page 3 content.";
          case 4: return "This is page 4 content.";
       case 5:   return "This is page 5 content.";
      default:  return "Unknown page content.";
    }
  };

  return (
    <div>
      {renderText()}
<br></br>
<br></br>
    <button
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);}}}
        disabled={!pageInformation.hasPreviousPage}>Previous</button>

      {pageInformation.currentPage} of {pageInformation.totalPage}

      <button
        onClick={() => {
          if (page < pageInformation.totalPage) {
            setPage(page + 1);}}}
        disabled={!pageInformation.hasNextPage}>Next</button>
    </div>
  );
};

export default ReadAllData;
