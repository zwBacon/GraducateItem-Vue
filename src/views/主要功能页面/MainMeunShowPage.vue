<template>

  <el-alert v-model:title="this.errorMessage" type="success" center id="successMessage" v-show="this.successDisper"/>

  <div id = "all"></div>
  <img src="../../assets/首页头资源/菜单.png" id="open" @click="open">
  <HeadLineViewForMain/>
  <router-view></router-view>

  <div id="OfficialSubscribe">
    <p id="titleContent">寄居蟹公众号</p>
    <img v-bind:src="towards" id="changePosition" @click="changePosition" @mouseover="changePositionColor(this.imgSrc)" @mouseleave="changePositionColorBack(this.imgSrc)">

<!--    公众号列表-->
    <div id="horizontal-display" v-show="OfficalAccountIsVisible">
      <el-card v-for="(item,index) in OfficalAccountResponseData" :key="item" class="OfficalAccount" :class="{ 'OfficalAccount1': index === 0, 'OfficalAccount2': index === 1 ,'OfficalAccount3': index === 2}">
        <img :src="this.stringplus + item.accountImg" class="OfficalAccountImg"> <p class="OfficalAccountName">{{item.accountName}}</p> <img src="../../assets/精选页资源/关注前.png" v-if="showItem[index]"  class="subscribeBtnImg"><img src="../../assets/精选页资源/关注后.png" v-else  class="subscribeBtnImg">
        <button class="subscribeBtn" @click="subscribe(index,item.accountName)"><p class="subscribeFont">关注</p></button> </el-card>
    </div>

    <span id="line1"></span>

  </div>

  <transition-group name="move-elements" tag="div">
  <div id="mainContent">
    <p id="SectitleContent" class="item">"蟹"的精选</p>
    <span id="line2" class="item"></span>
<!--搜索框-->
      <el-card id="secher" class="item">
        <input type="text"  placeholder="查询房型名称" id="secherInput" class="item"/>
        <img src='../../assets/精选页资源/搜索.png' id="serchImg" class="item">
      </el-card>

  </div>
  </transition-group>

</template>

<script>
import HeadLineViewForMain from "@/components/HeadLineViewForMain.vue";
import store from "core-js/internals/shared-store";
import router from "@/router";
import axios from "axios";




export default {
  name: "MainMeunShowPage",
  components: {
    HeadLineViewForMain
  },
  mounted() {
    this.headPageSubsribeShow();
  },
  updated(){
    var all = document.getElementById("all")
    if(store.state.leftSideChange == "back"){
      all.style.boxShadow="";
    }
  },
  data(){
    return{
      errorMessage: "",
      successDisper: false,
      showItem: Array(100).fill(true), // 用于控制显示与隐藏的数组
      stringplus: "data:image/png;base64,",
      OfficalAccountIsVisible:true,
      towards: require('../../assets/精选页资源/向下1.png'),
      imgSrc: '../../assets/精选页资源/向下1.png',
      OfficalAccountRequestData:{
        userName:"张虹生"
      },
      OfficalAccountResponseData:[],
      SubscribeAccountData:{
        userName:"",
        accountName:"",
        index:""
      }
    }
  },
  methods:{
    open() {
      store.state.leftSideChange = "go"
      router.push('/MainMeunShowPage/LeftSideLineView')
      var all = document.getElementById("all")
      all.style.backgroundColor="rgb(127, 127, 127)"
      all.style.boxShadow="0 0 0 1000px rgba(0,0,0,.3)";
    },
    // 查询公众号
    headPageSubsribeShow(){
      let _this = this;
      axios({
        method: "post",
        url: "http://localhost:2000/officalAccountController/headPageSubsribeShow",
        data: this.OfficalAccountRequestData
      }).then(function (resp) {
          _this.OfficalAccountResponseData = resp.data
          console.log(_this.OfficalAccountResponseData)
      })
    },
    // 成功信息
    SuccessMessageApperance() {
      this.successDisper = true;
      setTimeout(() => {
        this.successDisper = false
      }, 2000);
    },
    // 关注公众号
    subscribe(index,accounName){
      let _this = this;
      this.showItem[index] = !this.showItem[index];
      this.SubscribeAccountData.userName = "张虹生";
      // this.SubscribeAccountData.userName = store.state.LoadUsername;
      this.SubscribeAccountData.accountName = accounName;
      axios({
        method: "post",
        url: "http://localhost:2000/officalAccountController/addSubscribeAccount",
        data: this.SubscribeAccountData
      }).then(function (resp) {
        _this.errorMessage = resp.data["result"]
        _this.showItem[index] = !_this.showItem[index];
        _this.SuccessMessageApperance();
        _this.headPageSubsribeShow();
      })
    },
    // 变化位置
    changePosition(){
        this.OfficalAccountIsVisible = false
        if(this.imgSrc === '../../assets/精选页资源/向上1.png'){
          this.resetChangePosition();
        }else {
          this.towards = require('../../assets/精选页资源/向上1.png')
          this.imgSrc = '../../assets/精选页资源/向上1.png'
          var positionList = document.getElementsByClassName("item")
          for (let i = 0; i < positionList.length; i++) {
            var _position = positionList[i];
            var position = window.getComputedStyle(_position);
            var topValue = position.getPropertyValue('top');
            var topNumber = parseInt(topValue, 10);
            if (topNumber > 150) {
              var newtopNumber = topNumber - "150";
              _position.style.top = newtopNumber + "px"
            }
          }
        }
    },
    resetChangePosition(){
      this.OfficalAccountIsVisible = true
      this.towards=require('../../assets/精选页资源/向下1.png')
      this.imgSrc = '../../assets/精选页资源/向下1.png'
      var positionList = document.getElementsByClassName("item")
      for (let i = 0; i < positionList.length; i++) {
        var _position = positionList[i];
        var position = window.getComputedStyle(_position);
        var topValue = position.getPropertyValue('top');
        var topNumber = parseInt(topValue,10);
        if(topNumber > 30) {
          var newtopNumber = topNumber + 150;
          _position.style.top = newtopNumber + "px"
        }
      }
    },
  //   更改颜色
    changePositionColor(imgSrc){
       if (imgSrc==='../../assets/精选页资源/向下1.png'){
         this.towards=require('../../assets/精选页资源/向下1 (1).png')
       }else if (imgSrc==='../../assets/精选页资源/向上1.png'){
         this.towards=require('../../assets/精选页资源/向上1 (1).png')
       }
    },
    changePositionColorBack(imgSrc){
      if (imgSrc==='../../assets/精选页资源/向下1 (1).png'){
        this.towards=require('../../assets/精选页资源/向下1.png')
      }else if (imgSrc==='../../assets/精选页资源/向上1 (1).png'){
        this.towards=require('../../assets/精选页资源/向上1.png')
      }
    }
  }
}
</script>

