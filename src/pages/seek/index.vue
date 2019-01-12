<template>
  <div class="seek" @click="hidezhlist">
      <div class="seek-top">
        <div class="sousuo">
          <!-- <div class="sousuo-left">
            <span @click="onSiteName">{{mapName}}</span>
            <span class="icon2">           
            </span>           
          </div> -->
          <div class="sousuo-input">
              <i-icon class="icon" type="search" size="18" color="#BBBBAA"/>
              <input 
              v-model="input"             
              @input='keyCode'
              @confirm='seeks'
              confirm-type='search' 
              focus	
              placeholder-style="color:#BBBBAA;"
                placeholder="你想找什么？" />
          </div>
          <ul v-if="ismapList" class="seek-ul">
            <li v-for="item in mapList" :key="item.id" @click="onMap(item.text)">{{item.text}}</li>
          </ul>
        </div>
        <span class="call" @click="oncall">取消</span>      
    </div>
    <div style="width:100%" v-if="isresult">
      <div class="commType">
          <div v-for="comm in commType" :key="comm.id">
            <p :class="{span:oncommType==comm.id}" @click="oncommTypes(comm.id)">
              {{comm.name}}
            </p>
          </div>
      </div>
      <div class="history">
          <p>历史记录</p>
          <div class="history-item">
            <div class="history-name"
             v-for="(item,index) in materials[oncommType-1]"
             @click="historyNmae(item)"              
             :key="index">{{item}}</div>
          </div>
          <div @click="clearHieory" v-if="materials[oncommType-1].length>0" class="clear-history">清空历史记录</div>
      </div>
    </div>
    <div v-else>
        <div v-if="oncommType==1" class="seetResult">
          <div class="div" v-for="comm in filterList" :key="comm.id">
            <p :class="{'result-span':resultType==comm.id}" @click.stop="resultTypes(comm.id)">
              <span>{{comm.name}}</span>
              <span v-if="resultType==comm.id" class="icon4"></span> 
              <span v-else class="icon3"></span>  
            </p>
          </div>
          <div class="zhList" v-if="iszhList=='1'">
              <div class="zh-item"
               v-for="item in zhList"
               @click="zhitem(item.id)"
               :key="item.id">
                  <span :class="{zhColor:zhtype==item.id}">{{item.name}}</span>
                  <i-icon v-if="zhtype==item.id" type="right" size="18" color="#1DB389"/>
              </div>
          </div>
          <div v-if="iszhList=='1'" class="zheban"></div>
      </div>
       <!-- <div v-else class="seetResult" style="padding:0 50px;">
          <div class="div" v-for="comm in filterList2" :key="comm.id">
            <p :class="{'result-span':resultType==comm.id}" @click.stop="resultTypes(comm.id)">
              <span>{{comm.name}}</span>
              <span v-if="resultType==comm.id" class="icon4"></span> 
              <span v-else class="icon3"></span>  
            </p>
          </div>
          <div class="zhList" v-if="iszhList=='1'">
              <div class="zh-item"
               v-for="item in zhList"
               @click="zhitem(item.id)"
               :key="item.id">
                  <span :class="{zhColor:zhtype==item.id}">{{item.name}}</span>
                  <i-icon v-if="zhtype==item.id" type="right" size="18" color="#1DB389"/>
              </div>
          </div>
      </div> -->
      <seek-result v-if="oncommType==1" :commList='commList' ></seek-result>
      <seek-firm v-else :commList='commList' :oncommType='oncommType'></seek-firm>
      <div class="nocommList" v-if="commList.length<1">没有找到相关数据！</div>
    </div>
    <!-- 品牌右侧弹框 -->
    <i-drawer style="width:100%;height:100%;" mode="right" :visible="showRight1" @close="toggright1s">
        <scroll-view 
        scroll-y
        :scroll-into-view="toView"
        class="container">
          <div class="hots-pinpai">
               <div class="container-top">
                <span class="hot">热门品牌</span>    
                <span class="advertising">广告</span> 
              </div>
              <div class="hot-brand">
                <div v-for="item in hotbrands" :key="item.id" @click="onpinpai(item)">
                    {{item.name}}
                </div>
              </div>
          </div>
         
          <div class="hot-index">
              <div style="padding:0px;" v-for="(item,index) in wordsIndex"
              @click.stop="toIndex(item)"
              :key="index">{{item}}</div>
          </div>
          
            <div style="margin-bottom:5px;" v-for="(item,index) in cities" :key="index" :id="item.key">
                <div class="brand-index">
                    {{item.key}}
                </div>
                <div v-for="(item2,index2) in item.list" :key="index2">
                  <div class="brand-name" @click="onpinpai(item2)">
                    <div class="imgBox">
                      <img :src="item2.imgUrl" alt="">
                    </div>
                    <span>{{item2.name}}</span>            
                  </div>
                </div>
            </div>
          
        </scroll-view>
    </i-drawer>
    <!-- 筛选右侧弹框 -->
    <i-drawer style="width:100%;height:100%;" mode="right" :visible="showRight2" @close="toggright1s2">
        <scroll-view 
        scroll-y
        class="container">         
          <div class="container-filter">
              <span class="filter-span">价格区间</span>
              <div class="filter-price">
                <div v-for="(item,index) in filterPrice" :key="index"
                :class="{priceBox:index!=1,border:index==1}"          
                >
                <input v-model="filterInput1" v-if="index==0" type="number" :placeholder='item.name' class="input">
                <input v-model="filterInput2" v-if="index==2" type="number" :placeholder='item.name' class="input">
                </div>
              </div>
          </div>
           <div class="container-filter" style="border-bottom:1rpx solid #999;">
              <span class="filter-span">环保</span>
              <div class="huanbao">
                  <div v-for="(item,index) in huanbaoa" :key="index"
                  :class="{choosePitch:talls2.id==item.id}"
                  @click="cutHuanbao(item)"
                   class="tall">{{item.name}}</div>                 
              </div>
          </div>
          <div class="choose-box">
              <span class="choose-span">选购热点</span>
              <div class="choose-hots">
                  <div 
                  class="hots-item" 
                  v-for="(item,index) in chooseHot"
                  :class="{choosePitch:chooseHots2.id==index}"
                   @click="cutHots(item,index)"
                   :key="index">{{item.name}}</div>                   
              </div>
          </div>
          <i-button @click="chooseClick" type="warning" size="small">确定</i-button>
        </scroll-view>
    </i-drawer>
  </div>
