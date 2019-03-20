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
          @scrolltolower='onloadPageList'
          >
           <div v-if="type==0" class="classiify-item">
              <div 
              class="item-name"
              v-for="(item,index) in classiifyList"              
              :key="index">             
                  <div>{{item.assortName}}</div>
                  <div class="itemBox">
                       <div  class="itemBox2" v-for="(item2,index2) in item.productList" :key="index2" @click="onComm(item2)">
                          <div class="item-img">
                            <img :src="item2.imgUrl" alt="">
                          </div>
                          <div class="name2">{{item2.name}}</div>
                      </div>
                  </div>
                 
                                               
              </div>
           </div>  
            <seek-firm v-else :commList='classiifyList' :type='type'></seek-firm>  
            <div v-if="classiifyList.length<1" class="ondata">暂时还没有数据</div>  
            <div v-if="noProduct" class="noProduct">亲，没有更多了！</div>
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
      noProduct:false,
        classiifyList:[
          // {id:1,imgUrl:'http://192.168.2.106/img/352356.jpg',name:'首付撒'},
          // {id:1,imgUrl:'http://192.168.2.106/img/352356.jpg',name:'墙地砖'},
          // {id:1,imgUrl:'http://192.168.2.106/img/352356.jpg',name:'墙地砖'},
          // {id:1,imgUrl:'http://192.168.2.106/img/352356.jpg',name:'墙地砖'},
          // {id:1,imgUrl:'http://192.168.2.106/img/352356.jpg',name:'墙地砖'},
          // {id:1,imgUrl:'http://192.168.2.106/img/352356.jpg',name:'墙地砖'},
          // {id:1,imgUrl:'http://192.168.2.106/img/352356.jpg',name:'墙地砖'},
          // {id:1,imgUrl:'http://192.168.2.106/img/352356.jpg',name:'墙地砖'},
        ],
        classiifyType:[
          {id:1,name:'建材馆'},
          {id:2,name:'设计馆'},
          {id:3,name:'服务馆'},
          {id:4,name:'经销商馆'},
        ],
        type:'0',
        pageNum:1,
        pageSize:10,
        total:1
    }
  },

  components: {
    seekFirm
  },
  watch: {
    type(){
      this.classiifyList=[]
      this.pageNum=1
      console.log('type',this.type)
      console.log('pageNum', this.pageNum)
    }
  },
  onLoad(){
    
    this.classSorts()
    console.log('加载分页')
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
      this.pageNum=1
      this.classiifyList=[]
     this.classSorts()
   },
   //点击商品跳转到搜索页面
   onComm(item){
     wx.navigateTo({
        url:`../seek/main?name=${item.name}&type=${this.type}&key=${1}`
      })
   },
   //加载分页数据
   onloadPageList(){
      console.log('加载分页')
      let page=Math.ceil(this.total/10)
      if(this.type==0){
        return
      }
      else if(this.pageNum<=page){
        this.classSorts()
      }else{
        this.noProduct=true
      }
   },
   //分类列表logoUrl
   classSorts(){
     classSort({
        type:this.type,
        pageNum :this.pageNum,
        pageSize:this.pageSize
      }).then(res=>{
        console.log('建材馆列表',res)
        this.noProduct=false
        if(res.code==200&&res.data!=null){
          if(this.type==0&&res.data!=null){
            this.classiifyList=res.data
            return
          }
          let list=res.data.list
            // if(this.type==1||this.type==2||this.type==3){
            //   list.forEach((data2,index)=>{
            //     list[index].logoImg=data2.logoUrl
            //   })
            // }
            this.classiifyList= this.classiifyList.concat(list)
            this.total=res.data.total
            this.pageNum=this.pageNum+1      
            
        }
      })
   }
  },
  mounted() {
    
  },
  created () {

  },
  
}
</script>

<style lang="scss" scoped>
@import './style.scss'
</style>