<style scoped>
#horizontal-display {
  position: absolute;
  left: 150px;
  top: 150px;
  z-index: -1;
  display: flex; /* 使用 Flex 布局 */
  flex-direction: row; /* 水平方向展示 */
  justify-content: space-between;
}
.subscribeFont{
  position: relative;
  top: -1px;
  left: 12px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 2px;
  z-index: 1;
}
#successMessage {
  position: absolute;
  width: 300px;
  top: 60px;
  z-index: 2;
  left: 600px;
}
.subscribeBtn{
  position: relative;
  left: -10px;
  top: 30px;
  width: 87px;
  height: 25px;
  border-radius: 7px;
  background-color: #5A5B6BFF;
}
.subscribeBtn:hover{
  background-color: #484036;
}
.subscribeBtnImg{
  position: relative;
  left: 24px;
  top: 32px;
  width: 15px;
  height: 15px;
  z-index: 1;
}
.OfficalAccountName{
  position: relative;
  left: 25px;
  top: 10px;
  font-size: 13px;
  color: black;
}
.OfficalAccountImg{
  position: relative;
  left: 30px;
  width: 45px;
  height: 45px;
  border-radius: 50px;
}
.OfficalAccount{
  width: 150px;
  height: 155px;
  display: inline-block;
  margin-right: 40px; /* 可选：添加项目之间的间距 */
  background-color: #e7e6e6;
}

.OfficalAccount1{
  width: 151px;
  height: 156px;
  display: inline-block;
  margin-right: 40px; /* 可选：添加项目之间的间距 */
  background: linear-gradient(135deg, #c850c0, #4158d0);
}

.OfficalAccount2{
  width: 151px;
  height: 156px;
  display: inline-block;
  margin-right: 40px; /* 可选：添加项目之间的间距 */
  background: linear-gradient(135deg, #f6d365, #fda085);;
}

.OfficalAccount3{
  width: 151px;
  height: 156px;
  display: inline-block;
  margin-right: 40px; /* 可选：添加项目之间的间距 */
  background: linear-gradient(135deg, #ffbe0c, #ffda0c, #dad663, #f0f850, #7aff0c);;
}

#secher{
  position: absolute;
  top: 385px;
  left: 350px;
  width: 780px;
  height: 80px;
  z-index: -1;
}
#secherInput{
  position: absolute;
  top: 20px;
  left: 40px;
  width: 630px;
  height: 35px;
  z-index: 0;
  border-color: grey;
  border-width: 1px;
  border-style: solid;
}
#serchImg{
  position: absolute;
  top: 17px;
  right: 25px;
  width: 45px;
  height: 45px;
  z-index: 0;
}
#titleContent{
  position: absolute;
  top: 95px;
  left: 17px;
  font-weight: bold;
  font-size: 17px;
  letter-spacing: 0.7px;
  color: black;
  font-family: 华文中宋;
  z-index: -1;
}
#changePosition{
  position: absolute;
  width: 17px;
  height: 17px;
  top: 123px;
  left: 8px;
  z-index: -1;
}
#line1{
  position: absolute;
  top: 130px;
  width: 100%;
  height: 1px;
  background-color: grey;
  left: 30px;
  z-index: -1;
}

#SectitleContent{
  position: absolute;
  top: 295px;
  left: 17px;
  font-weight: bold;
  font-size: 17px;
  letter-spacing: 0.7px;
  color: #c43f3f;
  font-family: 华文中宋;
  z-index: -1;
}
#line2{
  position: absolute;
  top: 330px;
  width: 100%;
  height: 3px;
  background: linear-gradient(to right, #def5ab, #e7c75b, #ECD809FF);
  left: 10px;
  z-index: -1;
}

#all{
  position: relative;
  top: 0;
  z-index: 0;
  left: 250px;
  height: 100%;
  width: 1000px;
}
#open {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 10px;
  background-color: #F1F1F1;
  left: 20px;
  z-index: 0;
}
</style>