</template>

<script>
import seekResult from './seekResult'
import seekFirm from './seekFirm'
import {pinyin} from '../../utils/pinyin.js'
import {searchType,addFindAll} from '../../utils/api.js'
export default {
  data () {
    return {
      input:'',
      isresult:true,
      showRight1:false,
      showRight2:false,
      wordsIndex:[],//品牌索引
      chooseHot:[ //选购热点
        {id:1,name:'牛栏山'},
          {id:2,name:'牛栏'},
          {id:3,name:'牛栏山'},
          {id:4,name:'牛栏山'},
          {id:5,name:'牛栏山'},
          {id:6,name:'牛栏'},
      ],
      huanbaoa:[ //环保
         {id:1,name:'高'},
          {id:2,name:'中'},
          {id:3,name:'低'},
      ], 
      filterPrice:[
           {id:1,name:'最低价'},
          {id:2,name:''},
          {id:3,name:'最高价'},
      ],
      //筛选条件
      price2:{id:0,name:''},
      talls2:{id:0,name:''},
      chooseHots2:{id:120,name:''},

      toView:'',
      mapName:'宜兴',
      brand:'', //热门品牌
      cities : [
          {name:'哎是粉色发'},
          {name:'吧大大'},
          {name:'从了阿法尔输入法而'},
          {name:'的阿达瓦大'},
          {name:'额大沙地'},
          {name:'发啊大大'},
          {name:'个法法'},
          {name:'好污染物'},
          {name:'看发顺丰'},
          {name:'吗如果是提供商'},

        ],
      mapList:[
        {id:1,text:'宜兴'},
        {id:2,text:'武侯区'},
        {id:3,text:'青羊区'},
        {id:4,text:'锦江区'},
      ],
      ismapList:false,
      commType:[
        {id:1,name:'建材'},
        {id:2,name:'设计'},
        {id:3,name:'服务'},
        {id:4,name:'经销商'},
      ],
      oncommType:1,
      resultType:'1',
      zhtype:'1',
      iszhList:'',
      historyList:[
        {id:1,name:'建材'},
        {id:2,name:'设计'},
        {id:3,name:'服务'},
        {id:4,name:'经销商'}
      ],
      filterList:[
        {id:1,name:'综合'},
        {id:2,name:'品牌'},
        {id:3,name:'筛选'},
      ],
      filterList2:[
        {id:1,name:'综合'},
        // {id:2,name:'品牌'},
        {id:3,name:'筛选'},
      ],
      zhList:[
        {id:1,name:'综合优先'},
        {id:2,name:'关注排序'},
        {id:3,name:'新品优先'},
      ],
       commList:[
        {id:1,name:'宜兴马克瓷砖',text:'天然纯白贝壳马赛克墙 无缝背景墙 密拼 2018欧式瓷是东莞市房染色法谁认识',amount:'1452',pay:'1'},
        ],
        //热门品牌
        hotbrands:[
          {id:1,name:'牛栏山'},
          {id:2,name:'牛栏'},
          {id:3,name:'牛栏山'},
          {id:4,name:'牛栏山'},
          {id:5,name:'牛栏山'},
          {id:6,name:'牛栏'},
        ],
        materials:[],
        filterInput1:'',
        filterInput2:'',
        pageNum:1,
        pageSize:10
    }
    
  },

  components: {
      seekResult,
      seekFirm
  },
  mounted() {
    this.input=''
    this.brandList()    
  },
  onShow(){
    this.resultType='1'
    this.zhtype='1'
    let materials=wx.getStorageSync('materials')||[[],[],[],[]]
    this.materials=materials
    console.log(materials)
  },
  onLoad(){
      this.isresult=true
      let data=this.$root.$mp.query
      if(data.key==1){
        this.oncommType=Number(data.type)+1
        this.isresult=false
      }
       addFindAll({type:'品牌'}).then(res=>{
        console.log('所有品牌',res)
        if(res.code==200&&res.data!=null){
          this.cities=res.data
        }
      })
      console.log('query',data)
  },
  methods: {
    //点击取消返回首页
    oncall(){
      wx.switchTab({
        url: '/pages/index/main'
      })
    },


    //显示隐藏品牌右边的弹框
    toggright1s(){
      this.showRight1=!this.showRight1
      console.log('品牌关闭')
    },
    //显示隐藏筛选右边的弹框
    toggright1s2(){
        this.showRight2=!this.showRight2
    },
    //获取品牌字母索引
    toIndex(id){
      this.toView=id
      console.log(id)
    },
    //点击热门品牌
    onpinpai(item){
      console.log(item.name)
      this.toggright1s()
      searchType({pageNum:this.pageNum,
      pageSize:this.pageSize,
      type:this.oncommType-1,
      brand:item.name,
      }).then(res=>{
        console.log('热门品牌商品',res)
        if(res.code==200&&res.data!=null){
            this.commList=res.data.list
        }
      })
    },
    //选择价格
    cutPrice(item){
        this.price2.id=item.id
         this.price2.name=item.name
    },
    //选择环保
    cutHuanbao(item){
        this.talls2.id=item.id
        this.talls2.name=item.name
    },
    //选择热点
    cutHots(item,index){
          this.chooseHots2.id=index
          this.chooseHots2.name=item.name
    },
    //筛选确认
    chooseClick(){
      console.log('筛选')
      console.log(this.filterInput1,this.filterInput2)
      this.showRight2=false
      searchType({
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        type:this.oncommType-1,
        floorPrice:this.filterInput1,
        highestPrice:this.filterInput2,
        up:this.talls2.name
        }).then(res=>{
        console.log('主页搜索商品',res)
        if(res.code==200&&res.data!=null){
            this.commList=res.data.list
        }
      })
    },


    //动态绑定input内容
    keyCode(e){
      console.log(e)
      this.input=e.target.value
      if(this.input==''){
          this.isresult=true
          this.resultType='1'
          this.zhtype='1'
      }
    },
    //清空历史记录
    clearHieory(){
      let that=this
      wx.showModal({
        title: '提示',
        content: '你确定要清空所有历史记录吗？',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.removeStorageSync('materials')
            that.materials=[[],[],[],[]]
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
    },
    //确认搜索design
    seeks(){
      console.log('搜索',this.input)  
      searchType({pageNum:this.pageNum,pageSize:this.pageSize,type:this.oncommType-1,keyword:this.input}).then(res=>{
        console.log('主页搜索商品',res)
        if(res.code==200&&res.data!=null){
            this.commList=res.data.list
        }
      })
        this.isresult=false
        if(this.oncommType=='1'&&this.input!=''){
          let index=this.materials[0].indexOf(this.input)
          console.log(index)
          if(index==-1){
              this.materials[0].unshift(this.input)
            wx.setStorageSync('materials',this.materials)
          }
          else return
        }
        else if(this.oncommType=='2'&&this.input!=''){
           let index=this.materials[0].indexOf(this.input)
            if(index==-1){
            this.materials[1].unshift(this.input)
            wx.setStorageSync('materials',this.materials)
          }
          else return
        }
        else if(this.oncommType=='3'&&this.input!=''){
           let index=this.materials[0].indexOf(this.input)
            if(index==-1){
              this.materials[2].unshift(this.input)
            wx.setStorageSync('materials',this.materials)
          }
          else return
        }
        else if(this.oncommType=='4'&&this.input!=''){
           let index=this.materials[0].indexOf(this.input)
             if(index==-1){
              this.materials[3].unshift(this.input)
            wx.setStorageSync('materials',this.materials)
          }
          else return
        }
    },
    //隐藏综合list
    hidezhlist(){
      this.iszhList=''
    },
    onMap(name){
      this.mapName=name
      this.ismapList=false
    },
    //地址
    onSiteName(){
      this.ismapList=true
    },
    //点击搜索类型
    oncommTypes(id){
      this.oncommType=id
      console.log(id)
    },
    //搜索结果筛选类型
    resultTypes(id){
          this.resultType=id
          this.iszhList=id
          if(id==2){
            this.toggright1s();
          }
          else if(id==3){
              this.toggright1s2();
          }
    },
    //点击综合里面的item
    zhitem(id){
        this.zhtype=id
        if(id==1){
          searchType({pageNum:this.pageNum,pageSize:this.pageSize,type:this.oncommType-1,keyword:this.input}).then(res=>{
            console.log('搜索综合商品',res)
            if(res.code==200&&res.data!=null){
                this.commList=res.data.list
            }
          })
        }
        else if(id==2){
          console.log('关注排序')
           searchType({
             pageNum:this.pageNum,
             pageSize:this.pageSize,
             type:this.oncommType-1,
             attentionCount:'0',
            }).then(res=>{
            console.log('搜索综合商品',res)
            if(res.code==200&&res.data!=null){
                this.commList=res.data.list
            }
          })
        }
         else if(id==3){
          console.log('综合排序')
           searchType({
             pageNum:this.pageNum,
             pageSize:this.pageSize,
             type:this.oncommType-1,
             newProduct:'0',
             }).then(res=>{
            console.log('搜索综合商品',res)
            if(res.code==200&&res.data!=null){
                this.commList=res.data.list
            }
          })
        }
    },
    //点击历史记录
    historyNmae(item){
        this.isresult=false
        this.input=item
        searchType({pageNum:this.pageNum,pageSize:this.pageSize,type:this.oncommType-1,keyword:this.input}).then(res=>{
        console.log('主页搜索商品',res)
        if(res.code==200&&res.data!=null){
            this.commList=res.data.list
        }
      })
    },
    // 产品索引
    onChange(event){
        console.log(event,'click right menu callback data')
    },
    brandList(){
        let storeCity = new Array(26);
        const words = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        words.forEach((item,index)=>{
            storeCity[index] = {
                key : item,
                list : []
            }
        })
        this.wordsIndex=words
        this.cities.forEach((item)=>{
            let firstName = pinyin.getCamelChars(item.name).substring(0,1);
            let index = words.indexOf( firstName );
            storeCity[index].list.push({
                name : item.name,
                key : firstName,
                imgUrl:item.imgUrl
            });
        })
        this.cities = storeCity;
        console.log('初始品牌',this.cities)
        // this.setData({
        //     cities : this.data.cities
        // })
    }
  },
  onReady(){
    
  },
  created () {
    
  }
}
</script>

<style lang="scss">
    @import './style.scss';
</style>
