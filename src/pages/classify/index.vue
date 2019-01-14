<template>
  <div class="classiify" >
      <div class="sousuo">        
        <div class="sousuo-input"  @click="seekInput">
            <i-icon class="icon" type="search" size="18" color="#BBBBAA"/>
            <div style="color:#BBBBAA;">搜索</div>
        </div>
      </div>
      <div class="classiify-box">
          <div class="classiify-nav">
              <div 
              class="name" 
              v-for="(item,index) in classiifyType"
              :key="index"
              :class="{name2:type==index}"
              @click="types(index)"
               >
                  <div>{{item.name}}</div>
              </div>
          </div>
          <scroll-view 
          scroll-y
          class="classiify-main"
          >
           <div v-if="type==0" class="classiify-item">
              <div 
              class="item-name"
              v-for="(item,index) in classiifyList" 
              @click="onComm(item)"
              :key="index">
                  <div class="item-img">
                      <!-- <img :src="item.imgUrl" alt=""> -->
                  </div>
                  <div class="name2">{{item.name}}</div>
              </div>
           </div>  
            <seek-firm v-else :commList='classiifyList' :type='type'></seek-firm>  
            <div v-if="classiifyList.length<1" class="ondata">暂时还没有数据</div>   
          </scroll-view>
      </div>
  </div>
</template>

<script>
import seekFirm from './seekFirm'
import {classSort} from '../../utils/api.js'
export default {
  data () {
    return {
        classiifyList:[
          {id:1,imgUrl:'http://192.168.2.106/img/352356.jpg',name:'首付撒'},
          {id:1,imgUrl:'http://192.168.2.106/img/352356.jpg',name:'墙地砖'},
          {id:1,imgUrl:'http://192.168.2.106/img/352356.jpg',name:'墙地砖'},
          {id:1,imgUrl:'http://192.168.2.106/img/352356.jpg',name:'墙地砖'},
          {id:1,imgUrl:'http://192.168.2.106/img/352356.jpg',name:'墙地砖'},
          {id:1,imgUrl:'http://192.168.2.106/img/352356.jpg',name:'墙地砖'},
          {id:1,imgUrl:'http://192.168.2.106/img/352356.jpg',name:'墙地砖'},
          {id:1,imgUrl:'http://192.168.2.106/img/352356.jpg',name:'墙地砖'},
        ],
        classiifyType:[
          {id:1,name:'建材馆'},
          {id:2,name:'设计馆'},
          {id:3,name:'服务馆'},
          {id:4,name:'经销商馆'},
        ],
        type:'0'
    }
  },

  components: {
    seekFirm
  },

  methods: {
   seekInput(){
     wx.navigateTo({
        url:`../seek/main`
      })
   },
   //切换分类类型
   types(index){
     this.type=index
     this.classSorts()
   },
   //点击商品跳转到搜索页面
   onComm(item){
     wx.navigateTo({
        url:`../seek/main?name=${item.name}&type=${this.type}&key=${1}`
      })
   },
   //分类列表
   classSorts(){
     classSort({
        type:this.type
      }).then(res=>{
        console.log('建材馆列表',res)
        if(res.code==200&&res.data!=null){
            this.classiifyList=res.data
        }
      })
   }
  },
  mounted() {
    
  },
  created () {

  },
  onLoad(){
    console.log('分类2')
    this.classSorts()
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss'
</style>
