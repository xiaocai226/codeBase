<!-- 固定滚动描点代码 -->
<template>
  <div>
    <nav>
      <ul>
        <li class="">AI 工具集</li>
        <li v-for="(section, index) in sections" :key="index">
          <a @click="scrollToSection(section.ref)" :class="{ active: activeSection === section.ref }">{{ section.name }}</a>
        </li>
      </ul>
    </nav>

    <section v-for="(section, index) in sections" :key="index" :ref="section.ref">
      {{ section.name }}
    </section>
  </div>
</template>

<script>
// import ai from '@/utils/province';
export default {
  data() {
    return {
      sections: [
        { name: 'Section 1', ref: 'section1' },
        { name: 'Section 2', ref: 'section2' },
        { name: 'Section 3', ref: 'section3' },
        { name: 'Section 4', ref: 'section4' },
      ],
      activeSection: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.observeSections();
      window.addEventListener('scroll', this.handleScroll);
    });
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {

    scrollToSection(sectionRef) {
      console.log('sectionRef',sectionRef)
      const section = this.$refs[sectionRef][0];
      console.log('section',section)
      const offsetTop = section.offsetTop;
      console.log('offsetTop',offsetTop)

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    },

    // 这段代码的作用是遍历所有的section，为每个section创建一个IntersectionObserver实例，以监测它们的可见性。
    // 当某个section进入视窗时，IntersectionObserver会触发回调函数，将该section的引用赋值给this.activeSection，从而实现滚动高亮效果
    observeSections() {
      // 创建一个IntersectionObserver实例。这个实例会在每个section元素进入或离开视窗时触发回调函数
      const observer = new IntersectionObserver(
        // entries是一个数组，包含所有被观察的元素（在这里就是section元素）的可见性信息
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const sectionRef = entry.target.dataset.sectionRef;
              this.activeSection = sectionRef;
            }
          });
        },
        // 设置触发回调的阈值，当元素可见性达到50%或更多时，触发回调
        { threshold: 0.5 }
      );

      this.sections.forEach(section => {
        const sectionElement = this.$refs[section.ref][0];
        // 为sectionElement添加一个data-section-ref属性，用于存储section的引用
        sectionElement.dataset.sectionRef = section.ref;

        // 使用this.$nextTick确保在下一个DOM更新周期中执行观察器的observe方法。这是为了确保sectionElement已被挂载到DOM上。
        // 使用this.$nextTick确保sectionElement已挂载到DOM
        this.$nextTick(() => {
          observer.observe(sectionElement);
        });
      });
    },

    // 监听滚动事件 实时计算当前滚动位置在哪个'section'的可见范围内
    handleScroll() {
      // 获取当前滚动的垂直位置
      const scrollPosition = window.scrollY;

      // 获取每个 section 的顶部（top）和底部（bottom）位置
      const sectionTops = this.sections.map(section => {
        const sectionElement = this.$refs[section.ref][0];
        return {
          ref: section.ref,
          top: sectionElement.offsetTop,
          bottom: sectionElement.offsetTop + sectionElement.offsetHeight
        };
      });

      // 初始化一个变量 activeSection，用于保存当前可见的 section。
      let activeSection = null;

      // 遍历计算得到的 sectionTops 数组，检查当前滚动位置是否在某个 section 的可见范围内
      sectionTops.forEach(section => {
        // 如果当前滚动位置在某个 section 的可见范围内，则将该 section 的 ref 赋值给 activeSection
        if (scrollPosition >= section.top && scrollPosition < section.bottom) {
          activeSection = section.ref;
        }
      });

      //  如果 activeSection 与当前的 this.activeSection 不一致，说明可见的 section 发生了变化，更新 this.activeSection
      if (activeSection !== this.activeSection) {
        this.activeSection = activeSection;
      }
    }
  }
};
</script>

<style>
  /* body {
    margin: 0;
    font-family: Arial, sans-serif;
  } */

  section {
    /* width: 900px; */
    /* border: 1px solid black; */
    margin-left: 240px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
  }

  nav {
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    width: 240px;
    background-color: #F9F9F9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  nav ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  nav li {
    margin-bottom: 10px;
  }

  nav a {
    text-decoration: none;
    color: #333;
    cursor: pointer;
    transition: color 0.3s;
  }

  nav a.active {
    color: #ff5722; /* Highlight color */
  }
</style>