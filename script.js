/**
 * @author yonatan
 * @date 2020-05
 */
import { Menu, Projects } from "./data/Projects.js"; // 引入页面数据

const app = new Vue({
  el: "#app",
  data: {
    serial: 0,
    menu: Menu,
    projects: Projects,
    showMoreBtn: false, // 显示‘更多’按钮
    isCollapse: true, // 展开‘功能特性’
  },
  methods: {
    /**
     * 打开新标签页
     */
    jump() {
      window.open(this.projects[this.serial].link);
    },
    /**
     * 展开/收起‘功能特性’
     */
    showMore() {
      this.isCollapse = !this.isCollapse;
      let height = 0;
      this.isCollapse ? (height = "100px") : (height = "100%");
      this.$refs.showMore.style.height = height;
    },
    /**
     * 点击导航栏选项时更新序号
     * @param {序号} serial 
     */
    selectItem(serial) {
      this.serial = serial - 1; // 序号变化后页面会同步更新数据
      location.href = "#" + serial; // 更新地址栏上的序号
    },
    /**
     * 切换上下项
     * @param {前进数/后退数} num 
     */
    continuing(num) {
      this.serial += num;
      this.$refs.scrollbar.$refs.wrap.scrollTop = 0;
    },
  },
  watch: {
    // 监听‘功能特性’文字长度变化
    serial: function () { 
      this.$nextTick(() => {
        if (this.$refs.showMore.offsetHeight > 100) {
          this.showMoreBtn = true; // 超出100px显示更多按钮
          this.$refs.showMore.style.height = "100px"; // 显示范围为100px
          this.isCollapse = true;
        } else {
          this.showMoreBtn = false;
          this.$refs.showMore.style.height = "100%";
        }
      })
    },
  },
  mounted() {
    // 控制显示范围
    this.$nextTick(() => {
      if (this.$refs.showMore.offsetHeight > 100) {
        this.showMoreBtn = true;
        this.$refs.showMore.style.height = "100px";
      }
    });

    // 获取地址栏序号为当前序号
    let urlStr = location.href;
    let index = urlStr.lastIndexOf("#");
    urlStr = urlStr.substring(index + 1, urlStr.length);
    this.serial = urlStr - 1;
  }
}).$mount("#app");
