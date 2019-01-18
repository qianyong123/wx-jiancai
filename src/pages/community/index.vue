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
      <div v-if="types==0" style="width:100%;height:100%">
            <scroll-view v-if="total>0"  @scrolltolower='loadforum'  scroll-y class="community-forum">
              <forum v-for="(item,index) in forumList" :key="index" :forumList='item' :index='index'></forum>                     
          </scroll-view>
          <div v-else class="onlist">没有找到相关数据</div>
          <div v-if="noProduct" class="noProduct">亲，没有更多了！</div>
      </div>
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
          <scroll-view v-if="total!=0" @scrolltolower='loadhouse' scroll-y class="forum-item">
            <house v-for="(item,index) in houseList" 
            :key="index" 
            :houseList='item'
             :index='index'></house>
             <div v-if="isFilter1!=''" class="zheban"></div>
          </scroll-view>
          <div v-else class="onlist">没有找到相关数据</div>
          <div v-if="noProduct" class="noProduct">亲，没有更多了！</div>
      </div>
  </div>
</template>

<script>
import {articleList,houseList} from '../../utils/api.js'
import forum  from './forum '
import house  from './house'
export default {
  data () {
    return {
      noProduct:false,
      forumList:[
        // {id:1,title:'官方发布',content:'城市大部分普通小区中顶层复式有什么弊端？',readCount:'1458'},
        // {id:2,title:'官方发布',content:'城市大部分普通小区中顶层复式有什么弊端？',readCount:'1458'},
      ],
       houseList:[
        // {id:1,title:'官方发布',content:'城市大部分普通小区中顶层复式有什么弊端？',readCount:'1458'},
        // {id:2,title:'官方发布',content:'城市大部分普通小区中顶层复式有什么弊端？',readCount:'1458'},      
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
        {id:0,name:'从低到高'},
        {id:1,name:'从高到底'},
      ],
      Filter2:[
        {id:0,name:'20000元/平 以上',up:20000},
        {id:1,name:'15000-20000元/平',floorPrice:15000,highestPrice:20000},
        {id:2,name:'10000-15000元/平',floorPrice:10000,highestPrice:15000},
        {id:3,name:'10000元/平 以下',down:10000},
      ],
      resultType:null,
      isFilter1:'',
      // isFilter2:'',
      isFilter1Type:null,
      isFilter2Type:null,
      pageNum:1,
      pageNum2:1,
      pageSize :10,
      total:1,
      houseData:1, //房价当前访问的接口
      down:'',
      floorPrice:'',
      highestPrice:'',
      up:''
    }
  },

  components: {
    forum,
    house
  },
  onLoad(){
    //文章列表
   this.articleLists()
  },
  // onShow(){
  //   this.input=''
  //   this.types=0
  //   this.resultType=1
  // },
  watch: {
    types(){
      this.pageNum=1
      this.houseData=1
      this.forumList=[]
      this.houseList=[]
    },
    houseData(){
      this.houseList=[]
      this.pageNum=1
    }

  },
  methods: {
    ontype(index){
      this.types=index
      if(index==0){
          this.articleLists()
      }else{
          this.floorPrice=''
          this.floorPrice=''
          this.down=''
          this.up=''
          this.input=''  
          this.isFilter1Type=null,
          this.isFilter2Type=null,  
           this.resultType=null,   
          this.fliterPrice()
      }
    },
    //加载文章列表
    articleLists(){
       articleList({
        pageNum:this.pageNum,
        pageSize:this.pageSize
      }).then(res=>{
        console.log('文章列表',res)
        if(res.code==200&&res.data!=null){
          this.forumList=this.forumList.concat(res.data.list)
          this.pageNum=this.pageNum+1
          this.total=res.data.total
        }
      })  
    },
    //加载房价列表
    houseLists(){
      houseList({
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        name:this.input,
      }).then(res=>{
        console.log('房价列表',res)
        if(res.code==200&&res.data!=null){                  
            this.houseList=this.houseList.concat(res.data.list )
            this.pageNum=this.pageNum+1
            this.total=res.data.total
            this.houseData=1
        }
      })
    },
    //筛选小区
    fliterPrice(){
        houseList({
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        price:this.isFilter1Type,
        down:this.down,
        floorPrice:this.floorPrice,
        highestPrice:this.highestPrice,
        name:this.input,
        up:this.up
      }).then(res=>{
        console.log('房价列表',res)
        if(res.code==200&&res.data!=null){
          let list= res.data.list
              list.forEach((data2,index)=>{  
                      
                list[index].label=data2.label.split(',')            
            })  
            this.houseList=this.houseList.concat(list)
            this.pageNum=this.pageNum+1
            this.total=res.data.total
             this.noProduct=false
        }
      })
    },
    //加载文章分页
    loadforum(){
      let page=Math.ceil(this.total/10)
      if(this.pageNum<=page){
        this.articleLists()
      }else{
        console.log('没数据了')
        this.noProduct=true
      }
    },
    //加载房价分页
    loadhouse(){
       let page=Math.ceil(this.total/10)
       if(this.pageNum<=page){
             this.fliterPrice()
       }
      else{
        console.log('没数据了')
        this.noProduct=true
      }
    },
    //input里面键盘按下事件
    keyCode(e){
      // console.log(e)
      this.input=e.target.value
    },
    //确定搜素
    seeks(){
        console.log('搜索')
        this.houseList=[]
        this.fliterPrice()
        this.houseData=0
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
        if(id==0){
          this.houseData=2
            this.fliterPrice()
        }else{
            this.houseData=3
            this.fliterPrice()
        }
    },
    filteritem2(id){
        this.isFilter2Type=id
        this.isFilter1=''
        if(id==0){
           this.houseData=4
           this.up=this.Filter2[id].up
            this.floorPrice=''
             this.floorPrice=''
              this.down=''
            this.fliterPrice()
        }
        else if(id==1){
           this.houseData=5
            this.floorPrice=this.Filter2[id].floorPrice
             this.highestPrice=this.Filter2[id].highestPrice
             this.down=''
              this.up=''
              this.fliterPrice()
        }
         else if(id==2){
            this.houseData=6
            this.floorPrice=this.Filter2[id].floorPrice
             this.highestPrice=this.Filter2[id].highestPrice
              this.down=''
              this.up=''
              this.fliterPrice()
        }
          if(id==3){
             this.houseData=7
           this.down=this.Filter2[id].down
           this.floorPrice=''
             this.floorPrice=''
              this.up=''
            this.fliterPrice()
        }
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
        .noProduct{
      height: 40px;
      width: 100%;
      text-align: center;
      line-height: 40px;
      color: #ccc;
      font-size: 14px;
    }
      .community-forum{
        margin-top: 20px;
        width: 100%;
        height:90%;
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
    .onlist{
      width: 100%;
      height: 200px;
      line-height: 200px;
      text-align: center;
      font-size: 16px;
      color: #999999;    
    }

}
</style>
