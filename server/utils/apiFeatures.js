// 将各种针对query的操作放在对象内部
class APIFeatures {
  constructor(query, queryString) {
    this.query = query; // 传入Tour.find() or Tour
    this.queryString = queryString; // 传入req.query
  }

  filter() {
    // 1、FILTERING
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((element) => delete queryObj[element]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // 2、BUILD QUERY
    this.query = this.query.find(JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    // 3、SORTING
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-publishAt'); // 默认排序
    }
    return this;
  }

  limitFields() {
    // 4、FIELDS LIMITING
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    // 5、PAGINATION
    const page = this.queryString.page * 1 || 1; // *1是为了转化为Number类型
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit; // 比如当前第2页则skip = (2-1)*10
    // skip用来跳过指定个数的document
    // limit用来指定最大返回个数
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
