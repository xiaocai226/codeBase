<template>
    <el-container style="height: 100vh">
        <el-header style='padding: 0px;height: 80px;border-bottom: 3px solid #dcbae5;'>
            <OpHeader />
        </el-header>
        <el-container>
            <el-aside width="210px" style="border-right: 3px solid #dcbae5;">
                <OpAside />
            </el-aside>
            <el-main>
                <OpMain />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import OpAside from '@/layout/OpAside';
import OpHeader from '@/layout/OpHeader';
import OpMain from '@/layout/OpMain';
// import moment from "moment";
export default {
    components: {
        OpAside,
        OpHeader,
        OpMain
    },
    data() {
        return {
        }
    },
    methods: {
       
    },
    created() {

    },
}
</script>