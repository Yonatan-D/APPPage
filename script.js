// 引入
import { Menu, Projects } from "./data/Projects.js";

// const Foo = { template: "<div>foo</div>" };
// const Bar = { template: "<div>bar</div>" };

// const routes = [
//   { path: "/foo", component: Foo },
//   { path: "/bar", component: Bar },
// ];

// const router = new VueRouter({
//   routes,
// });

const app = new Vue({
  el: "#app",
  data: {
    serial: 0,
    menu: Menu,
    projects: Projects,
    showMoreBtn: false,
    isCollapse: true,
  },
  methods: {
    jump() {
      window.open(this.projects[this.serial].link);
    },
    showMore() {
      this.isCollapse = !this.isCollapse;
      let height = 0;
      this.isCollapse ? (height = "100px") : (height = "100%");
      this.$refs.showMore.style.height = height;
    },
    selectItem(serial) {
      this.serial = serial - 1;
      location.href = "#" + serial;
    },
    continuing(num) {
      this.serial += num;
      this.$refs.scrollbar.$refs.wrap.scrollTop = 0;
    },
  },
  watch: {
    serial: function () {
      this.$nextTick(() => {
        if (this.$refs.showMore.offsetHeight > 100) {
          this.showMoreBtn = true; // 超出100px显示更多按钮
          this.$refs.showMore.style.height = "100px"; // 控制显示范围为100px
          this.isCollapse = true;
        } else {
          this.showMoreBtn = false;
          this.$refs.showMore.style.height = "100%";
        }
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.showMore.offsetHeight > 100) {
        this.showMoreBtn = true; // 超出100px显示更多按钮
        this.$refs.showMore.style.height = "100px"; // 控制显示范围为100px
      }
    });

    var urlStr = location.href;
    var index = urlStr.lastIndexOf("#");
    urlStr = urlStr.substring(index + 1, urlStr.length);
    this.serial = urlStr - 1;
  },
  //   router,
}).$mount("#app");
