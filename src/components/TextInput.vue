<template>
  <div class="content">
    <canvas id="space"></canvas>
    <div class="input-area">
      <input class="form-control form-control-lg" type="text" placeholder="输入密文" v-model='msg' @click="selectAll" @keyup.enter="caculate">
      <!-- <input class="form-control form-control-lg" type="text" placeholder="输入密文" v-model='msg' @click="selectAll" @keyup.enter="caculate"> -->
      <input v-if="true" class="form-control form-control-lg input-num" type="number" min="1" max="25" placeholder="" v-model='num'>
      <button type="button" class="btn btn-secondary btn-lg" @click="caculate">解密</button>
    </div>

     <div v-if=" num != '' && showFlag" class="item-display overflow-auto" >
      <h1 class="display-4, display-item-position">{{ resultList[tempNum-1] }}</h1>
    </div>

    <div v-if="num == '' && showFlag && false" class="item-display overflow-auto">
      <h1 v-for="item in resultList" :key="item" class="display-4, display-item-position">{{ item }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  data() {
    return {
      showFlag: false,
      tempNum: '',
      result: '',
      num: '1',
      resultList: [],
      iloveyou: 'F ilsb Vlrkb',
      count: '',
      timer: '',
      msg: '',
    }
  },
  mounted() {
    this.setBackGroundImg()
  },
  methods: {
    // setNum() {
    //   this.msg = this.msgN.split(' ')[1]
    //   this.num = this.msgN.split(' ')[0]
    //   console.log(this.msg, this.num)
    // },
    caculate() {
      // this.msg = ''
      if (this.num == '') {
        this.num = '1'
      }
      if (this.tempNum == '') {
        this.tempNum = Number(this.num)
      } else {
        this.tempNum += Number(this.num)
        this.tempNum = this.tempNum % 25
        console.log('121212', this.tempNum)
      }
      this.showFlag = true
      this.resultList = []
      if(this.checkInput()) {
        this.resultList.push('输入的信息中，不存在任何英文字母')
        return
      }
      let tempresult = this.msg
      for (let index = 0; index < 25; index++) {
        let temp = ''
        // 每个字母往后偏移1
        for (let i = 0; i < tempresult.length; i++) {
          temp += this.next(tempresult[i])
        }
        // 偏移后的结果赋值给 tempresult 进行下一次偏移
        tempresult = temp
        this.resultList.push(tempresult)
      }
      const TIME_COUNT = 5;
      let jump = false
      if(this.resultList[this.tempNum].indexOf('love') != -1) {
        jump = true
      }
      // for (let j = 0; j < this.resultList.length; j++) {
      //   const element = this.resultList[j];
      //   if(element.indexOf('love') != -1) {
      //     jump = true
      //   }
        
      // }
      if(!this.timer && jump){
        console.log('start')
          this.count = TIME_COUNT;
          // this.show = false;
          this.timer = setInterval(()=>{
          if(this.count > 0 && this.count <= TIME_COUNT){
            console.log('start IF')
            this.count--;
          }else{
            console.log('else')
            this.show = true;
            clearInterval(this.timer);
            // this.timer = null;
            //跳转的页面写在此处
            this.$router.push({
                name: 'iloveyou',
            });
          }
        },2000)
      }

    },
    next(str) {
      let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let lower = upper.toLowerCase();
      let indexUpper = upper.indexOf(str)
      let indexLower = lower.indexOf(str)
      if(indexUpper != -1) {
        return upper[(indexUpper + 1) % 26]
      } else if(indexLower != -1) {
        return lower[(indexLower + 1) % 26]
      }
      return str
    },
    // 是否全是非字母
    checkInput() {
      let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let lower = upper.toLowerCase();
      for (let index = 0; index < this.msg.length; index++) {
        const element = this.msg[index];
        let indexUpper = upper.indexOf(element)
        let indexLower = lower.indexOf(element)
        console.log(index, indexUpper, indexLower)
        if(indexUpper != -1 || indexLower != -1) {
          return false
        }
      }
      return true
    },
    // 全选 input 内容
    selectAll(e) {
      this.showFlag = false
      this.tempNum = ''
      e.target.select();
    },
    setBackGroundImg() {
      window.requestAnimFrame = (function () {
        return window.requestAnimationFrame;
      })();
      var canvas = document.getElementById("space");
      var c = canvas.getContext("2d");
      var numStars = 1900;
      var radius = "0." + Math.floor(Math.random() * 9) + 1;
      var focalLength = canvas.width * 2;
      var warp = 0;
      var centerX, centerY;
      var stars = [],
        star;
      var i;
      var animate = true;
      initializeStars();

      function executeFrame() {
        if (animate) window.requestAnimFrame(executeFrame);
        moveStars();
        drawStars();
      }

      function initializeStars() {
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;

        stars = [];
        for (i = 0; i < numStars; i++) {
          star = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width,
            o: "0." + Math.floor(Math.random() * 99) + 1,
          };
          stars.push(star);
        }
      }

      function moveStars() {
        for (i = 0; i < numStars; i++) {
          star = stars[i];
          star.z--;

          if (star.z <= 0) {
            star.z = canvas.width;
          }
        }
      }

      function drawStars() {
        var pixelX, pixelY, pixelRadius;

        // Resize to the screen
        if (
          canvas.width !== window.innerWidth ||
          canvas.width !== window.innerWidth
        ) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          initializeStars();
        }
        if (warp === 0) {
          // 此代码块改背景色为渐变色
          var grd = c.createRadialGradient(
            canvas.width,
            canvas.height,
            canvas.width,
            canvas.width,
            canvas.height,
            1000
          );
          grd.addColorStop(0, "rgba(1, 9, 41, 0.6)");
          grd.addColorStop(1, "rgba(20, 50, 80, 0.6)");
          // grd.addColorStop(1, "rgba(20, 50, 80, 0.6)");
          c.fillStyle = grd;
          c.fillRect(0, 0, canvas.width, canvas.height);
        }
        c.fillStyle = "rgba(209, 255, 255, " + radius + ")";
        for (i = 0; i < numStars; i++) {
          star = stars[i];

          pixelX = (star.x - centerX) * (focalLength / star.z);
          pixelX += centerX;
          pixelY = (star.y - centerY) * (focalLength / star.z);
          pixelY += centerY;
          pixelRadius = 1 * (focalLength / star.z);

          c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
          c.fillStyle = "rgba(209, 255, 255, " + star.o + ")";
          //c.fill();
        }
      }
      executeFrame();
    },
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  height: 100%;
}
input {
  margin: auto 0;
  vertical-align: middle;
  width: 50%;
}
.input-area {
  padding-top: 10rem;
  text-align: center;
  widows: 80%;
}
.item-display {
  margin: 2rem auto;
  /* color:gainsboro; */
}
.form-control-lg {
  display: inline-block;
}
button {
  margin-left: 0.5rem;
}
#space {
  width: 100%;
  height: 100%;
  display: block;
  /* vertical-align: baseline; */
  position: fixed;
  z-index: -5;
}
.input-num{
  margin-left: 0.5rem;
  width: 20%;
}
.overflow-auto {
  height: 31.5rem;
  width: 77%;
  background: gainsboro;
  opacity: 0.3;
}
.backgray {
  width: 77%;
  background: gainsboro;
  opacity: 0.3;
}
.display-4{
  color: white;
}
</style>
