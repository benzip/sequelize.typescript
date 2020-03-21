const paginate = (page: any, pageSize: any) => {
  const offset = page * pageSize;
  const limit = pageSize;

  if (page >= 0) {
    return {
      offset,
      limit
    };
  } else {
    return null;
  }
};

export default paginate;
