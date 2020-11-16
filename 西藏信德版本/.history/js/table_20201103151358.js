  //初始化表格 
  $('#table').bootstrapTable({
      // url: "json/data.json",
      // datatype: "json",
      toolbar: '#toolbar', //工具按钮用哪个容器
      pagination: true, //是否显示分页（*）
      cache: false,
      clickToSelect: false,
      showRefresh: false, //是否显示刷新按钮
      showPaginationSwitch: false, //是否显示选择分页数按钮
      pageNumber: 1, //初始化加载第一页，默认第一页
      pageSize: 10, //每页的记录行数（*）
      search: true,
      searchText: "请输入查询代码",
      paginationPreText: "上一页",
      paginationNextText: "下一页",
      strictSearch: true,
      showExport: true,

      columns: [{
          field: 'id',
          title: '登记代码'
      }, {
          field: 'name',
          title: '登记名称'
      }, {
          field: 'inuser',
          title: '管理人'
      }, {
          field: 'zhuanrang',
          title: '转让方'
      }, {
          field: 'money',
          title: '转让金额'
      }, {
          field: 'price',
          title: '交易标的总金额'
      }, {
          field: 'time_end',
          title: '标的到期日'
      }, {
          field: 'status',
          title: '标的状态'
      }, {
          field: 'info',
          title: '信息披露'
      }, ],
      data
  });