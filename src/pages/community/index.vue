<template>
  <div class="community" >
      <div class="community-top">
          <div 
          class="community-type"
           v-for="(item,index) in type"
           :key="index"
           :class="{margins:index==0,typeColor:types==index}"
           @click="ontype(index)"
           >
              <div>{{item.name}}</div>
              <div v-if="types==index" class="border"></div>
          </div>       
      </div>
      <scroll-view v-if="types==0" scroll-y class="community-forum">
          <forum v-for="(item,index) in forumList" :key="index" :forumList='item' :index='index'></forum>
      </scroll-view>
      <div v-else class="community-house">
            <div class="sousuo-input">
              <i-icon class="icon" type="search" size="18" color="#BBBBAA"/>
              <input 
              v-model="input"       
              @input='keyCode'
              @confirm='seeks'
              confirm-type='search' 
              placeholder-style="color:#BBBBAA;"
              placeholder="请输入楼盘名" />
          </div>
          <div class="seetResult">
            <div class="div" v-for="comm in filterList" :key="comm.id">
              <p :class="{'result-span':resultType==comm.id}" @click.stop="resultTypes(comm.id)">
                <span>{{comm.name}}</span>
                <span v-if="resultType==comm.id" class="icon4"></span> 
                <span v-else class="icon3"></span>  
              </p>
            </div>
            <!-- <div class="zhList" v-if="iszhList=='1'">
                <div class="zh-item"
                v-for="item in zhList"
                @click="zhitem(item.id)"
                :key="item.id">
                    <span :class="{zhColor:zhtype==item.id}">{{item.name}}</span>
                    <i-icon v-if="zhtype==item.id" type="right" size="18" color="#1DB389"/>
                </div>
            </div> -->
          </div>
          <scroll-view scroll-y class="forum-item">
            <house v-for="(item,index) in forumList" 
            :key="index" 
            :forumList='item'
             :index='index'></house>
          </scroll-view>
      </div>
  </div>
</template>

<script>

import forum  from './forum '
import house  from './house'
export default {
  data () {
    return {
      forumList:[
        {id:1,name:'论坛',text:'啊大大大大大达瓦大',amount:'1458'},
        {id:1,name:'论坛',text:'啊大大大大大达瓦大',amount:'1458'},
        {id:1,name:'论坛',text:'啊大大大大大达瓦大',amount:'1458'},
        {id:1,name:'论坛',text:'啊大大大大大达瓦大',amount:'1458'},
        {id:1,name:'论坛',text:'啊大大大大大达瓦大',amount:'1458'},
      ],
      types:0,
      input:'',
       type:[
        {id:1,name:'论坛'},
        {id:1,name:'房价'},
      ],
      filterList:[
        {id:1,name:'价格'},
        {id:2,name:'筛选'},
      ],
      resultType:'1'
    }
  },

  components: {
    forum,
    house
  },
  // onShow(){
  //   this.input=''
  //   this.types=0
  //   this.resultType=1
  // },
  methods: {
    ontype(index){
      this.types=index
    },
    //input里面键盘按下事件
    keyCode(e){
      // console.log(e)
      this.input=e.target.value
    },
    //确定搜素
    seeks(){
        console.log('搜索')
    },
    //房价筛选
    resultTypes(id){
      this.resultType=id
    }
  },

  created () {
  
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/base.scss';
.community{
    width:100%;
    height:100%;
    position: relative;
    .community-top{
      width: 100%;
      height: 34px;
      display: flex;
      justify-content: center;
      color: #666666;
      position: absolute;
      top: 0;
      left: 0;
      .community-type{
          font-size:18px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .border{
            width: 100%;
            height: 0;
            border-top:4px solid $color;
          }
      }
      .typeColor{
        color: $color;
      }
      .margins{
        margin-right: 40px;
      }
    }
      .community-forum{
        width: 100%;
        height:100%;
        padding-top: 36px;
      } 
    .community-house{
      width: 100%;
      height:100%;
      padding-top: 36px;
      .sousuo-input{
          width: 335px;
          height: 40px;
          display: flex;
          align-items: center;
          background: #F8F8FA;
          margin:20px auto;
          color: #BBBBAA;
          font-size: 14px;
          border: 1px solid #F8F8FA;
          border-radius: 20px;
          .icon{
            margin:0 10px;
          }      
        }
        .seetResult{
          height:48px;
          width: 100%;
          padding:0 50px;
          display: flex;
          border-bottom:1px solid #BBBBAA;
          color: $fontSizeColor;
          position: relative;
          .div{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
          }
          .result-span{
            color: $color;          
          }
          .icon3{         
                display: inline-block;     
                  height: 0;
                  width: 0;
                  border-top: 6px solid $fontSizeColor;
                  /*此处将左右的边框设置为透明色*/
                  border-right: 6px solid transparent ; 
                  border-left: 6px solid transparent;
                  margin-left:5px;
                  margin-bottom: 3px;
            }
            .icon4{         
                display: inline-block;     
                  height: 0;
                  width: 0;
                  border-top: 6px solid transparent;
                  /*此处将左右的边框设置为透明色*/
                  border-right: 6px solid transparent ; 
                  border-left: 6px solid transparent;
                  border-bottom:  6px solid $color;
                  margin-left:5px;
                  margin-bottom: 3px;
            }
        }
        .forum-item{
          height: 500px;
          width: 100%;
        }
    }
    
}
</style>
