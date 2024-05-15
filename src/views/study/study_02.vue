<template>
<!-- 学习内容：使用swiper插件进行轮播 -->
    <el-card>
        <div class="title">blunt！blunt！blunt！</div>

        <div style="max-width: 1200px;">
            <swiper :options="swiperOptions" ref="mySwiper" @mouseenter.native="swiperMouseEnter" @mouseleave.native="swiperMouseLeave">
                <swiper-slide v-for="(item, index) in logoList" :key="index">
                    <!-- :alt="Slide ${index + 1}" 的作用是为每个图片设置一个动态的alt文本，
                    以便在页面中显示类似 "Slide 1"、"Slide 2" 等的描述，使得每张幻灯片都有一
                    个唯一的描述。这样的做法有助于提高页面的可访问性，因为屏幕阅读器等工具可以
                    读取alt属性，从而向用户描述图像的内容 -->
                    <img :src="item" :alt="`Slide ${index + 1}`" />
                </swiper-slide>
            </swiper>
        </div>
    </el-card>
</template>

<script>
import 'swiper/css/swiper.css';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            swiperOptions: {
                slidesPerView: 5, // 定义slides的数量多少为一组
                // spaceBetween: 20, // 在slide之间设置距离（单位px）
                mousewheel: true, // 开启鼠标滚轮控制Swiper切换
                loop: true,// 是否循环
                // autoplay: true, // 是否自动切换
                autoplay: {
                    delay: 1500,
                },
            },

            logoList: [
                require('@/img/logo/Group 65.png'),
                require('@/img/logo/Group 66.png'),
                require('@/img/logo/Group 67.png'),
                require('@/img/logo/Group 68.png'),
                require('@/img/logo/Group 69.png'),
                require('@/img/logo/Group 70.png'),
                require('@/img/logo/Group 71.png'),
                require('@/img/logo/Group 72.png'),
                require('@/img/logo/Group 73.png'),
                require('@/img/logo/Group 74.png'),
            ],
        }
    },
    methods: {
        swiperMouseEnter() {
            this.$refs.mySwiper.$swiper.autoplay.stop();
        },
        swiperMouseLeave() {
            this.$refs.mySwiper.$swiper.autoplay.start();
        },
    },
    created() {
        
    },
}
</script>

<style scoped>
.title{
    font-size: 22px;
}
.swiper-slide {
    box-sizing: border-box; /* 确保padding不会影响元素的实际尺寸 */
    padding-right: 20px; /* 设置图之间的间距，此处与spaceBetween一致 */
}
.swiper-wrapper {
    display: flex;
}
.swiper-slide img {
    width: 100%; /* 图片宽度填充整个swiper-slide */
    height: auto; /* 根据宽度等比例缩放图片 */
}
</style>