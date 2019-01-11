<template>
  <div class="community" @click="hideFilter">
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
          <div class="community-sousuo">
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
              <div class="zhList" v-if="isFilter1=='1'">
                  <div class="zh-item"
                  v-for="item in Filter1"
                  @click="filteritem(item.id)"
                  :key="item.id">
                      <span :class="{zhColor:isFilter1Type==item.id}">{{item.name}}</span>
                      <i-icon v-if="isFilter1Type==item.id" type="right" size="18" color="#1DB389"/>
                  </div>
              </div>
              <div class="zhList" v-if="isFilter1=='2'">
                  <div class="zh-item"
                  v-for="item in Filter2"
                  @click="filteritem2(item.id)"
                  :key="item.id">
                      <span :class="{zhColor:isFilter2Type==item.id}">{{item.name}}</span>
                      <i-icon v-if="isFilter2Type==item.id" type="right" size="18" color="#1DB389"/>
                  </div>
              </div>
            </div>
          </div>
          <scroll-view scroll-y class="forum-item">
            <house v-for="(item,index) in forumList" 
            :key="index" 
            :forumList='item'
             :index='index'></house>
             <div v-if="isFilter1!=''" class="zheban"></div>
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
        {id:1,name:'官方发布',text:'城市大部分普通小区中顶层复式有什么弊端？',amount:'1458'},
        {id:1,name:'官方发布',text:'城市大部分普通小区中顶层复式有什么弊端？',amount:'1458'},
        {id:1,name:'官方发布',text:'城市大部分普通小区中顶层复式有什么弊端？',amount:'1458'},
        {id:1,name:'官方发布',text:'城市大部分普通小区中顶层复式有什么弊端？',amount:'1458'},
        {id:1,name:'官方发布',text:'城市大部分普通小区中顶层复式有什么弊端？',amount:'1458'},
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
      Filter1:[
        {id:1,name:'从低到高'},
        {id:2,name:'从高到底'},
      ],
      Filter2:[
        {id:1,name:'20000元/平 以上',low:20000},
        {id:2,name:'15000-20000元/平',low:15000,tall:20000},
        {id:3,name:'10000-15000元/平',low:10000,tall:15000},
        {id:4,name:'10000元/平 以下',low:10000},
      ],
      resultType:'',
      isFilter1:'',
      // isFilter2:'',
      isFilter1Type:'1',
      isFilter2Type:'1'
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
      this.isFilter1=id
    },
    //价格房价
    filteritem(id){
        this.isFilter1Type=id
        this.isFilter1=''
    },
    filteritem2(id){
        this.isFilter2Type=id
        this.isFilter1=''
    },
    //隐藏筛选框
    hideFilter(){
      this.isFilter1=''
      this.isFilter2=''
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
      z-index: 666;
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
      .community-sousuo{
        width: 100%;
        background: #fff;
        position: relative;
        z-index: 666;
      }
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
            .zhList{
              position: absolute;
              font-size: 14px;
              width:100%;
              top:47px;
              left: 0;
              z-index: 100;
              background: #fff;
              padding: 10px 0;
              z-index: 999;
              .zh-item{
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding:0 50px;
                .zhColor{
                  color: $color;
                }
              }
            }
        }
        .forum-item{
          height:90%;
          width: 100%;
          position: relative;
          .zheban{
            width:100%;
            height:80%;
            position:fixed;
            bottom: 0;
            left: 0;
            z-index:100;
            background:rgba(0, 0, 0, 0.4)
          }
        }
    }
    
}
</style>
