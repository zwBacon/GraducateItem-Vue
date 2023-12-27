<template>

  <div id="Head">
    <img src="../assets/首页资源/logo.png" id="logo" class="details">

    <p class="fontstyle" id="first">精选</p><img v-bind:src="imgSrc1" class="imgStyle" id="firstimg"
                                                 @click="click('first','firstimg')">
    <p class="fontstyle" id="second">看点</p><img v-bind:src="imgSrc2" class="imgStyle" id="secimg"
                                                  @click="click('second','secimg')">
    <p class="fontstyle" id="third">关注</p><img v-bind:src="imgSrc3" class="imgStyle" id="thirimg"
                                                 @click="click('third','thirimg')">
    <p class="fontstyle" id="forth">消息</p><img v-bind:src="imgSrc4" class="imgStyle" id="forthimg"
                                                 @click="click('forth','forthimg')">
    <p class="fontstyle" id="fifth">个人中心</p><img v-bind:src="imgSrc5" class="imgStyle" id="fifimg"
                                                     @click="click('fifth','fifimg')">
  </div>
</template>

<script>

export default {
  name: "HeadLineViewForMain",
  data() {
    return {
      imgSrc1: require('../assets/首页头资源/首页.png'),
      imgSrc2: require('../assets/首页头资源/今日看点.png'),
      imgSrc3: require('../assets/首页头资源/加关注.png'),
      imgSrc4: require('../assets/首页头资源/消息.png'),
      imgSrc5: require('../assets/首页头资源/我的.png'),
      count: 0,
      lastfontName: "",
      lastImgName: ""
    }
  },
  methods: {

    click(fontname, img_name) {
      let _this = this;
      if (this.count == 0) {
        this.lastfontName = fontname
        this.lastImgName = img_name
      } else {
        this.resetAbility(this.lastfontName, this.lastImgName);
        this.lastfontName = fontname;
        this.lastImgName = img_name
      }
      if (img_name === 'firstimg') {
        _this.imgSrc1 = require('../assets/首页头资源/首页(2).png');
      } else if (img_name === 'secimg') {
        _this.imgSrc2 = require('../assets/首页头资源/今日看点(2).png');
      } else if (img_name === 'thirimg') {
        _this.imgSrc3 = require('../assets/首页头资源/加关注(2).png');
      } else if (img_name === 'forthimg') {
        _this.imgSrc4 = require('../assets/首页头资源/消息(2).png');
      } else if (img_name === 'fifimg') {
        _this.imgSrc5 = require('../assets/首页头资源/我的(2).png');
      }
      var font_name2 = document.getElementById(fontname);
      font_name2.style.color = "#ff6b02"
      font_name2.style.fontWeight = "bold"
      this.count++;
    },
    resetAbility(fontname, img_name) {
      let _this = this;
      if (img_name === 'firstimg') {
        _this.imgSrc1 = require('../assets/首页头资源/首页.png');
      } else if (img_name === 'secimg') {
        _this.imgSrc2 = require('../assets/首页头资源/今日看点.png');
      } else if (img_name === 'thirimg') {
        _this.imgSrc3 = require('../assets/首页头资源/加关注.png');
      } else if (img_name === 'forthimg') {
        _this.imgSrc4 = require('../assets/首页头资源/消息.png');
      } else if (img_name === 'fifimg') {
        _this.imgSrc5 = require('../assets/首页头资源/我的.png');
      }
      var font_name2 = document.getElementById(fontname);
      font_name2.style.color = "black"
      font_name2.style.fontWeight = "lighter"
    }
  }
}

</script>

<style scoped>
.imgStyle {
  position: absolute;
  width: 32px;
  height: 32px;
  top: 13px;
}


#firstimg {
  left: 217px;
}

#secimg {
  left: 487px;
}

#thirimg {
  left: 1000px;
}

#forthimg {
  left: 1197px;
}

#fifimg {
  left: 1394px;
}

.fontstyle {
  position: absolute;
  color: black;
  font-weight: lighter;
  font-size: 13px;
  letter-spacing: 1px;
  font-family: 华文隶书;
  top: 50px;
}

#first {
  left: 217px;
}

#second {
  left: 487px;
}

#third {
  left: 1000px;
}

#forth {
  left: 1197px;
}

#fifth {
  left: 1380px;
}

#Head {
  position: absolute;
  width: 100%;
  height: 80px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #592509;
  background-color: #F1F1F1;
  z-index: -1;
}

#logo {
  position: absolute;
  left: 720px;
  height: 10px;
  width: 85px;
  height: 78px;
}
</style>