const paginate = (page: any, pageSize: any) => {
  const offset = page * pageSize;
  const limit = pageSize;

  return {
    offset,
    limit
  };
};

export default paginate;
