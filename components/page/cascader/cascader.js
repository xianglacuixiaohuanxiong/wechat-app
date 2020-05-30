// import { getCategory } from '/api';
Page({
  data: {
    list: [],
    view: [
      [
        {
          name: '选项1', id: 1, level: 1, children: [
            { name: '选项11', id: 11, level: 2, children: [
                { name: '选项111', id: 111, level: 3, children: [] }
              ]
            }
          ]
        },
        { name: '选项2', id: 2, level: 1, children: [] },
        { name: '选项3', id: 3, level: 1, children: [] },
        { name: '选项4', id: 4, level: 1, children: [] },
        { name: '选项5', id: 5, level: 1, children: [] },
      ]
    ],
    //  当前选中
    currentItem: {},
    //  当前所在index
    currentIndex: 0
  },
  onLoad() {
    let str = `view[0]`
    this.setData({
      list: this.data.view[0]
    })
    // this.getCategoryList();
  },
  getCategoryList () {
    getCategory({ parentId: 1 }).then(res => {
      let str = `view[0]`
      this.setData({
        [str]: res
      }, () => {
        this.setData({
          list: this.data.view[0]
        })
      })
    })
  },
  //  选项改变时
  radioChange (e) {
    const currentItem = e.detail.value;
    this.setData({
      currentItem
    })
  },
  //  查看下级
  scrollNext (e) {
    console.log(e)
    // console.log(e.currentTarget.dataset.item)
    let list = e.currentTarget.dataset.item.children;
    let index = e.currentTarget.dataset.item.level;
    let str = `view[${index}]`
    this.setData({
      list,
      [str]: list,
      currentIndex: index
    })
  },
  //  返回上一层
  back () {
    const index = this.data.currentIndex - 1;
    let list = this.data.view[index];
    if (index !== -1) {
      this.setData({
        list,
        currentIndex: index
      })
    }
  },
  submit () {
    const val = this.data.currentItem;
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    prevPage.setData({
      'form.categoryName': val.name,
      'form.categoryId': val.id,
      'form.tagName': '',
      chooseList: [],
      prev: true,
    }, () => {
      dd.navigateBack()
    })
  },
});
